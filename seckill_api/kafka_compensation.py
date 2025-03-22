from kafka import KafkaConsumer
import settings
import json
import asyncio
from utils.cache import tll_redis
from loguru import logger
from models import AsyncSessionFactory
from models.order import Order, OrderStatusEnum
from datetime import datetime, timedelta
from sqlalchemy import select
from kafka import KafkaProducer
import time


kafka_producer = None
for attempt in range(settings.KAFKA_MAX_RETRIES):
    try:
        kafka_producer = KafkaProducer(
            bootstrap_servers=settings.KAFKA_SERVER,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        logger.info("Kafka compensation service connect succeeded.")
        break
    except Exception as e:
        logger.error(f"Kafka compensation service connect failed (attempt {attempt+1}/{settings.KAFKA_MAX_RETRIES}): {e}")
        time.sleep(settings.KAFKA_RETRY_DELAY)

if not kafka_producer:
    logger.info("kafka_producer compensation init error.")

"""
管理整个分布式事务的状态
提供事务开始、提交、回滚和查询功能
设置合理的超时机制
"""
class TransactionCoordinator:
    async def begin_transaction(self, tx_id):
        await tll_redis.set(f"tx:{tx_id}:status", "prepared", ex=300)

    async def commit_transaction(self, tx_id):
        await tll_redis.set(f"tx:{tx_id}:status", "committed")

    async def rollback_transaction(self, tx_id):
        await tll_redis.set(f"tx:{tx_id}:status", "rolled_back")

# 补偿服务模块
class CompensationService:
    def __init__(self):
        self.check_interval = 10  # 5分钟扫描一次
        self.payment_timeout = 1800  # 30分钟超时

        self.max_retries = 3  # 最大重试次数
        self.retry_delay = [10, 30, 60]  # 重试间隔（秒）
        self.dlq_topic = "compensation_dlq"  # 死信队列主题

        self.coordinator = TransactionCoordinator()

    async def log_compensation(self, order_id: int, action: str):
        """记录补偿操作日志"""
        print(f'order_id:{order_id}, action:{action}')
        # log_entry = {
        #     "timestamp": datetime.now().isoformat(),
        #     "order_id": order_id,
        #     "action": action,
        #     "status": "attempted"
        # }
        # try:
        #     # 写入日志文件（备用）
        #     logger.info(f"[COMPENSATION] {log_entry}")
        # except Exception as e:
        #     logger.error(f"补偿日志记录失败: {str(e)}")
        #     # 写入本地文件兜底
        #     with open("compensation_fallback.log", "a") as f:
        #         f.write(f"{log_entry}\n")

    async def retry_compensation(self, order_id: int):
        """分级重试机制"""
        retry_count = await tll_redis.get(f"compensation_retries:{order_id}") or 0

        if retry_count < self.max_retries:
            # 指数退避重试
            delay = self.retry_delay[min(retry_count, len(self.retry_delay) - 1)]
            await asyncio.sleep(delay)

            try:
                # 重新处理订单
                async with AsyncSessionFactory() as session:
                    order = await session.get(Order, order_id)
                    if order and order.status == OrderStatusEnum.UNPAYED.value:
                        await self.handle_expired_order(order, session)

                await tll_redis.delete(f"compensation_retries:{order_id}")
                await self.log_compensation(order_id, f"重试成功（第{retry_count + 1}次）")

            except Exception as e:
                await tll_redis.incr(f"compensation_retries:{order_id}")
                await self.log_compensation(order_id, f"重试失败（第{retry_count + 1}次）: {str(e)}")
        else:
            # 加入死信队列
            kafka_producer.send(self.dlq_topic, {
                "order_id": order_id,
                "last_error": "Max retries exceeded",
                "timestamp": datetime.now().isoformat()
            })
            await self.log_compensation(order_id, "转入死信队列")
            await tll_redis.delete(f"compensation_retries:{order_id}")

    async def scan_expired_orders(self):
        logger.info('kafka_compensation 开始扫描 过期订单')
        """扫描超时未支付订单"""
        async with AsyncSessionFactory() as session:
            # 查询超时订单
            timeout = datetime.now() - timedelta(seconds=self.payment_timeout)
            print('timeout', timeout)
            stmt = select(Order).where(
                Order.status == OrderStatusEnum.UNPAYED.value,
                Order.create_time < timeout
            )
            result = await session.execute(stmt)
            expired_orders = result.scalars().all()

            for order in expired_orders:
                await self.handle_expired_order(order, session)

    async def handle_expired_order(self, order, session):
        """处理过期订单"""
        """两阶段提交（2PC: two-phase commit）"""
        tx_id = f"order_{order.id}"
        try:
            # ==== 1. 准备阶段 ====
            # 1.1 Redis预提交
            try:
                if not await asyncio.wait_for(tll_redis.prepare_increase_stock(order.seckill_id, tx_id), timeout=5):
                    raise Exception("Redis准备阶段失败")
            except asyncio.TimeoutError:
                raise Exception("Redis准备阶段超时")

            # 1.2 数据库预提交
            order.status = OrderStatusEnum.UNPAYED
            session.add(order)
            await session.flush()  # 不提交事务

            # 记录事务状态
            await self.coordinator.begin_transaction(tx_id)

            # ==== 2. 提交阶段 ====
            # 2.1 提交Redis
            try:
                if not await asyncio.wait_for(tll_redis.commit_increase_stock(order.seckill_id, tx_id), timeout=5):
                    await self.coordinator.rollback_transaction(tx_id)
                    raise Exception("Redis提交失败")
            except asyncio.TimeoutError:
                await self.coordinator.rollback_transaction(tx_id)
                raise Exception("Redis提交阶段超时")

            # 2.2 提交数据库
            order.status = OrderStatusEnum.REFUNDED
            await session.commit()
            await self.coordinator.commit_transaction(tx_id)

            # 日志记录
            await self.log_compensation(order.id, "库存恢复成功")

        except Exception as e:
            # 统一回滚
            await self.coordinator.rollback_transaction(tx_id)
            await tll_redis.rollback_increase_stock(order.seckill_id, tx_id)
            await session.rollback()

            logger.error(f"事务失败: {str(e)}")
            await self.retry_compensation(order.id, tx_id)


# 新增DLQ处理服务类
class DLQProcessor:
    def __init__(self):
        self.dlq_topic = "compensation_dlq"
        self.max_retries = 2  # DLQ消息最大重试次数

    async def process_dlq_message(self, dlq_data: dict):
        """处理死信队列消息"""
        order_id = dlq_data['order_id']
        retry_key = f"dlq_retries:{order_id}"

        try:
            # 检查重试次数
            retries = int(await tll_redis.get(retry_key)) or 0
            if retries >= self.max_retries:
                await self.archive_failed_order(dlq_data)
                return

            # 尝试重新处理
            async with AsyncSessionFactory() as session:
                order = await session.get(Order, order_id)
                if order and order.status == OrderStatusEnum.REFUNDED.value:
                    # await self.handle_expired_order(order, session)
                    # await self.log_compensation(order_id, "DLQ重试成功")
                    print('DLQ重试成功')

            await tll_redis.delete(retry_key)

        except Exception as e:
            await tll_redis.incr(retry_key)
            error_msg = f"DLQ处理失败（{retries + 1}/{self.max_retries}）: {str(e)}"
            # await self.send_alert(f"订单{order_id}处理失败", error_msg)
            # await self.log_compensation(order_id, error_msg)

    async def archive_failed_order(self, dlq_data: dict):
        """归档彻底失败订单"""
        async def send_alert(self, title: str, content: str, level: str = "warning"):
            """发送报警通知（示例集成钉钉机器人）"""
            # webhook_url = settings.DINGTALK_WEBHOOK
            # message = {
            #     "msgtype": "markdown",
            #     "markdown": {
            #         "title": title,
            #         "text": f"**级别**: {level}\n\n**详情**: {content}"
            #     }
            # }
            # async with aiohttp.ClientSession() as session:
            #     await session.post(webhook_url, json=message)
            pass

    async def start_dlq_consumer(self):
        """启动死信队列消费者"""

        consumer = None
        for attempt in range(settings.KAFKA_MAX_RETRIES):
            try:
                consumer = KafkaConsumer(
                    self.dlq_topic,
                    bootstrap_servers=[settings.KAFKA_SERVER],
                    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
                )
                logger.info("Kafka compensation consumer connect succeeded.")
                break
            except Exception as e:
                logger.error(f"Kafka compensation consumer connect failed (attempt {attempt+1}/{settings.KAFKA_MAX_RETRIES}): {e}")
                await asyncio.sleep(settings.KAFKA_RETRY_DELAY)

        logger.info(f'[DLQ] kafka_compensation 开始监听死信队列 {self.dlq_topic}')

        if not consumer:
            logger.info("[error] kafka compensation consumer is None.")

        while True:
            # 使用 poll 方法，设置超时时间为 1 秒
            messages = consumer.poll(timeout_ms=1000)
            for tp, msgs in messages.items():
                for message in msgs:
                    dlq_data = message.value
                    asyncio.create_task(self.process_dlq_message(dlq_data))
            await asyncio.sleep(10)  # 适当休眠，避免 CPU 占用过高


async def main():
    # 启动补偿定时任务
    compensator = CompensationService()

    # 新增DLQ处理器
    dlq_processor = DLQProcessor()
    dlq_task = asyncio.create_task(dlq_processor.start_dlq_consumer())

    # 定时任务与DLQ监听并行运行
    await asyncio.gather(
        run_periodic(compensator.scan_expired_orders, interval=9),
        dlq_task
    )


async def run_periodic(func, interval):
    """定时任务执行包装器"""
    while True:
        await func()
        await asyncio.sleep(interval)

if __name__ == '__main__':
    asyncio.run(main())
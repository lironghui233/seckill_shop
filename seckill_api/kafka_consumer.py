from kafka import KafkaConsumer
import settings
import json
import asyncio
from utils.cache import tll_redis
from loguru import logger
from models import AsyncSessionFactory
from models.order import Order, OrderStatusEnum
from utils.tllalipay import tll_alipay
from datetime import datetime, timedelta
from sqlalchemy import select
from kafka import KafkaProducer


async def seckill_queue_handle():
    
    consumer = None
    for attempt in range(settings.KAFKA_MAX_RETRIES):
        try:
            consumer = KafkaConsumer(
                'seckill',
                auto_offset_reset='latest',
                bootstrap_servers=[settings.KAFKA_SERVER],
                value_deserializer=lambda m: json.loads(m.decode('utf-8'))
            )
            logger.info("Kafka consumer connect succeeded.")
            break
        except Exception as e:
            logger.error(f"Kafka consumer connect failed (attempt {attempt+1}/{settings.KAFKA_MAX_RETRIES}): {e}")
            await asyncio.sleep(settings.KAFKA_RETRY_DELAY)

    if not consumer:
        logger.info("[error] kafka consumer is None.")

    logger.info('kafka_consumer 正在监听中')
    for message in consumer:
        seckill_dict = message.value
        seckill_id = seckill_dict['seckill_id']
        user_id = seckill_dict['user_id']
        count = seckill_dict['count']
        address = seckill_dict['address']

        # 校验
        seckill = await tll_redis.get_seckill(seckill_id)
        if not seckill:
            logger.info(f'{seckill_id}秒杀商品不存在！')
        if count > seckill['sk_per_max_count']:
            logger.info(f'{user_id}抢购了{count}，超过了{seckill['sk_per_max_count']}')

        # 生成订单到数据库
        async with AsyncSessionFactory() as session:
            async with session.begin():
                order = Order(
                    user_id=user_id, seckill_id=seckill_id, count=count,
                    amount=seckill['sk_price']*count,
                    address=address,
                )
                session.add(order)
            # 由于order.seckill是外键数据，在session结束后，就不在内存了。调用refresh把指定属性刷到内存order对象下
            await session.refresh(order, attribute_names=['seckill'])

        # 生成支付宝订单id
        alipay_order = tll_alipay.app_pay(
            out_trade_no=str(order.id),
            total_amount=float(order.amount),
            subject=seckill['commodity']['title'],
        )

        # 缓存订单到redis
        await tll_redis.add_order(order, alipay_order['alipay_order'])


async def main():
    await seckill_queue_handle()

if __name__ == '__main__':
    asyncio.run(main())
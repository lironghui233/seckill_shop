from .single import SingletonMeta
import redis.asyncio as redis
from models.seckill import Seckill
from models.order import Order
import json
from datetime import datetime
from loguru import logger
from typing import Optional, Callable, Any
import settings


class TLLRedis(metaclass=SingletonMeta):

    SECKILL_KEY = "seckill_{}"
    SECKILL_ORDER_KEY = "seckill_order_{user_id}_{seckill_id}"
    SECKILL_STOCK_KEY = "seckill_stock_{}"
    SECKILL_STOCK_LOCK_KEY = "seckill_stock_lock_{}"

    def __init__(self, *args, **kwargs):
        self.client = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
        self.key_func: Optional[Callable] = kwargs.pop('key_func', None)

        self.prepare_key_prefix = "prepare_increase_stock:"
        self.timeout = 3600  # 1小时超时，可根据需要调整

    def _process_key(self, key: str) -> str:
        """自定义键处理逻辑"""
        if self.key_func:
            return self.key_func(key)
        return key  # 默认直接返回原始键

    async def set(self, key, value, ex=5*60*60):
        processed_key = self._process_key(key)
        await self.client.set(processed_key, value, ex)

    async def set_dict(self, key: str, value: dict, ex: int=5*60*60):
        await self.set(key, json.dumps(value), ex)

    async def get(self, key):
        processed_key = self._process_key(key)
        value = await self.client.get(processed_key)
        if type(value) == bytes:
            return value.decode('utf-8')
        return value

    async def get_dict(self, key: str):
        value = await self.get(key)
        if not value:
            return None
        return json.loads(value)

    async def delete(self, key):
        await self.client.delete(key)

    async def decrease(self, key, amount=1):
        await self.client.decrby(key, amount)

    async def increase(self, key, amount=1):
        await self.client.incrby(key, amount)

    async def close(self):
        await self.client.aclose()

    async def add_seckill(self, seckill: Seckill):
        seckill_dict = seckill.to_dict()
        key = self.SECKILL_KEY.format(seckill.id)
        exp = int((seckill.end_time-datetime.now()).total_seconds())
        await self.set(key, json.dumps(seckill_dict), ex=exp)

    async def get_seckill(self, seckill_id: int):
        key = self.SECKILL_KEY.format(seckill_id)
        seckill_dict = await self.get_dict(key)
        return seckill_dict

    async def init_stock(self, seckill_id: int, stock: int):
        key = self.SECKILL_STOCK_KEY.format(seckill_id)
        await self.set(key, stock)

    async def get_stock(self, seckill_id: int):
        key = self.SECKILL_STOCK_KEY.format(seckill_id)
        return self.get(key)

    async def decrease_stock(self, seckill_id: int):
        key = self.SECKILL_STOCK_KEY.format(seckill_id)
        lock_key = self.SECKILL_STOCK_LOCK_KEY.format(seckill_id)
        async with self.client.lock(lock_key):
            # 竞态
            stock = await self.get(key)
            if not stock or int(stock) <= 0:
                return False
            await self.decrease(key, 1)
            return True

    async def increase_stock(self, seckill_id: int):
        key = self.SECKILL_STOCK_KEY.format(seckill_id)
        await self.increase(key, 1)

    async def add_order(self, order: Order, alipay_order: str):
        # 客户端知道 user_id, seckill_id， 就知道order的key
        key = self.SECKILL_ORDER_KEY.format(user_id=order.user_id, seckill_id=order.seckill_id)
        order_dict = order.to_dict()
        order_dict['alipay_order'] = alipay_order
        ex = (order.seckill.end_time-datetime.now()).total_seconds()
        await self.set_dict(key, order_dict, ex=int(ex))

    async def get_order(self, user_id: int, seckill_id: int):
        # 客户端知道 user_id, seckill_id， 就知道order的key
        key = self.SECKILL_ORDER_KEY.format(user_id=user_id, seckill_id=seckill_id)
        order_dict = await self.get_dict(key)
        return order_dict

    async def prepare_increase_stock(self, seckill_id, tx_id):
        """
        准备阶段：记录需要增加的库存信息，但不实际执行

        Args:
            seckill_id: 秒杀商品ID
            tx_id: 事务ID

        Returns:
            bool: 准备阶段是否成功
        """
        try:
            # 获取当前库存数量
            stock_key = self.SECKILL_STOCK_KEY.format(seckill_id)
            current_stock = await self.client.get(stock_key)

            if current_stock is None:
                # 如果库存键不存在，可能是系统错误
                return False

            # 记录准备阶段信息
            prepare_key = f"{self.prepare_key_prefix}{tx_id}"
            # 使用哈希表存储事务信息
            await self.client.hset(prepare_key, mapping={
                "seckill_id": seckill_id,
                "action": "increase",
                "amount": 1,  # 默认增加1个库存
                "status": "prepared"
            })

            # 设置过期时间，防止长时间未提交的事务占用资源
            await self.client.expire(prepare_key, self.timeout)

            return True
        except Exception as e:
            logger.error(f"准备增加库存失败: {str(e)}")
            return False

    async def commit_increase_stock(self, seckill_id, tx_id):
        """
        提交阶段：实际增加库存

        Args:
            seckill_id: 秒杀商品ID
            tx_id: 事务ID

        Returns:
            bool: 提交阶段是否成功
        """
        try:
            # 检查准备阶段是否已完成
            prepare_key = f"{self.prepare_key_prefix}{tx_id}"
            tx_info = await self.client.hgetall(prepare_key)
            print('tx_info', tx_info)

            # 解码所有键值对
            decoded_tx_info = {key.decode('utf-8'): value.decode('utf-8') for key, value in tx_info.items()}

            if not decoded_tx_info or decoded_tx_info.get("status") != "prepared":
                # 如果没有准备信息或状态不正确，则提交失败
                print("!!!!!!!!!!!!!!!!!!!!!111111111111!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
                return False

            # 实际增加库存
            stock_key = self.SECKILL_STOCK_KEY.format(seckill_id)
            await self.client.incr(stock_key)

            # 更新事务状态为已提交
            await self.client.hset(prepare_key, "status", "committed")

            # 可以设置一个较短的过期时间，提交后不久就可以清理
            await self.client.expire(prepare_key, 300)  # 5分钟后清理

            return True
        except Exception as e:
            logger.error(f"提交增加库存失败: {str(e)}")
            print("!!!!!!!!!!!!!!!!!!!!!2222222222222222!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
            return False

    async def rollback_increase_stock(self, seckill_id, tx_id):
        """
        回滚阶段：如果事务失败，清理准备阶段的数据

        Args:
            seckill_id: 秒杀商品ID
            tx_id: 事务ID

        Returns:
            bool: 回滚是否成功
        """
        try:
            # 检查准备阶段状态
            prepare_key = f"{self.prepare_key_prefix}{tx_id}"
            tx_info = await self.client.hgetall(prepare_key)

            # 解码所有键值对
            decoded_tx_info = {key.decode('utf-8'): value.decode('utf-8') for key, value in tx_info.items()}

            if not decoded_tx_info:
                # 没有准备信息，可能已经清理或从未准备
                return True

            # 检查状态
            status = decoded_tx_info.get("status").decode('utf-8')

            if status == "committed":
                # 如果已经提交，需要回滚库存操作
                stock_key = self.SECKILL_STOCK_KEY.format(seckill_id)
                await self.client.decr(stock_key)

            # 标记为已回滚并设置短暂过期时间
            await self.client.hset(prepare_key, "status", "rolled_back")
            await self.client.expire(prepare_key, 300)  # 5分钟后清理

            return True
        except Exception as e:
            logger.error(f"回滚增加库存失败: {str(e)}")
            return False


tll_redis = TLLRedis()
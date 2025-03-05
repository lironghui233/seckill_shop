from .single import SingletonMeta
import redis.asyncio as redis
from models.seckill import Seckill
from models.order import Order
import json
from datetime import datetime


class TLLRedis(metaclass=SingletonMeta):

    SECKILL_KEY = "seckill_{}"
    SECKILL_ORDER_KEY = "seckill_order_{user_id}_{seckill_id}"
    SECKILL_STOCK_KEY = "seckill_stock_{}"
    SECKILL_STOCK_LOCK_KEY = "seckill_stock_lock_{}"

    def __init__(self):
        self.client = redis.Redis(host='172.23.23.68', port=6379, db=0)

    async def set(self, key, value, ex=5*60*60):
        await self.client.set(key, value, ex)

    async def set_dict(self, key: str, value: dict, ex: int=5*60*60):
        await self.set(key, json.dumps(value), ex)

    async def get(self, key):
        value = await self.client.get(key)
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


tll_redis = TLLRedis()
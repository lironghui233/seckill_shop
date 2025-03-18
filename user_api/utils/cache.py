from .single import SingletonMeta
import redis.asyncio as redis
import settings


class TLLRedis(metaclass=SingletonMeta):
    SMS_CODE_PREFIX = 'sms_code_{}'
    REFRESH_TOKEN_PREFIX = "refresh_token_{}"

    def __init__(self):
        self.client = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

    async def set(self, key, value, ex=5*60*60):
        await self.client.set(key, value, ex)

    async def get(self, key):
        value = await self.client.get(key)
        if type(value) == bytes:
            return value.decode('utf-8')
        return value

    async def delete(self, key):
        await self.client.delete(key)

    async def set_sms_code(self, mobile, code):
        await self.set(self.SMS_CODE_PREFIX.format(mobile), code)

    async def get_sms_code(self, mobile):
        code = await self.get(self.SMS_CODE_PREFIX.format(mobile))
        return code

    async def set_refresh_token(self, user_id, refresh_token):
        ex = settings.JWT_REFRESH_TOKEN_EXPIRES
        await self.set(self.REFRESH_TOKEN_PREFIX.format(user_id), refresh_token, ex=ex)

    async def get_refresh_token(self, user_id):
        refresh_token = await self.get(self.REFRESH_TOKEN_PREFIX.format(user_id))
        return refresh_token

    async def delete_refresh_token(self, user_id):
        await self.delete(self.REFRESH_TOKEN_PREFIX.format(user_id))

    async def close(self):
        await self.client.aclose()

from contextlib import asynccontextmanager
from fastapi import FastAPI
from loguru import logger
import asyncio
from utils.cache import TLLRedis
from utils.tll_consul import TLLConsul
import settings

tll_consul = TLLConsul()

@asynccontextmanager
async def lifespan(FastAPI):
    # 程序即将开始之前
    # tll_consul.register()
    # await tll_consul.fetch_user_service_addresses()

    # 尝试注册 Consul 服务，重试机制
    for attempt in range(settings.CONSUL_MAX_RETRIES):
        try:
            tll_consul.register()
            logger.info("Consul service registration succeeded.")
            break
        except Exception as e:
            logger.error(f"Consul registration failed (attempt {attempt+1}/{settings.CONSUL_MAX_RETRIES}): {e}")
            await asyncio.sleep(settings.CONSUL_RETRY_DELAY)
    else:
        logger.error("Consul registration failed after max retries.")
        raise Exception("Consul registration failed.")

    # 尝试获取 user-service 地址
    for attempt in range(settings.CONSUL_MAX_RETRIES):
        try:
            await tll_consul.fetch_user_service_addresses()
            logger.info("Fetched user service addresses successfully.")
            break
        except Exception as e:
            logger.error(f"Fetching user service addresses failed (attempt {attempt+1}/{settings.CONSUL_MAX_RETRIES}): {e}")
            await asyncio.sleep(settings.CONSUL_RETRY_DELAY)
    else:
        logger.error("Fetching user service addresses failed after max retries.")
        raise Exception("Fetching user service addresses failed.")

    # logger.remove()
    # logger.add('logs/file_{time}.log', rotation='500 MB', enqueue=True)
    logger.add('logs/file.log', rotation='500 MB', enqueue=True, level='INFO')
    # 让出协程
    yield
    # 程序即将结束之前
    await TLLRedis().close()
    tll_consul.deregister()


from contextlib import asynccontextmanager
from fastapi import FastAPI
from loguru import logger
from utils.cache import TLLRedis


@asynccontextmanager
async def lifespan(FastAPI):
    # 程序即将开始之前
    # logger.remove()
    # logger.add('logs/file_{time}.log', rotation='500 MB', enqueue=True)
    logger.add('logs/file.log', rotation='500 MB', enqueue=True, level='INFO')
    # 让出协程
    yield
    # 程序即将结束之前
    await TLLRedis.close()
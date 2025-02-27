from fastapi import FastAPI
from hooks.lifespan import lifespan
from hooks.middlewares import log_middleware
from loguru import logger
from starlette.middleware.base import BaseHTTPMiddleware
from routers import user, address
import uvicorn
import settings

app = FastAPI(lifespan=lifespan)

# 添加中间件
app.add_middleware(BaseHTTPMiddleware, dispatch=log_middleware)

# 添加路由
app.include_router(user.router)
app.include_router(address.router)

@app.get("/")
async def root():
    # logger.info("这是由logger产生的日志")
    # logger.debug("这是debug的日志！")
    # logger.success("这是success的日志！")
    return {"message": "Hello World"}

@app.get("/health")
async def health_check():
    return "ok"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.SERVER_PORT)
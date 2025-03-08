from fastapi import FastAPI
from hooks.lifespan import lifespan
from hooks.middlewares import log_middleware
from loguru import logger
from starlette.middleware.base import BaseHTTPMiddleware
from routers import user, address
import uvicorn
import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(lifespan=lifespan)

# 添加中间件
app.add_middleware(BaseHTTPMiddleware, dispatch=log_middleware)

# 添加路由
app.include_router(user.router)
app.include_router(address.router)

# 跨域
origins = [
    "http://localhost:5173",  # 注意：去掉末尾斜杠
    "http://127.0.0.1:5173",  # 允许两种本地地址
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
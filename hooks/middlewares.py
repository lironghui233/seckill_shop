from fastapi import Request
from models import AsyncSessionFactory

async def db_session_middleware(request: Request, call_next):
    # 请求前的中间件（调用call_next前）
    session = AsyncSessionFactory()
    setattr(request.state, 'session', session)
    response = await call_next(request)
    # 响应后的中间件（调用call_next后）
    await session.close()
    return response
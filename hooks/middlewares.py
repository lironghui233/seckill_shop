from fastapi.requests import Request
from loguru import logger
from fastapi.responses import JSONResponse

async def log_middleware(request: Request, call_next):
    try:
        # 执行视图函数之前
        ## xx
        # 执行视图函数
        response = await call_next(request)
        # 执行视图函数之后
        await logger.complete()
        print('=='*20)
        return response
    except Exception as e:
        logger.exception('日志记录发生异常')
        return JSONResponse(content={'detail': '服务器内部错误！'}, status_code=500)
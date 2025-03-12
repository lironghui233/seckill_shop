from functools import wraps
from fastapi.exceptions import HTTPException
from utils.status_code import get_http_code
import grpc


def grpc_error_handler(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            result = await func(*args, **kwargs)
            return result
        except grpc.RpcError as e:
            code = e.code()
            details = e.details()
            raise HTTPException(status_code=get_http_code(code), detail=details)
    return wrapper
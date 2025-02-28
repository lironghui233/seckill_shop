from fastapi import APIRouter, Depends
from sqlalchemy import select
from models.order import Order
from schemas.response import OrderListSchema
from hooks.dependencies import get_db_session
from models import AsyncSession
from utils.auth import AuthHandler


auth_handler = AuthHandler()

router = APIRouter(prefix="/order", tags=["order"])


@router.get("/list", response_model=OrderListSchema)
async def order_list(
        page: int = 1,
        size: int = 10,
        user_id : int = Depends(auth_handler.auth_access_dependency),
        session : AsyncSession = Depends(get_db_session),
):
    async with session.begin():
        offset = (page - 1) * size
        result = await session.execute(select(Order).where(Order.user_id == user_id).limit(size).offset(offset))
        orders = result.scalars()
    return {'orders': orders}

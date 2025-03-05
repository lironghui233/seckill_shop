from fastapi import APIRouter, Request, Depends, HTTPException, status, Request
from sqlalchemy import select, update
from starlette.status import HTTP_400_BAD_REQUEST

from models.seckill import Seckill
from models.order import Order, OrderStatusEnum
from datetime import datetime
from schemas.response import SeckillListSchema, SeckillSchema, ResultSchema
from schemas.request import BuySchema
from hooks.dependencies import get_db_session
from models import AsyncSession, order
from utils.auth import AuthHandler

from alipay import AliPay
from alipay.utils import AliPayConfig
import aiofiles
import settings

from kafka import KafkaProducer
import json

from utils.cache import tll_redis


# 支付宝网页下载的证书不能直接被使用，需要加上头尾
# 你可以在此处找到例子： tests/certs/ali/ali_private_key.pem
# async with aiofiles.open('keys/app_private.key', mode='r') as f:
#     app_private_key_string = await f.read()
# async with aiofiles.open('keys/alipay_public.pem', mode='r') as f:
#     alipay_public_key_string = await f.read()
with open('keys/app_private.key', mode='r') as f:
    app_private_key_string = f.read()
with open('keys/alipay_public.pem', mode='r') as f:
    alipay_public_key_string = f.read()

alipay = AliPay(
    appid=settings.ALIPAY_APP_ID,
    # app_notify_url="http://www.example.com/notify",  # 默认回调 url
    app_notify_url="http://40051jw0mz12.vicp.fun/seckill/alipay/notify",  # 默认回调 url
    app_private_key_string=app_private_key_string,
    # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
    alipay_public_key_string=alipay_public_key_string,
    sign_type="RSA2",  # RSA 或者 RSA2
    # 沙箱环境需要设置debug=True
    debug=True,  # 默认 False
    verbose=True,  # 输出调试数据
    config=AliPayConfig(timeout=60)  # 可选，请求超时时间
)

kafka_producer = KafkaProducer(
    bootstrap_servers=settings.KAFKA_SERVER,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

auth_handler = AuthHandler()


router = APIRouter(prefix="/seckill", tags=["seckill"])

# @router.get("/ing", response_model=SeckillListSchema)
# async def get_ing_seckills(request:Request, page: int=1, size: int=10):
#     async with request.state.session.begin():
#         # 秒杀中： start_time <= now, end_time >= now
#         now = datetime.now()
#         offset = (page - 1) * size
#         stmt = select(Seckill).where(
#             Seckill.start_time <= now,
#             Seckill.end_time >= now
#         ).order_by(Seckill.create_time.desc()).limit(size).offset(offset)
#         result = await request.state.session.execute(stmt)
#         rows = result.scalars()
#         return {"seckills" : list(rows)}
#
#
# @router.get("/will", response_model=SeckillListSchema)
# async def get_will_seckills(request:Request, page: int=1, size: int=10):
#     async with request.state.session.begin():
#         # 即将秒杀： start_time > now
#         now = datetime.now()
#         offset = (page - 1) * size
#         stmt = select(Seckill).where(
#             Seckill.start_time > now,
#         ).order_by(Seckill.create_time.desc()).limit(size).offset(offset)
#         result = await request.state.session.execute(stmt)
#         rows = result.scalars()
#         return {"seckills" : list(rows)}


@router.get("/ing", response_model=SeckillListSchema)
async def get_ing_seckills(session:AsyncSession=Depends(get_db_session), page: int=1, size: int=10):
    async with session.begin():
        # 秒杀中： start_time <= now, end_time >= now
        now = datetime.now()
        offset = (page - 1) * size
        stmt = select(Seckill).where(
            Seckill.start_time <= now,
            Seckill.end_time >= now
        ).order_by(Seckill.create_time.desc()).limit(size).offset(offset)
        result = await session.execute(stmt)
        rows = result.scalars()
        return {"seckills" : list(rows)}


@router.get("/will", response_model=SeckillListSchema)
async def get_will_seckills(session:AsyncSession=Depends(get_db_session), page: int=1, size: int=10):
    async with session.begin():
        # 即将秒杀： start_time > now
        now = datetime.now()
        offset = (page - 1) * size
        stmt = select(Seckill).where(
            Seckill.start_time > now,
        ).order_by(Seckill.create_time.desc()).limit(size).offset(offset)
        result = await session.execute(stmt)
        rows = result.scalars()
        return {"seckills" : list(rows)}


@router.get("/detail/{seckill_id}", response_model=SeckillSchema)
async def get_seckill_detail(seckill_id: int, session:AsyncSession=Depends(get_db_session)):
    async with session.begin():
        stmt = select(Seckill).where(Seckill.id == seckill_id)
        result = await session.execute(stmt)
        seckill = result.scalar()
    if not seckill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="秒杀信息不存在！")
    return seckill


@router.get('/lock')
async def mysql_lock(session:AsyncSession=Depends(get_db_session)):
    seckill_id = '1895355460941250560'

    # 1. 悲观锁实现
    # # 以下创建事务，session自动commit
    # async with session.begin():
    #     # 悲观锁，查询条件加 with_for_update
    #     stmt = select(Seckill).where(Seckill.id==seckill_id).with_for_update()
    #     result = await session.execute(stmt)
    #     seckill = result.scalar()
    #     seckill.stock -= 1
    #     # 事务执行完后，就会自动释放悲观锁

    # 2. 乐观锁实现（需要在model配置version_id以及__mapper_args__）
    async with session.begin():
        stmt = select(Seckill).where(Seckill.id == seckill_id)
        result = await session.execute(stmt)
        seckill = result.scalar()
        seckill.stock -= 1

    return "ok"


# @router.post('/buy')
# async def buy(data: BuySchema, session:AsyncSession=Depends(get_db_session), user_id: int = Depends(auth_handler.auth_access_dependency)):
#     seckill_id = data.seckill_id
#     count = data.count
#     address = data.address
#
#     # 只能让用户抢购一次
#     async with session.begin():
#         stmt = select(Order).where(Order.user_id == user_id, Order.seckill_id == seckill_id)
#         result = await session.execute(stmt)
#         order = result.scalar()
#         # if order:
#         #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='您已经参加该秒杀！')
#
#         # 此处 with_for_update 意味着下面所有sql都加锁，直到session.commit后释放锁
#         seckill_result = await session.execute(select(Seckill).where(Seckill.id == seckill_id).with_for_update())
#         seckill = seckill_result.scalar()
#         if not seckill:
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='该秒杀不存在！')
#         if seckill.stock <= 0:
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='库存不足！')
#         if seckill.sk_per_max_count < count:
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'最多抢购{count}个！')
#
#         # 更新库存
#         await session.execute(update(Seckill).where(Seckill.id==seckill_id).values(stock=seckill.stock-1))
#
#     # 再重新开启一个新事务
#     async with session.begin():
#         # 创建新订单
#         order = Order(user_id=user_id, seckill_id=seckill_id, count=count, amount=seckill.sk_price*count, address=address)
#         session.add(order)
#
#     print("order.id:", order.id)
#
#     # 获取支付宝的orderStr
#     order_string = alipay.api_alipay_trade_app_pay(
#         out_trade_no=str(order.id),
#         total_amount=float(order.amount),
#         subject=seckill.commodity.title,
#     )
#
#     return {'alipay_order': order_string}


@router.post('/buy', response_model=ResultSchema)
async def buy(
        data: BuySchema,
        session:AsyncSession=Depends(get_db_session),
        user_id: int = Depends(auth_handler.auth_access_dependency)
):
    # 1. 先判断是否存在未支付或已支付的订单
    order = await tll_redis.get_order(user_id, data.seckill_id)
    if order:
        if order['status'] == OrderStatusEnum.UNPAYED.value:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='您有尚未支付的订单！')
        if order['status'] == OrderStatusEnum.PAYED.value:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='您已经抢购过商品！')

    # 2. 欲购买商品的库存减一（涉及分布式锁）
    result = await tll_redis.decrease_stock(data.seckill_id)
    if not result:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail='库存不足！')

    # 3. 如果有库存
    # 将pydantic.BaseModel类型变成字典
    from_data = data.model_dump()
    from_data['user_id'] = user_id
    # 发送到 kafka 的‘seckill’ TOPIC中
    kafka_producer.send('seckill', from_data)


    return ResultSchema()



@router.post('/alipay/notify')
async def alipay_notify(
        request: Request,
        session: AsyncSession=Depends(get_db_session),
):
    form_data = await request.form()
    data = dict(form_data)
    sign = data.pop('sign')
    result = alipay.verify(data, sign)
    if not result:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='该请求无效！')
    # 自己的订单号
    out_trade_no = data.get('out_trade_no')
    # 支付宝的订单号
    trade_no = data.get('trade_no')
    trade_status = data.get('trade_status')
    # 数据库订单状态修改
    async with session.begin():
        stmt = select(Order).where(Order.id == out_trade_no)
        result = await session.execute(stmt)
        order = result.scalar()
        if not order:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='该订单不存在！')
        order.alipay_trade_no = trade_no
        if trade_status == 'WAIT_BUYER_PAY':
            order.status = OrderStatusEnum.UNPAYED
        elif trade_status == 'TRADE_CLOSED':
            order.status = OrderStatusEnum.REFUNDED
        elif trade_status == 'TRADE_SUCCESS':
            order.status = OrderStatusEnum.PAYED
        elif trade_status == 'TRADE_FINISHED':
            order.status = OrderStatusEnum.FINISHED
    # 缓存订单状态修改
    await tll_redis.add_order(order=order, alipay_order=None)
    return "success"


@router.get('/order/{seckill_id}')
async def get_seckill_order(
        seckill_id: int,
        user_id: int = Depends(auth_handler.auth_access_dependency)
):
    # 从缓存读取订单信息
    order = await tll_redis.get_order(user_id, seckill_id)
    if not order:
        return {'alipay_order': ''}
    return {'alipay_order': order['alipay_order']}

from . import Base
from .base import SnowFlakeIdModel
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, String, BigInteger, ForeignKey, DateTime, Enum, Integer, DECIMAL
from datetime import datetime
from sqlalchemy.orm import relationship
from .seckill import Seckill
import enum


class OrderStatusEnum(enum.Enum):
    # 未支付
    UNPAYED = 1
    # 已支付
    PAYED = 2
    # 运输中
    TRANSIT = 3
    # 完成
    FINISHED = 4
    # 退款中
    REFUNDING = 5
    # 已退款
    REFUNDED = 6


class Order(Base, SnowFlakeIdModel, SerializerMixin):
    __tablename__ = 'order'
    serialize_only = ('id', 'create_time', 'status', 'count', 'amount', 'user_id', 'address', 'seckill')
    create_time = Column(DateTime, default=datetime.now)
    status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.UNPAYED)
    count = Column(Integer)
    amount = Column(DECIMAL(10, 2))

    alipay_trade_no = Column(String(200))

    user_id = Column(BigInteger)
    address = Column(String(500))

    seckill_id = Column(BigInteger, ForeignKey("seckill.id"))
    seckill = relationship(Seckill, backref='orders', lazy='joined')
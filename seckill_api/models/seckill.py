from . import Base
from sqlalchemy import Column, BigInteger, String, DECIMAL, JSON, Text, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from .base import SnowFlakeIdModel
import uuid


class Commodity(Base, SnowFlakeIdModel, SerializerMixin):
    __tablename__ = 'commodity'
    serialize_only = ('id', 'title', 'price', 'covers', 'detail', 'create_time')
    title = Column(String(200))
    price = Column(DECIMAL(10, 2))
    covers = Column(JSON)
    detail = Column(Text)
    create_time = Column(DateTime, default=datetime.now)


class Seckill(Base, SnowFlakeIdModel, SerializerMixin):
    __tablename__ = 'seckill'
    serialize_only = ('id', 'sk_price', 'start_time', 'end_time', 'create_time', 'max_sk_count', 'sk_per_max_count', 'commodity')
    sk_price = Column(DECIMAL(10, 2), comment='秒杀价')
    start_time = Column(DateTime, comment='秒杀开始时间')
    end_time = Column(DateTime, comment='秒杀结束时间')
    create_time = Column(DateTime, default=datetime.now)
    max_sk_count = Column(Integer, comment='秒杀数量')
    stock = Column(Integer, comment='库存量')
    sk_per_max_count = Column(Integer, comment='每人最多秒杀数量')

    commodity_id = Column(BigInteger, ForeignKey('commodity.id'))
    commodity = relationship(Commodity, backref=backref('seckills'), lazy='joined')

    version_id = Column(String(100), nullable=False)

    __mapper_args__ = {
        "version_id_col": version_id,
        "version_id_generator": lambda version: uuid.uuid4().hex
    }

    # seckill.commodity
    # commodity.seckills


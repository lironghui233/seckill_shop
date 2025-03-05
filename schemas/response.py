from pydantic import BaseModel, ConfigDict
from typing import List
from datetime import datetime
from enum import Enum

class ResultEnum(Enum):
    SUCCESS = 1
    FAILURE = 2

class ResultSchema(BaseModel):
    result: ResultEnum = ResultEnum.SUCCESS

class CommoditySchema(BaseModel):
    # 把整形转换为字符串类型
    model_config = ConfigDict(coerce_numbers_to_str=True)
    # id : int
    id: str
    title : str
    price : float
    covers : List[str]
    detail : str
    create_time : datetime

class SeckillSchema(BaseModel):
    # 把整形转换为字符串类型
    model_config = ConfigDict(coerce_numbers_to_str=True)
    # id : int
    id : str
    sk_price : float
    start_time : datetime
    end_time : datetime
    create_time : datetime
    max_sk_count : int
    sk_per_max_count : int
    stock: int

    commodity : CommoditySchema

class SeckillListSchema(BaseModel):
    seckills : List[SeckillSchema]

class OrderSchema(BaseModel):
    # 把整形转换为字符串类型
    model_config = ConfigDict(coerce_numbers_to_str=True)
    # id : int
    id: str
    create_time :datetime
    status : int
    count : int
    amount : float
    # alipay_trade_no : str
    address : str
    seckill : SeckillSchema

class OrderListSchema(BaseModel):
    orders : List[OrderSchema]
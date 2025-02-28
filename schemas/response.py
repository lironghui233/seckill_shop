from pydantic import BaseModel
from typing import List
from datetime import datetime

class CommoditySchema(BaseModel):
    id: int
    title : str
    price : float
    covers : List[str]
    detail : str
    create_time : datetime

class SeckillSchema(BaseModel):
    id : int
    sk_price : float
    start_time : datetime
    end_time : datetime
    create_time : datetime
    max_sk_count : int
    sk_per_max_count : int

    commodity : CommoditySchema

class SeckillListSchema(BaseModel):
    seckills : List[SeckillSchema]

class OrderSchema(BaseModel):
    id : int
    create_time :datetime
    status : int
    count : int
    amount : float
    # alipay_trade_no : str
    address : str
    seckill : SeckillSchema

class OrderListSchema(BaseModel):
    orders : List[OrderSchema]
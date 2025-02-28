from pydantic import BaseModel

class BuySchema(BaseModel):
    seckill_id: int
    count: int
    # 这里传的是地址的具体信息，比如：北京市朝阳区xx
    address: str

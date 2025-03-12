from pydantic import BaseModel, ConfigDict

class BuySchema(BaseModel):
    model_config = ConfigDict(coerce_numbers_to_str=True)
    seckill_id: int
    count: int
    # 这里传的是地址的具体信息，比如：北京市朝阳区xx
    address: str

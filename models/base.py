from utils.snowflake import snowflake
from sqlalchemy import Column, BigInteger

id_worker = snowflake.Snowflake(0 ,0)

def generate_id():
    return id_worker.get_id()

class SnowFlakeIdModel:
    id = Column(BigInteger, primary_key=True, default=generate_id)
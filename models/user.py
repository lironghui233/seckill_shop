from . import Base
from sqlalchemy import Column, String, BigInteger, Boolean, DateTime
import random
import string
from utils.snowflake.snowflake import Snowflake
from settings import DATACENTER_ID, WORKER_ID
from sqlalchemy_serializer import SerializerMixin # sqlalchemy_serializer: 将ORM模型序列化为字典

snowflake = Snowflake(DATACENTER_ID, WORKER_ID)

def generate_username():
    code = "".join(random.sample(string.digits, 6))
    return '用户' + code

def generate_snowflake_id():
    new_id = snowflake.get_id()
    return new_id

class User(Base, SerializerMixin):
    __tablename__ = 'user'
    # serialize_only = ('id', 'mobile')
    serialize_rules= ('-password', )
    id = Column(BigInteger, primary_key=True, default=generate_snowflake_id)
    mobile = Column(String(20), unique=True, index=True)
    username = Column(String(20), default=generate_username)
    password = Column(String(300), nullable=True)
    avatar = Column(String(200), nullable=True)
    is_active = Column(Boolean, default=True)
    is_staff = Column(Boolean, default=False)
    last_login = Column(DateTime, nullable=True)
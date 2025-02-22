from . import Base
from sqlalchemy import Column, String, Integer, Boolean, DateTime
import random
import string

def generate_username():
    code = "".join(random.sample(string.digits, 6))
    return '用户' + code

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    mobile = Column(String(20), unique=True, index=True)
    username = Column(String(20), default=generate_username)
    password = Column(String(300), nullable=True)
    avatar = Column(String(200), nullable=True)
    is_active = Column(Boolean, default=True)
    is_staff = Column(Boolean, default=False)
    last_login = Column(DateTime, nullable=True)
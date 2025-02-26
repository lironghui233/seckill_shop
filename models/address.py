from . import Base
from sqlalchemy import Column, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship
from .user import User
import uuid
from sqlalchemy_serializer import SerializerMixin

def generate_id():
    return uuid.uuid4().hex

class Address(Base, SerializerMixin):
    __tablename__ = 'address'
    serialize_only = ('id', 'realname', 'mobile', 'region', 'detail')
    id = Column(String(200), primary_key=True, default=generate_id)
    realname = Column(String(100))
    mobile = Column(String(20))
    region = Column(String(100))
    detail = Column(String(200))

    user_id = Column(BigInteger, ForeignKey('user.id'))
    user = relationship(User, backref='addresses')
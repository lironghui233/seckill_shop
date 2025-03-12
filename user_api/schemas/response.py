from pydantic import BaseModel
from enum import Enum
from typing import List


class ResultEnum(Enum):
    SUCCESS = 1
    FAILURE = 2

class ResultModel(BaseModel):
    result: ResultEnum = ResultEnum.SUCCESS

class UserModel(BaseModel):
    id: int
    mobile: str
    username: str
    avatar: str
    is_active: bool
    is_staff: bool

class LoginedModel(BaseModel):
    user: UserModel
    access_token: str
    refresh_token: str

class UpdatedAvatarModel(BaseModel):
    file_url: str


class AddressModel(BaseModel):
    id: str
    realname: str
    mobile: str
    region: str
    detail: str


class AddressListModel(BaseModel):
        addresses: List[AddressModel]
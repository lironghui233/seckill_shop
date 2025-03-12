from pydantic import BaseModel

class LoginModel(BaseModel):
    mobile: str
    code: str

class UpdateUsernameModel(BaseModel):
    username: str

class UpdatePasswordModel(BaseModel):
    password: str


class CreateAddressModel(BaseModel):
    realname: str
    mobile: str
    region: str
    detail: str

class DeleteAddressModel(BaseModel):
    id: str

class UpdateAddressModel(CreateAddressModel):
    id: str

class LoginWithPasswordModel(BaseModel):
    mobile: str
    password: str
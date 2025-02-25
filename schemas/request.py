from pydantic import BaseModel

class LoginModel(BaseModel):
    mobile: str
    code: str

class UpdateUsernameModel(BaseModel):
    username: str
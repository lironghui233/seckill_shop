from fastapi import APIRouter, HTTPException
import string
import random
from utils.alysms import AliyunSMSSender
from schemas.response import ResultModel, LoginedModel, UserModel, UpdatedAvatarModel
from utils.cache import TLLRedis
from schemas.request import LoginModel, UpdateUsernameModel, UpdatePasswordModel
from utils.auth import AuthHandler
from fastapi import Depends, UploadFile
from services.user import UserServiceClient
from utils.alyoss import oss_upload_image
from fastapi import status

router = APIRouter(prefix="/user", tags=["user"])

sms_sender = AliyunSMSSender()
ttl_redis = TLLRedis()
auth_handler = AuthHandler()
user_service_client = UserServiceClient()

@router.get("/smscode/{mobile}", response_model=ResultModel)
async def get_sms_code(mobile: str):
    code = "".join(random.sample(string.digits, 4))
    # await sms_sender.send_code(mobile, code)
    print("code", code)
    await ttl_redis.set_sms_code(mobile, code)
    vcode = await ttl_redis.get_sms_code(mobile)
    print("vcode", vcode)
    return ResultModel()

@router.post('/login', response_model=LoginedModel)
async def login(data: LoginModel):
    mobile = data.mobile
    code = data.code
    cached_data = await ttl_redis.get_sms_code(mobile)
    if code != cached_data:
        raise HTTPException(status_code=404, detail='验证码错误！')
    # 调用远程微服务
    # async with grpc.aio.insecure_channel('127.0.0.1:50051') as channel:
    #     stub = user_pb2_grpc.UserStub(channel)
    #     request = user_pb2.MobileRequest()
    #     request.mobile = mobile
    #     response = await stub.GetOrCreateUserByMobile(request)
    #     user = response.user
    #     tokens = auth_handler.encode_login_token(user.id)
    #     return {
    #         'user': user,
    #         'access_token': tokens['access_token'],
    #         'refresh_token': tokens['refresh_token'],
    #     }
    user = await user_service_client.get_or_create_user_by_mobile(mobile)
    tokens = auth_handler.encode_login_token(user.id)
    return {
        'user': user,
        'access_token': tokens['access_token'],
        'refresh_token': tokens['refresh_token'],
    }

@router.get('/access/token')
async def access_token_view(user_id: int = Depends(auth_handler.auth_access_dependency)):
    return {'detail': "accesstoken 验证成功！", "user_id": user_id}

@router.get('/refresh/token')
async def refresh_token_view(user_id: int = Depends(auth_handler.auth_refresh_dependency)):
    # 调用 /user/refresh/token，那么refresh token没有过期，重新返回一个 access token
    access_token = auth_handler.encode_update_token(user_id)
    return access_token

@router.put('/update/username', response_model=ResultModel)
async def update_username(data: UpdateUsernameModel, user_id: int = Depends(auth_handler.auth_access_dependency)):
    username = data.username
    # 调用远程微服务
    # async with grpc.aio.insecure_channel('127.0.0.1:50051') as channel:
    #     stub = user_pb2_grpc.UserStub(channel)
    #     request = user_pb2.UsernameRequest(username=username, id=user_id)
    #     try:
    #         await stub.UpdateUsername(request)
    #     except grpc.RpcError as e:
    #         print(e.code())
    #         print(e.details())
    #         raise HTTPException(status_code=400, detail=e.details())
    #     return ResultModel()
    await user_service_client.update_username(user_id, username)
    return ResultModel()

@router.put('/update/password', response_model=ResultModel)
async def update_password(data: UpdatePasswordModel, user_id: int = Depends(auth_handler.auth_access_dependency)):
    password = data.password
    await user_service_client.update_password(user_id, password)
    return ResultModel()

@router.put('/update/avatar', response_model=UpdatedAvatarModel)
async def update_avatar(
        file: UploadFile,
        user_id: int = Depends(auth_handler.auth_access_dependency)
):
    file_url = await oss_upload_image(file)
    if file_url:
        # 调用远程微服务
        await user_service_client.update_avatar(user_id, file_url)
        return {'file_url': file_url}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='头像上传失败！')

@router.get('/mine', response_model=UserModel)
async def get_mine_info(user_id: int = Depends(auth_handler.auth_access_dependency)):
    user = user_service_client.get_user_by_id(user_id)
    return user
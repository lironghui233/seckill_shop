from utils.single import SingletonMeta
import grpc
from services.protos import user_pb2, user_pb2_grpc
from .decorators import grpc_error_handler

class UserStub:
    def __init__(self):
        self.user_service_addr = '127.0.0.1:50051'

    async def __aenter__(self):
        self.channel = grpc.aio.insecure_channel(self.user_service_addr)
        stub = user_pb2_grpc.UserStub(self.channel)
        return stub

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.channel.close()


class UserServiceClient(metaclass=SingletonMeta):

    @grpc_error_handler
    async def get_or_create_user_by_mobile(self, mobile:str):
        async with UserStub() as stub:
            request = user_pb2.MobileRequest(mobile=mobile)
            reponse = await stub.GetOrCreateUserByMobile(request)
            return reponse.user

    @grpc_error_handler
    async def update_username(self, id:int, username:str):
        async with UserStub() as stub:
            request = user_pb2.UsernameRequest(id=id, username=username)
            await stub.UpdateUsername(request)
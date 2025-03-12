from utils.single import SingletonMeta
import grpc
from services.protos import address_pb2, address_pb2_grpc
from .decorators import grpc_error_handler
from utils.tll_consul import TLLConsul

tll_consul = TLLConsul()

class AddressStub:
    def __init__(self):
        # self.address_service_addr = '127.0.0.1:50051'
        pass

    @property
    def address_service_addr(self):
        host, port = tll_consul.get_one_user_service_address()
        return f"{host}:{port}"

    async def __aenter__(self):
        self.channel = grpc.aio.insecure_channel(self.address_service_addr)
        stub = address_pb2_grpc.AddressStub(self.channel)
        return stub

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.channel.close()

class AddressServiceClient(metaclass=SingletonMeta):

    @grpc_error_handler
    async def create_address(
            self,
            user_id :int,
            realname: str,
            mobile: str,
            region: str,
            detail: str
    ):
        async with AddressStub() as stub:
            request = address_pb2.CreateAddressRequest(
                user_id=user_id,
                realname=realname,
                mobile=mobile,
                region=region,
                detail=detail
            )
            response = await stub.CreateAddress(request)
            return response.address

    @grpc_error_handler
    async def update_address(
            self,
            id : int,
            realname : str,
            mobile : str,
            region : str,
            detail : str,
            user_id : int,
    ):
        async with AddressStub() as stub:
            request = address_pb2.UpdateAddressRequest(
                id=id,
                realname=realname,
                mobile=mobile,
                region=region,
                detail=detail,
                user_id=user_id,
            )
            await stub.UpdateAddress(request)

    @grpc_error_handler
    async def delete_address(self, id : str, user_id : int):
        async with AddressStub() as stub:
            request = address_pb2.DeleteAddressRequest(id=id, user_id=user_id)
            await stub.DeleteAddress(request)

    @grpc_error_handler
    async def get_address_by_id(self, id : str, user_id : int):
        async with AddressStub() as stub:
            request = address_pb2.AddressIdRequest(id=id, user_id=user_id)
            response = await stub.GetAddressById(request)
            return response.address

    @grpc_error_handler
    async def get_address_list(self, user_id : int, page : int = 1, size : int = 10):
        async with AddressStub() as stub:
            request = address_pb2.AddressListRequest(user_id=user_id, page=page, size=size)
            response = await stub.GetAddressList(request)
            return response.addresses
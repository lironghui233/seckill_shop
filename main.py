import grpc
from services.user import UserService
from protos import user_pb2_grpc, address_pb2_grpc
import asyncio
from services.interceptors import UserInterceptor
from services.address import AddressService


async def main():
    server = grpc.aio.server(interceptors=[UserInterceptor()])
    user_pb2_grpc.add_UserServicer_to_server(UserService(), server)
    address_pb2_grpc.add_AddressServicer_to_server(AddressService(), server)
    server.add_insecure_port('[::]:50051')
    await server.start()
    print('grpc 服务已经启动！')
    await server.wait_for_termination()

if __name__ == '__main__':
    asyncio.run(main())
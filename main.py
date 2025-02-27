import grpc
from services.user import UserServicer
from protos import user_pb2_grpc, address_pb2_grpc
import asyncio
from services.interceptors import UserInterceptor
from services.address import AddressServicer
import uuid
import consul
from typing import Tuple
import socket
from loguru import logger

def get_ip_port() -> Tuple[str, int]:
    sock_ip = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock_ip.connect(("8.8.8.8", 80))
    ip = sock_ip.getsockname()[0]
    sock_ip.close()

    sock_port = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_port.bind(("", 0))
    _, port = sock_port.getsockname()
    sock_port.close()
    return ip, port

client = consul.Consul(host='127.0.0.1', port=8500)
def register_consul(ip : str, port: int):
    service_id = uuid.uuid4().hex
    client.agent.service.register(
        name="user_service",
        service_id=service_id,
        address=ip,
        port=port,
        tags=["user", "grpc"],
        check=consul.Check.tcp(host=ip, port=port, interval='10s'),
    )
    return service_id

def deregister_consul(service_id: str):
    client.agent.service.deregister(service_id)

async def main():
    ip, port = get_ip_port()
    server = grpc.aio.server(interceptors=[UserInterceptor()])
    user_pb2_grpc.add_UserServicer_to_server(UserServicer(), server)
    address_pb2_grpc.add_AddressServicer_to_server(AddressServicer(), server)
    server.add_insecure_port(f'0.0.0.0:{port}')
    # 注册本服务地址到 consul
    service_id = register_consul(ip, port)
    # 启动服务
    await server.start()
    # print('grpc 服务已经启动！')
    logger.info(f"grpc 服务已经启动：0.0.0.0:{port}")
    try:
        # 循环等待终结进程
        await server.wait_for_termination()
    finally:
        deregister_consul(service_id)

if __name__ == '__main__':
    asyncio.run(main())
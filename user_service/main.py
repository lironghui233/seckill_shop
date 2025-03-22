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
import settings

# 获取本机ip和port
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

# 获取容器overlay网络ip和port
def get_overlay_ip_port() -> Tuple[str, int]:
    ip = socket.gethostbyname(socket.gethostname())
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(("", 0))
    port = sock.getsockname()[1]
    sock.close()
    return ip, port

client = consul.Consul(host=settings.CONSUL_HOST, port=settings.CONSUL_PORT)
def register_consul(ip : str, port: int):
    service_id = uuid.uuid4().hex
    client.agent.service.register(
        name="user-service",
        service_id=service_id,
        address=ip,   # 使用本机固定ip
        # address=settings.SERVER_NAME, #使用docker swarm服务的 DNS 名称
        port=port,
        tags=["user", "grpc"],
        check=consul.Check.tcp(host=ip, port=port, interval='10s'), # 使用本机固定ip
        # check=consul.Check.tcp(host=settings.SERVER_NAME, port=port, interval='10s'), #使用docker swarm服务的 DNS 名称
    )
    return service_id

def deregister_consul(service_id: str):
    client.agent.service.deregister(service_id)

async def main():
    # ip, port = get_ip_port()
    ip, port = get_overlay_ip_port()
    logger.info(f"!!!!!!!!ip:{ip}!!!!!!:")
    logger.info(f"!!!!!!!!port:{port}!!!!!!:")
    server = grpc.aio.server(interceptors=[UserInterceptor()])
    user_pb2_grpc.add_UserServicer_to_server(UserServicer(), server)
    address_pb2_grpc.add_AddressServicer_to_server(AddressServicer(), server)
    server.add_insecure_port(f'0.0.0.0:{port}')


    # 尝试注册本服务地址到 Consul 服务，重试机制
    service_id = None
    for attempt in range(settings.CONSUL_MAX_RETRIES):
        try:
            service_id = register_consul(ip, port)
            logger.info("Consul service registration succeeded.")
            break
        except Exception as e:
            logger.error(f"Consul registration failed (attempt {attempt+1}/{settings.CONSUL_MAX_RETRIES}): {e}")
            await asyncio.sleep(settings.CONSUL_RETRY_DELAY)
    
    
    # 启动服务
    await server.start()
    # print('grpc 服务已经启动！')
    logger.info(f"grpc 服务已经启动：0.0.0.0:{port}")
    
    try:
        # 循环等待终结进程
        await server.wait_for_termination()
    finally:
        if(service_id):
            deregister_consul(service_id)

if __name__ == '__main__':
    asyncio.run(main())
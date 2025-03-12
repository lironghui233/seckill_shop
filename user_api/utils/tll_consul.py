import consul
import uuid
from .single import SingletonMeta
import socket
from typing import Tuple, List, Dict
import settings
from dns import asyncresolver, rdatatype

def get_current_ip() -> Tuple[str, int]:
    sock_ip = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock_ip.connect(("8.8.8.8", 80))
    ip = sock_ip.getsockname()[0]
    sock_ip.close()
    return ip

class ServiceAddress:
    def __init__(self, host:str, port:int):
        self.host = host
        self.port = port
        self.count = 0

    def increment(self):
        self.count += 1


class LoadBalancer:
    def __init__(self, addresses: List[Dict[str,str|int]] = None):
        self.addresses: List[ServiceAddress] = []
        if addresses:
            self.init_addresses(addresses)

    def init_addresses(self, addresses: List[Dict[str,str|int]]):
        self.addresses.clear()
        for address in addresses:
            self.addresses.append(ServiceAddress(host=address["ip"], port=address["port"]))

    def get_address(self) -> Tuple[str|None, int|None]:
        if len(self.addresses) > 0:
            self.addresses.sort(key=lambda address: address.count)
            address = self.addresses[0]
            address.increment()
            return address.host, address.port
        else:
            return None, None


class TLLConsul(metaclass=SingletonMeta):
    def __init__(self):
        self.consul_host = settings.CONSUL_HOST
        self.consul_http_port = settings.CONSUL_HTTP_PORT
        self.consul_dns_port = settings.CONSUL_DNS_PORT
        self.client = consul.Consul(host=self.consul_host, port=self.consul_http_port)
        self.user_service_id = uuid.uuid4().hex
        self.user_service_lb = LoadBalancer()

    def register(self):
        ip = get_current_ip()
        port = settings.SERVER_PORT
        self.client.agent.service.register(
            name="user_api",
            service_id=self.user_service_id,
            address=ip,
            port=port,
            tags=["user", "http"],
            check=consul.Check.http(url=f"http://{ip}:{port}/health", interval='10s'),
        )

    def deregister(self):
        self.client.agent.service.deregister(self.user_service_id)

    async def fetch_user_service_addresses(self):
        resolver = asyncresolver.Resolver()
        resolver.nameservers = [self.consul_host]
        resolver.port = self.consul_dns_port

        # 解析 user_service 服务的所有ip地址
        answer = await resolver.resolve(f'user_service.service.consul', rdatatype.A)
        ips = []
        for info in answer:
            ips.append(info.address)

        # 解析 user_service 服务的所有port地址
        answer_port = await resolver.resolve(f'user_service.service.consul', rdatatype.SRV)
        ports = []
        for info in answer_port:
            ports.append(info.port)

        user_addresses = []
        for index, port in enumerate(ports):
            if len(ips) == 1:
                user_addresses.append({"ip":ips[0], "port":port})
            else:
                user_addresses.append({"ip":ips[index], "port":port})

        # print(user_addresses)
        self.user_service_lb.init_addresses(user_addresses)

    def get_one_user_service_address(self) -> Tuple[str|None, int|None]:
        return self.user_service_lb.get_address()
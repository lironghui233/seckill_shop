from datetime import timedelta
import os

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'qweqfsfsafaf') 
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 2)))
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 13)))

ALIYUN_OSS_ENDPOINT = os.getenv('ALIYUN_OSS_ENDPOINT', 'https://oss-cn-hangzhou.aliyuncs.com ')
ALIYUN_OSS_BUCKET = os.getenv('ALIYUN_OSS_BUCKET', 'leoh-seckill-shop')
ALIYUN_OSS_REGION = os.getenv('ALIYUN_OSS_REGION', 'cn-hangzhou')
ALIYUN_OSS_DOMAIN = os.getenv('ALIYUN_OSS_DOMAIN', 'https://leoh-seckill-shop.oss-cn-hangzhou.aliyuncs.com/')

# CONSUL_HOST = '192.168.0.111'
# CONSUL_HTTP_PORT = 8500
# CONSUL_DNS_PORT = 8600

CONSUL_HOST = (os.getenv('CONSUL_HOST', 'consul'))  # Docker Swarm 的服务发现机制。在 Docker Swarm 中，每个服务都会自动分配一个 DNS 名称，格式为：<service_name>.<network_name>
CONSUL_HTTP_PORT = (os.getenv('CONSUL_HTTP_PORT', 8500))
CONSUL_DNS_PORT = (os.getenv('CONSUL_DNS_PORT', 8600))
CONSUL_MAX_RETRIES = int(os.getenv('CONSUL_MAX_RETRIES', 390)) # 连接consul重试次数
CONSUL_RETRY_DELAY = int(os.getenv('CONSUL_RETRY_DELAY', 3)) # 连接consul重试间隔


SERVER_NAME = os.getenv('SERVER_NAME', "user-api") # Docker Swarm 的服务发现机制。本机服务名
SERVER_PORT = int(os.getenv('SERVER_PORT', 8000))


REDIS_HOST = os.getenv('REDIS_HOST', '192.168.0.111')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
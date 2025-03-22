import os

MYSQL_HOST = (os.getenv('MYSQL_HOST', '192.168.0.111'))
MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))
MYSQL_USER = (os.getenv('MYSQL_USER', 'leoh123'))
MYSQL_PASSWORD = (os.getenv('MYSQL_PASSWORD', '123123123'))
MYSQL_DB = (os.getenv('MYSQL_DB', 'leoh_seckillshop_user_db'))

DB_URI = f"mysql+asyncmy://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"


DATACENTER_ID = os.getenv('DATACENTER_ID', 0)
WORKER_ID = os.getenv('WORKER_ID', 0)


# CONSUL_HOST = '192.168.0.111'
# CONSUL_PORT = 8500

CONSUL_HOST = (os.getenv('CONSUL_HOST', 'consul'))  # Docker Swarm 的服务发现机制。在 Docker Swarm 中，每个服务都会自动分配一个 DNS 名称，格式为：<service_name>.<network_name>
CONSUL_PORT = int(os.getenv('CONSUL_PORT', 8500))
CONSUL_MAX_RETRIES = int(os.getenv('CONSUL_MAX_RETRIES', 390)) # 连接consul重试次数
CONSUL_RETRY_DELAY = int(os.getenv('CONSUL_RETRY_DELAY', 3)) # 连接consul重试间隔


SERVER_NAME = os.getenv('SERVER_NAME', 'user-service') # Docker Swarm 的服务发现机制。本机服务名
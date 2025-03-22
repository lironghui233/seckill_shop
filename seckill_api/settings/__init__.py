import os

MYSQL_HOST = os.getenv('MYSQL_HOST', '192.168.0.111')
MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))
MYSQL_USER = os.getenv('MYSQL_USER', 'leoh123')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '123123123')
MYSQL_DB = os.getenv('MYSQL_DB', 'leoh_seckillshop_seckill_db')


# DB_URI = f"mysql+asyncmy://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"
DB_URI = f"mysql+aiomysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'qweqfsfsafaf')

ALIPAY_APP_ID = os.getenv('ALIPAY_APP_ID', '9021000145616850')

# KAFKA_SERVER = '192.168.0.111:9092' #固定ip
KAFKA_SERVER = (os.getenv('KAFKA_SERVER', 'kafka')) #Docker Swarm 的服务发现机制。kafka服务名
KAFKA_MAX_RETRIES = int(os.getenv('KAFKA_MAX_RETRIES', 390)) # 连接kafka重试次数
KAFKA_RETRY_DELAY = int(os.getenv('KAFKA_RETRY_DELAY', 3)) # 连接kafka重试间隔


REDIS_HOST = os.getenv('REDIS_HOST', '192.168.0.111')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))


SERVER_PORT = int(os.getenv('SERVER_PORT', 8100))
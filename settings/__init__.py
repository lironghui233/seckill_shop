

MYSQL_HOST = '172.23.23.68'
MYSQL_PORT = 3306
MYSQL_USER = 'leoh123'
MYSQL_PASSWORD = '123123123'
MYSQL_DB = 'leoh_seckillshop_seckill_db'


# DB_URI = f"mysql+asyncmy://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"
DB_URI = f"mysql+aiomysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"

JWT_SECRET_KEY = 'qweqfsfsafaf'

ALIPAY_APP_ID = '9021000145616850'
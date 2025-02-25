from datetime import timedelta

JWT_SECRET_KEY = 'qweqfsfsafaf'
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=2)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=13)

ALIYUN_OSS_ENDPOINT = 'https://oss-cn-hangzhou.aliyuncs.com '
ALIYUN_OSS_BUCKET = 'leoh-seckill-shop'
ALIYUN_OSS_REGION = 'cn-hangzhou'
ALIYUN_OSS_DOMAIN = 'https://leoh-seckill-shop.oss-cn-hangzhou.aliyuncs.com/'
#!/bin/bash
# 加载 .env 文件
set -a
. /app/user_api/.env  # 替换为 .env 文件在镜像内的实际路径
set +a


python3 main.py  
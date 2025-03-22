FROM python:3.12.3-slim
# 安装编译工具和依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*
COPY . /app/admin_back
WORKDIR /app/admin_back
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
# ENTRYPOINT python3 manage.py runserver 0.0.0.0:9000 
RUN pip install uwsgi -i https://pypi.tuna.tsinghua.edu.cn/simple
# 创建非 root 用户
RUN useradd -m appuser && chown -R appuser /app
USER appuser
ENTRYPOINT uwsgi --ini uwsgi.ini
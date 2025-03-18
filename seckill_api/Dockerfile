FROM python:3.12.0-slim
COPY . /app/seckill_api
WORKDIR /app/seckill_api
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
ENTRYPOINT python main.py
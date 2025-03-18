FROM python:3.12.0-slim
COPY . /app/user_service
WORKDIR /app/user_service
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
ENTRYPOINT python main.py
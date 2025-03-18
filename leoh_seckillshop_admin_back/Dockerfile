FROM python:3.12.0-slim
COPY . /app/admin_back
WORKDIR /app/admin_back
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
ENTRYPOINT python3 manage.py runserver 0.0.0.0:9000 
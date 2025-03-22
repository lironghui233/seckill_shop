FROM node:lts-alpine AS frontend
RUN npm install pnpm -g
COPY . ./www
WORKDIR /www
RUN pnpm install --registry=https://registry.npmmirror.com
RUN pnpm run build

FROM nginx:1.25.5 AS web
COPY --from=frontend /www/dist/ /usr/share/nginx/html/
COPY --from=frontend /www/nginx_oa.conf /etc/nginx/conf.d/default.conf 
COPY --from=frontend /www/curl-amd64 /usr/bin/curl
COPY --from=frontend /www/start.sh /
RUN chmod +x /usr/bin/curl
RUN chmod +x /start.sh 

EXPOSE 80

# 验证 nginx 配置并启动
CMD ["./start.sh"]

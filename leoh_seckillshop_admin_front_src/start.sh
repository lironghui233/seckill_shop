#!/bin/bash

# 获取 SERVICES 环境变量，如果未设置则使用默认值
USER_API_SERVICE="${USER_API_SERVICE:-user-api:8000/health}"
SECKILL_API_SERVICE="${SECKILL_API_SERVICE:-seckill-api:8100/health}"
ADMIN_BACK_SERVICE="${ADMIN_BACK_SERVICE:-admin-back:9000/health}"

SERVICES="$USER_API_SERVICE $SECKILL_API_SERVICE $ADMIN_BACK_SERVICE"


MAX_RETRIES=600
RETRY_INTERVAL=5

check_all_services() {
    local num="$1"
    local pids=()

    # 并行发起请求
    for service in $SERVICES; do
        (
            host="${service%%:*}"
            remainder="${service#*:}"
            port="${remainder%%/*}"
            path="${remainder#*/}"

            if curl -sSf -L "http://$host:$port/$path" >/dev/null 2>&1; then
                exit 0
            else
                echo "[$(date '+%Y-%m-%d %H:%M:%S')] 第 $num 次检测 http://$host:$port/$path 失败，等待 $RETRY_INTERVAL 秒后重试..."
                exit 1
            fi
        ) &
        pids+=($!)
    done

    # 收集结果
    local success=0
    for pid in "${pids[@]}"; do
        if ! wait "$pid"; then
            success=1
        fi
    done

    return $success
}

for i in $(seq 1 $MAX_RETRIES); do
    if check_all_services "$i"; then
        echo "所有依赖服务已就绪！"
        echo "启动nginx..."
        exec nginx -g "daemon off;"
        exit 0
    else
        sleep $RETRY_INTERVAL
    fi
done

echo "错误：已达到最大重试次数，等待服务超时！" >&2
exit 1
    
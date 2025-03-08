import http from "./http"

const getCommodityList = () => {
    const path = "/seckill/commodity/"
    return http.seckill_get(path)
}

const getSeckillList = () => {
    const path = "/seckill/seckill/"
    return http.seckill_get(path)
}

const addSeckill = (data) => {
    const path = "/seckill/seckill/"
    return http.seckill_post(path, data)
}


export default {
    getCommodityList,
    getSeckillList,
    addSeckill
}

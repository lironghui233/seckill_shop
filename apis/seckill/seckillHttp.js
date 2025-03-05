import baseSeckillHttp from "./BaseSeckillHttp";

const getIngSeckillList = (page=1, size=10) => {
	const path = "/seckill/ing"
	return baseSeckillHttp.get(path, {page, size})
}

const getWillSeckillList = (page=1, size=10) => {
	const path = "/seckill/will"
	return baseSeckillHttp.get(path, {page, size})
}

const getSeckillDetail = (seckill_id) =>{
	const path = "/seckill/detail/" + seckill_id 
	return baseSeckillHttp.get(path)
}

const buySeckill = (seckill_id, address, count=1) => {
	const path = "/seckill/buy"
	return baseSeckillHttp.post(path, {seckill_id, count, address})
}

const getMyOrders = (page=1, size=10) => {
	const path = "/order/list"
	return baseSeckillHttp.get(path, {page, size}) 
}

const getSeckillOrder = (seckill_id) => {
	const path = "/seckill/order/" + seckill_id
	return baseSeckillHttp.get(path)
}

export default {
	getIngSeckillList,
	getWillSeckillList,
	getSeckillDetail,
	buySeckill,
	getMyOrders,
	getSeckillOrder,
}
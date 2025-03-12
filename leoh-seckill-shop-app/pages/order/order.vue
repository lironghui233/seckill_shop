<template>
	<view class="mt-2 py-2 bg-white" v-for="order in orders" :key="order.id">
		<view class="px-2 d-flex j-sb font">
			<text class="text-dark">订单号: {{order.id}}</text>
			<text class="font-theme-color">
				<template v-if="order.status==1">未支付</template>
				<template v-else-if="order.status==2">已支付</template>
				<template v-else-if="order.status==3">运输中</template>
				<template v-else-if="order.status==4">完成</template>
				<template v-else-if="order.status==5">退款中</template>
				<template v-else-if="order.status==6">已退款</template>
			</text>
		</view>
		<view class="d-flex mt-2 px-2">
			<view style="width: 148rpx; height: 148rpx;" class="rounded over-hidden">
				<image :src="order.seckill.commodity.covers[0]" class="w-100 h-100"></image>
			</view>
			<view class="flex-1 font text-dark pl-2">
				{{order.seckill.commodity.title}}
			</view>
			<view style="width: 139rpx;" class="text-right">
				<view class="font text-dark">￥{{order.seckill.sk_price}}</view>
				<view class="font-sm text-grey">×{{order.count}}</view>
			</view>
		</view>
		<view class="mt-2 border-top border-bottom py-2 text-right pr-2">
			<text class="font text-dark">实付：￥{{order.amount}}</text>
		</view>
		<view class="mt-2 px-2 d-flex j-end font">
			<view class="border px-2 py-1 border-dark rounded">删除订单</view>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	import useAuthStore from '../../stores/auth';
	import { onMounted, ref } from "vue";
	import seckillHttp from "../../apis/seckill/seckillHttp";
	
	const authStore = useAuthStore()
	let orders = ref([])
	
	onLoad(()=>{
		if(!authStore.is_logined){
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
	})
	
	onMounted(async () => {
		let result = await seckillHttp.getMyOrders()
		orders.value = result.orders	
	})
</script>

<style>
	       
</style>

<template>
	<view class="px-4 py-2 d-flex bg-white">
		<view class="
			flex-1 d-flex 
			j-center a-center tab border 
			seckilling border-theme broder-right-0"
			:class="selectedTab==TabEnum.SECKILLING?'text-white bg-theme':'font-theme-color bg-white'"
			@tap="onTabTap(TabEnum.SECKILLING)">秒杀中</view>
		<view class="
			flex-1 d-flex 
			j-center a-center tab border 
			seckillwill border-theme"
			:class="selectedTab==TabEnum.SECKILLWILL?'text-white bg-theme':'font-theme-color bg-white'"
			@tap="onTabTap(TabEnum.SECKILLWILL)">即将秒杀</view>
	</view>
	
	<view v-if="selectedTab==TabEnum.SECKILLING">
		<seckill-card @tap="onSeckillCardTap(index)" v-for="(goods,index) in goods_list" :goods='goods' :key="goods.title"></seckill-card>
	</view>	
	
	<view v-else>
		<seckill-card :type="TabEnum.SECKILLWILL" v-for="goods in goods_list" :goods='goods' :key="goods.title"></seckill-card>
	</view>
	
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		TabEnum
	} from "./types"
	import seckillCard from "./components/seckill-card.vue"

	let selectedTab = ref(TabEnum.SECKILLING)
	let goods_list = ref([{
			id: 1,
			photo: '/static/product/ae86.jpg',
			title: "sd第四季第七集温泉恩请问窃取欧文去我去饿我去看而且门前我n",
			tags: ['分期付款'],
			origin_price: 5999,
			seckill_price: 1999,
		},
		{
			id: 2,
			photo: '/static/product/ae86.jpg',
			title: "sdsad的撒地区青蛙大撒大撒n",
			tags: ['分期付款'],
			origin_price: 12312,
			seckill_price: 123,
		},
		{
			id: 3,
			title: "sd武清区恶气热望亲热亲热去的撒v问起我n",
			photo: '/static/product/ae86.jpg',
			tags: ['分期付款'],
			origin_price: 4124,
			seckill_price: 132,
		}
	])

	const onTabTap = (index) => {
		selectedTab.value = index;
	}
	
	const onSeckillCardTap = (index) => {
		console.log(index);
		uni.navigateTo({
			url: "/pages/goods/goods"
		})
	}
</script>

<style scoped lang="scss">
	.tab {
		height: 60rpx;
	}

	$borderRadius: 10rpx;

	.seckilling {
		border-start-start-radius: $borderRadius;
		border-end-start-radius: $borderRadius;
	}

	.seckillwill {
		border-start-end-radius: $borderRadius;
		border-end-end-radius: $borderRadius;
	}
</style>
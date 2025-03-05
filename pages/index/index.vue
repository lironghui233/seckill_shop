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
		<seckill-card @tap="onSeckillCardTap(index)" v-for="(goods,index) in ing_seckills" :goods='goods' :key="goods.title"></seckill-card>
	</view>	
	
	<view v-else>
		<seckill-card :type="TabEnum.SECKILLWILL" v-for="goods in will_seckills" :goods='goods' :key="goods.title"></seckill-card>
	</view>
	
</template>

<script setup>
	import {ref, onMounted} from "vue"
	import {TabEnum} from "./types"
	import seckillCard from "./components/seckill-card.vue"
	import seckillHttp from "../../apis/seckill/seckillHttp"

	let selectedTab = ref(TabEnum.SECKILLING)
	let ing_seckills = ref([])
	let will_seckills = ref([])
	
	onMounted(async ()=>{
		let result = await seckillHttp.getIngSeckillList()
		let seckills = result.seckills
		ing_seckills.value = seckills
		
		result = await seckillHttp.getWillSeckillList()
		will_seckills.value = result.seckills
		
		console.log(ing_seckills.value);
		console.log(will_seckills.value);
	})

	const onTabTap = (index) => {
		selectedTab.value = index;
	}
	
	const onSeckillCardTap = (index) => {
		console.log(index);
		let seckill = null
		if(selectedTab.value==TabEnum.SECKILLING){
			seckill = ing_seckills.value[index]
		}else{
			seckill = will_seckills.value[index]
		}
		uni.navigateTo({
			url: "/pages/goods/goods?id=" + seckill.id
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
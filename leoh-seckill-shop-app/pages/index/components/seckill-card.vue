<template>
	<view class="bg-white rounded-10 mt-2 mx-2 d-flex p-2">
		<view style="width: 226rpx; height: 226rpx;" class="rounded over-hidden">
			<image :src="props.goods.commodity.covers[0]" @load="onImageLoad" @error="onImageError" class="w-100 h-100">
			</image>
		</view>
		<view class="flex-1 ml-2">
			<view class="font-md text-black over-hidden" style="height:70rpx">
				{{ props.goods.commodity.title }}
			</view>
			<view class="mt-2">
				<view class="font-sm text-grey" v-for="tag in props.goods.tags" :key="tag">{{tag}}</view>
			</view>
			<view class="mt-1">
				<text class="font-theme-color font-md">秒杀价￥{{props.goods.sk_price}}</text>
				<text class="ml-2 text-gray font line-through">原价￥{{props.goods.commodity.price}}</text>
			</view>
			<view class="mt-1 d-flex j-sb a-center">
				<text class="text-grey font-sm">
					<template v-if="props.type==TabEnum.SECKILLING">
						剩余10分钟结束
					</template>
					<template v-else>
						15:00准时开始
					</template>
				</text>
				<view class="text-white px-2 py-1 font bg-theme rounded">
					<template v-if="props.type==TabEnum.SECKILLING">任性抢</template>
					<template v-else>预约</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		TabEnum
	} from "../types"

	/*
	goods = {
		photo: 'xxx',
		title: 'xxx',
		tags: ['xxx','yyy'],
		origin_price: 5999,
		seckill_price: 1999,
		start_time: xxx,
	}
	*/
	const props = defineProps({
		id: Number,
		goods: {
			type: Object,
			required: true
		},
		type: {
			type: Number,
			validator(value) {
				return [TabEnum.SECKILLING, TabEnum.SECKILLWILL].includes(value)
			},
			default: TabEnum.SECKILLING
		}
	})
</script>

<style scoped lang="scss">
	.seckill-card {
		border-radius: $uni-border-radius-lg;
	}
</style>
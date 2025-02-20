<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="true">
			<swiper-item v-for="(photo, index) in goods.photos" :key="photo" @tap="onSwiperItemTap(index)">
				<view class="h-100">
					<image :src="photo" class="h-100"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>

	<view class="p-2 border-bottom bg-white">
		<view class="d-flex a-center">
			<text class="font-theme-color font-md">秒杀价￥1399</text>
			<text class="ml-2 font-sm text-grey line-through">原价￥3999</text>
		</view>
		<view class="mt-2 font-md">
			飞天茅台收到机器就委屈呢你去
		</view>
		<view class="mt-2">
			<uni-tag class="mr-1" :inverted="true" text="原装正品" type="success" />
			<uni-tag :inverted="true" text="假一罚十" type="warning" />
		</view>
	</view>

	<view class="p-2 bg-white font-sm text-grey">全场包邮·七天无理由退货</view>

	<view class="mt-2 bg-white" style="padding-bottom: 100rpx;">
		<view class="font-md text-dark p-2 ">商品详情</view>
		<uv-parse :content="goods.detail" :selectable="true" :tagStyle="{img: 'display: block;'}"></uv-parse>
	</view>

	<view class="position-fixed left-0 right-0 bottom-0">
		<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onGoodsNavOptionsClick"
			@buttonClick="onGoodsNavButtonClick" style="margin-top: 20px;" />
	</view>

	<uni-popup type="bottom" ref="popup">
		<scroll-view scroll-y style="height: 700rpx;" class="bg-white">
			<view class="px-2 py-1 border-bottom text-right">
				<uni-icons type="closeempty" size="20" @tap="onClosePopup"></uni-icons>
			</view>

			<uni-list>
				<uni-list-item 
					link
					to="/pages/address/address?from=seckill"
					:show-extra-icon="true" 
					showArrow 
					:extra-icon="{size: '22',type: 'location'}" 
					:title="currentAddress" 
				/>
			</uni-list>
			
			<view class="d-flex p-2">
				<view style="width: 176rpx; height: 175rpx;" class="">
					<image :src="goods.photos[0]" class="w-100 h-100"></image>
				</view>
				<view class="flex-1 ml-2 d-flex flex-column j-sb">
					<view class="font-md text-dark">
						飞天茅台萨尔亲王和驱蚊器我尽可能可能去玩呢看
					</view>
					<uni-number-box :min="0" :max="9"></uni-number-box>
				</view>
			</view>
		</scroll-view>
		
		<view class="position-fixed left-0 right-0 bottom-0">
			<button type="warn" class="rounded-0 border-0">立即抢购￥1399</button>
		</view>
	</uni-popup>

</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue"
	import {onLoad} from "@dcloudio/uni-app"

	const popup = ref()
	
	let currentAddress = ref('aaa，19999999999999，北京市朝阳区xx')

	let goods = reactive({
		id: 1,
		title: "茅台酒",
		photos: [
			"/static/product/goods1.jpg",
			"/static/product/goods2.jpg",
			"/static/product/goods3.jpg"
		],
		detail: `
			123123123123
			123123132
		`
	})

	let options = [{
		icon: 'chat',
		text: '客服'
	}]

	let customButtonGroup = [{
		text: '立即抢购',
		backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
		color: '#fff'
	}]
	
	onLoad(() => {
		// 监听事件
		uni.$on('choose-address', (params) => {
			const address = params.address
			currentAddress.value = address.realname + "," + address.telephone + "," + address.region + address.detail
		})
	})

	const onSwiperItemTap = (index) => {
		console.log(index);
		uni.previewImage({
			urls: goods.photos,
			current: index
		})
	}

	const onGoodsNavOptionsClick = (e) => {
		console.log(e);
	}

	const onGoodsNavButtonClick = (e) => {
		console.log(e);
		popup.value.open()
	}

	const onClosePopup = () => {
		popup.value.close()
	}
</script>

<style scoped lang="scss">
	.swiper {
		height: 750rpx;
		width: 100%;
	}
</style>
<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="true">
			<swiper-item v-for="(photo, index) in goods.commodity.covers" :key="photo" @tap="onSwiperItemTap(index)">
				<view class="h-100">
					<image :src="photo" class="h-100"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>

	<view class="p-2 border-bottom bg-white">
		<view class="d-flex a-center">
			<text class="font-theme-color font-md">秒杀价￥{{goods.sk_price}}</text>
			<text class="ml-2 font-sm text-grey line-through">原价￥{{goods.commodity.price}}</text>
		</view>
		<view class="mt-2 font-md">
			{{goods.commodity.title}}
		</view>
		<view class="mt-2">
			<uni-tag class="mr-1" :inverted="true" text="原装正品" type="success" />
			<uni-tag :inverted="true" text="假一罚十" type="warning" />
		</view>
	</view>

	<view class="p-2 bg-white font-sm text-grey">全场包邮·七天无理由退货</view>

	<view class="mt-2 bg-white" style="padding-bottom: 100rpx;">
		<view class="font-md text-dark p-2 ">商品详情</view>
		<uv-parse :content="goods.commodity.detail" :selectable="true" :tagStyle="{img: 'display: block;'}"></uv-parse>
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
					<image :src="goods.commodity.covers[0]" class="w-100 h-100"></image>
				</view>
				<view class="flex-1 ml-2 d-flex flex-column j-sb">
					<view class="font-md text-dark">
						{{goods.commodity.title}}
					</view>
					<uni-number-box :min="1" :max="goods.sk_per_max_count"></uni-number-box>
				</view>
			</view>
		</scroll-view>
		
		<view class="position-fixed left-0 right-0 bottom-0">
			<button type="warn" class="rounded-0 border-0" :disabled="goods.stock<=0" @click="onBuy">
				<template v-if="goods.stock>0">立即抢购￥{{goods.sk_price}}</template>
				<template v-else>库存不足</template>
			</button>
		</view>
	</uni-popup>

</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from "vue"
	import {onLoad} from "@dcloudio/uni-app"
	import seckillHttp from "../../apis/seckill/seckillHttp"
	import userHttp from "../../apis/user/userHttp"

	const popup = ref()
	
	let address = reactive({
		realname:"",
		mobile:"",
		region:"",
		detail:""
	})
	let currentAddress = computed(()=>{
		return `${address.realname},${address.mobile},${address.region},${address.detail}`
	})

	let goods = reactive({
		"id": "",
		"sk_price": 0,
		"start_time": "",
		"end_time": "",
		"create_time": "",
		"max_sk_count": 0,
		"sk_per_max_count": 0,
		"commodity": {
		    "id": "",
		    "title": "",
		    "price": 0,
		    "covers": [],
		    "detail": "",
		    "create_time": ""
		}
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
	
	// 在onLoad生命周期函数中，可以接收到上个页面传来的参数
	onLoad(async (query) => {
		// 监听事件
		uni.$on('choose-address', (params) => {
			const choosed_address = params.address
			Object.assign(address, choosed_address)
		})
		
		const seckill_id = query.id
		let result = await seckillHttp.getSeckillDetail(seckill_id)
		// console.log(result);
		Object.assign(goods, result)
		
		result = await userHttp.getAddressList()
		Object.assign(address, result.addresses[0])
	})

	const onSwiperItemTap = (index) => {
		console.log(index);
		uni.previewImage({
			urls: goods.commodity.covers,
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
	
	const onBuy = async () => {
		// 限制的访问次数
		let visitCount = 0 
		try{
			// 显示loading
			uni.showLoading({
				title: '抢购中...'
			})
			// 1. 访问服务器，获取orderStr
			const result = await seckillHttp.buySeckill(goods.id, currentAddress.value, 1)
			// 如果result不为空，代表是抢购到了
			if (result){
				
				let timer = setInterval(async ()=>{
					// 限制询问服务器结果的次数
					if(visitCount>3){
						// 隐藏loading
						uni.hideLoading()
						// 清除定时器
						clearInterval(timer)
						return
					}
					visitCount+=1
					
					// 询问服务器结果
					let order_result = await seckillHttp.getSeckillOrder(goods.id)
					
					if (order_result && order_result['alipay_order'] != ''){
						
						// 如果得到后端的返回值，那么就清除定时器
						clearInterval(timer)
						
						let alipayOrder = order_result['alipay_order'] 
						console.log(alipayOrder);
						// 隐藏loading
						uni.hideLoading()
						
						// 切换alipay沙盒环境
						var EnvUtils = plus.android.importClass('com.alipay.sdk.app.EnvUtils');
						EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
						
						// 2. 请求支付宝支付
						uni.getProvider({
						    service: 'payment',
						    success: function (res) {
						        console.log(res.provider)
						        if (~res.provider.indexOf('alipay')) {
						            uni.requestPayment({
						                "provider": "alipay",   //固定值为"alipay"
						                "orderInfo": alipayOrder, //此处为服务器返回的订单信息字符串
						                success: function (res) {
						                    var rawdata = JSON.parse(res.rawdata);
						                    console.log("支付成功");
											// 跳转到订单的列表页
											uni.switchTab({
												url: '/pages/order/order'
											})
						                },
						                fail: function (err) {
						                    console.log('支付失败:' + JSON.stringify(err));
											uni.showToast({
												title: '支付失败！'
											})
						                }
						            });
						        }
						    }
						});
					}
					
				}, 1500)
				
				
			}			
		}catch(e){
			// 隐藏loading
			uni.hideLoading()
			console.log(e);
		}
	}
</script>

<style scoped lang="scss">
	.swiper {
		height: 750rpx;
		width: 100%;
	}
</style>
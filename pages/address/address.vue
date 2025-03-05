<template>
	<view>
		<uni-swipe-action ref="swipeAction">
			<uni-swipe-action-item v-for="(address, index) in addresses" :key="address.id" :right-options="options" @click="onOptionsClick($event, index)">
				<view class="bg-white px-2 py-2 border-bottom" @click="onAddressClick(index)">
					<view class="font text-dark">
						<text>{{address.realname}}</text>
						<text class="ml-2">{{address.mobile}}</text>
					</view>
					<view class="font-sm text-grey mt-2">
						{{address.region+address.detail}}
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		
		<view class="mt-2 text-center">
			<button @click="onAddAddressClick" type="warn" plain size="mini"><uni-icons type="plusempty" color="warn"></uni-icons>添加地址</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue"

	import {onLoad} from "@dcloudio/uni-app"
	import userAddressStore from "@/stores/address.js"
	import userHttp from "../../apis/user/userHttp"
	import { onMounted } from "vue"
	
	let swipeAction = ref()
	let addresses = ref([])
	
	const addressStore = userAddressStore()
	
	const FromEnum = {
		SECKILL: 1,
		MINE: 2
	} 
	let from = reactive(FromEnum.MINE)
	
	// 别的网页link to该网页的时候，后面参数 "/pages/address/address?from=" 把参数带过来
	onLoad((option) => {
		// uni-app 监听事件
		uni.$on("address-edit", (params)=>{
			console.log(params);
			let address = params.address
			for (let index = 0; index <addresses.value.length; index++){
				let item = addresses.value[index]
				if(item.id == address.id){
					addresses.value.splice(index, 1, address)
					break
				}
			}
		})
		
		// uni-app 监听事件
		uni.$on("address-add", (params)=>{
			console.log(params);
			let address = params.address
			addresses.value.unshift(address)
		})
		
		// from="seckill", from="mine"
		if(option.from=="seckill"){
			from = FromEnum.SECKILL
		}
	})
	
	onMounted(async () => {
		const result = await userHttp.getAddressList()
		// console.log(result);
		addresses.value = result.addresses
	})

	let options = ref([
		{
			text: '编辑',
			style: {
				backgroundColor: '#007aff'
			}
		},
		{
			text: '删除',
			style: {
				backgroundColor: '#F56C6C'
			}
		}
	])
	
	const onOptionsClick = (e, index) => {
		// console.log(e);
		// console.log(index);
		
		// 先关掉action-item的滑动
		swipeAction.value.closeAll()
		
		let address = addresses.value[index]
		// uni-swipe-action-item中 index == 0 是编辑
		if(e.index == 0){
			// 保存地址到全局上（全局状态管理）	
			addressStore.address = address
			uni.navigateTo({
				url: "/pages/address-edit/address-edit"
			})
		}
		//uni-swipe-action-item中 index == 1 是退出
		else{
			uni.showModal({
				title: '提示',
				content: '您确定要删除该地址吗?',
				success: async () => {
					await userHttp.deleteAddress(address.id)
					addresses.value.splice(index, 1)
				}
			})
		}
	}
	
	const onAddressClick = (index) => {
		console.log(index);
		if(from == FromEnum.SECKILL){
			// const address = {
			// 	realname: 'zhangsan',
			// 	telephone: '1999999999',
			// 	region: '北京市朝阳区',
			// 	detail: '白家庄'
			// }
			let address = addresses.value[index]
			// 发生事件
			uni.$emit('choose-address', {'address': address})
			// 返回上一个页面
			uni.navigateBack()
		}
	}
	
	const onAddAddressClick = () => {
		console.log('点击了添加地址');
		addressStore.clearAddress()
		uni.navigateTo({
			url: "/pages/address-edit/address-edit"
		})
	}
</script>

<style>

</style>
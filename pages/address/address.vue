<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="options" @click="onOptionsClick">
				<view class="bg-white px-2 py-2 border-bottom" @click="onAddressClick(1)">
					<view class="font text-dark">
						<text>张三</text>
						<text class="ml-2">1999999999</text>
					</view>
					<view class="font-sm text-grey mt-2">
						北京市朝阳区白家庄东里19栋
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
		})
		
		// from="seckill", from="mine"
		if(option.from=="seckill"){
			from = FromEnum.SECKILL
		}
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
	
	const onOptionsClick = (e) => {
		console.log(e);
		if(e.index == 0){
			// 保存地址到全局上（全局状态管理）
			addressStore.address = {
				id: "1",
				realname: "wangwu",
				telephone: "199999999",
				region: "广东省广州市番禺区",
				detail: "荣耀大厦"
			}
			uni.navigateTo({
				url: "/pages/address-edit/address-edit"
			})
		}else{
			
		}
	}
	
	const onAddressClick = (index) => {
		console.log(index);
		if(from == FromEnum.SECKILL){
			const address = {
				realname: 'zhangsan',
				telephone: '1999999999',
				region: '北京市朝阳区',
				detail: '白家庄'
			}
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
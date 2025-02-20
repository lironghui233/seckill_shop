<template>
	<view class="mt-2">
		<view class="d-flex a-center py-2 border-bottom bg-white">
			<text class="font-md text-dark px-2">姓名</text>
			<input v-model="formData.realname" type="text" placeholder="请输入姓名" placeholder-style="font-size: 30rpx"/>
		</view>
		<view class="d-flex a-center py-2 border-bottom bg-white">
			<text class="font-md text-dark px-2">电话</text>
			<input v-model="formData.telephone" type="text" placeholder="请输入电话" placeholder-style="font-size: 30rpx"/>
		</view>
		<view class="d-flex a-center py-2 border-bottom bg-white">
			<text class="font-md text-dark px-2">区域</text>
			<input v-model="formData.region" @click="onRegionInputClick" type="text" placeholder="请选择区域" placeholder-style="font-size: 30rpx" disabled/>
			<mpvue-city-picker ref="regionPicker" @onConfirm="onRegionConfirm"></mpvue-city-picker>
		</view>
		<view class="d-flex a-center py-2 border-bottom bg-white">
			<text class="font-md text-dark px-2">地址</text>
			<input v-model="formData.detail" type="text" placeholder="请输入详细地址" placeholder-style="font-size: 30rpx"/>
		</view>
		
		<view class="mt-3 px-2">
			<button type="warn" @click="onSubmit">提交</button>
		</view>
	</view>
</template>

<script setup>
	import mpvueCityPicker from "@/components/mpvue-citypicker/mpvueCityPicker.vue"
	import {ref, reactive, onMounted} from "vue"
	import useAddressStore from "@/stores/address.js"
	
	const addressStore = useAddressStore()
	
	let regionPicker = ref()
	let formData = reactive({
		id: "",
		realname: "",
		telephone: "",
		region: "",
		detail: ""
	})
	
	onMounted(() => {
		// pinia
		const address = addressStore.address
		if(address){
			uni.setNavigationBarTitle({
				title: "编辑地址"
			})
			
			formData.id = address.id
			formData.realname = address.realname
			formData.telephone = address.telephone
			formData.region = address.region
			formData.detail = address.detail
		}
		
	})
	
	const onRegionInputClick = () => {
		regionPicker.value.show()
	}	
	
	const onSubmit = () => {
		// uni-app 触发事件
		uni.$emit("address-edit", {"address": formData})
		// 返回上一页
		uni.navigateBack()
	}
	
	const onRegionConfirm = (e) => {
		console.log(e);
		let addresses =  e.label.split('-')
		let province = addresses[0]
		let city = addresses[1]=='市辖区'?'':addresses[1]
		let district = addresses[2]
		formData.region = province + city + district
	}
	
</script>

<style>
	       
</style>

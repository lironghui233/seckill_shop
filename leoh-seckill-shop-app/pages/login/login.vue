<template>
	<view class="mt-4 p-2">
		<view class="text-center">
			<image src="/static/logo.png" style="width: 140rpx; height: 140rpx;"></image>
		</view>
		
		<view class="mt-4">
			<view class="p-2 border-bottom">
				<input type="text" placeholder="请输入手机号码" v-model="mobile"/>
			</view>
			<view class="p-2 border-bottom d-flex">
				<input type="text" placeholder="请输入验证码" class="flex-1" v-model="code"/>
				<tll-countdown ref="countdown" :seconds="6" @timeup="onTimeup" @click="onCountDownClick"></tll-countdown>
			</view>
		</view>
		
		<view class="mt-4">
			<button type="warn" @click="onLoginClick">登录</button>
		</view>
	</view>
</template>

<script setup>
	import tllCountdown from '@/components/tll-countdown.vue';
	import {ref} from "vue";
	import userHttp from "@/apis/user/userHttp.js"
	import useAuthStore from '../../stores/auth';
	
	const authStore = useAuthStore()
	
	let countdown = ref()
	let mobile = ref('')
	let code = ref('')
	
	const onTimeup = () => {
		console.log('倒计时结束');
	}
	
	const onCountDownClick = async () => {
		// 校验手机号
		let mobileRegex = /^1[3,4,5,6,7,8,9][0-9]{9}$/
		if(!mobileRegex.test(mobile.value)){
			uni.showModal({
				title: '提示',
				content: '请输入正确格式的手机号！',
			});
			return
		}
		// 开始倒计时
		countdown.value.start()
		// 发送请求获取短信验证码
		let result = await userHttp.getSMSCode(mobile.value)
		if (result['result']==1){
			uni.showToast({
				title: '发送成功！',
				icon: 'success'
			})
		} else {
			uni.showToast({
				title: '发送失败！',
				icon: 'error'
			})
		}
	}
	
	const onLoginClick = async () => {
		// 1. 校验手机号和验证码
		let mobileRegex = /^1[3,4,5,6,7,8,9][0-9]{9}$/
		if(!mobileRegex.test(mobile.value)){
			uni.showModal({
				title: '提示',
				content: '请输入正确格式的手机号！',
			});
			return
		}
		
		let codeRegex = /[0-9]{4}/
		if(!codeRegex.test(code.value)){
			uni.showModal({
				title: '提示',
				content: '请输入正确格式的验证码！',
			});
			return
		}
		// 2. 发起登录的请求
		let result = await userHttp.login(mobile.value, code.value)
		// 3. 保存登录信息（用户、access_token、refresh_token）
		let user = result.user
		let access_token = result.access_token
		let refresh_token = result.refresh_token
		authStore.setUserToken(user, refresh_token, access_token)
		// 跳转首页（如果跳转的页面，已经在tabbar中，那么就必须使用switchTab来跳转）
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
</script>

<style>
	page{
		background-color: #FFF;
	}
</style>

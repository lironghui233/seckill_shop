<template>
	<view class="mt-4 p-2">
		<view class="text-center">
			<image src="/static/logo.png" style="width: 140rpx; height: 140rpx;"></image>
		</view>
		
		<view class="mt-4">
			<view class="p-2 border-bottom">
				<input type="text" placeholder="请输入手机号码"/>
			</view>
			<view class="p-2 border-bottom d-flex">
				<input type="text" placeholder="请输入验证码" class="flex-1"/>
				<tll-countdown ref="countdown" :seconds="6" @timeup="onTimeup" @click="onCountDownClick"></tll-countdown>
			</view>
		</view>
		
		<view class="mt-4">
			<button type="warn">登录</button>
		</view>
	</view>
</template>

<script setup>
	import tllCountdown from '@/components/tll-countdown.vue';
	import {ref} from "vue"
	
	let countdown = ref()
	
	const onTimeup = () => {
		console.log('倒计时结束');
	}
	
	const onCountDownClick = () => {
		countdown.value.start()
	}
</script>

<style>
	page{
		background-color: #FFF;
	}
</style>

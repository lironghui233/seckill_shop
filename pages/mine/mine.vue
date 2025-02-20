<template>
	<view style="height: 320rpx;" class="w-100 d-flex j-center a-center position-relative">
		<image src="/static/mine-bg.png" class="w-100 h-100 position-absolute left-0 top-0 right-0 bottom-0"></image>
		<view style="width: 300rpx; z-index: 100" class="d-flex flex-column a-center">
			<image src="/static/avatar.jpeg" style="width: 100rpx; height: 100rpx;" class="rounded-circle"></image>
			<view class="font text-white mt-2">钢铁侠</view>
		</view>
	</view>
	<uni-list>
		<uni-list-item showArrow title="修改信息" to="/pages/userinfo/userinfo" />
		<uni-list-item showArrow title="我的地址" to="/pages/address/address"/>
	</uni-list>
	<button type="warn" plain class="mt-3 mx-2" @click="onExit">退出登陆</button>
</template>

<script setup>
	const onExit = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
</script>

<style>

</style>
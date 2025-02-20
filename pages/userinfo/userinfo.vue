<template>
	<uni-list>
		<uni-list-item showArrow @tap="onAvatarTap" link>
			<template v-slot:header>
				<view class="d-flex a-center">头像</view>
			</template>
			<template v-slot:footer>
				<image class="rounded" style="height: 80rpx; width: 80rpx;" src="/static/avatar.jpeg" mode="widthFix">
				</image>
			</template>
		</uni-list-item>
		<uni-list-item @tap="onUsernameTap" showArrow title="用户名" right-text="蜘蛛侠" link></uni-list-item>
	</uni-list>

	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog mode="input" title="修改用户名" value="原来的用户名" placeholder="请输入用户名"
			@confirm="onUsernameConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {ref} from "vue"
	
	let inputDialog = ref()
	
	const onAvatarTap = () => {
		uni.chooseImage({
			count: 1,
			success(tempFilePaths) {
				console.log(tempFilePaths)
			}
		})
	}

	const onUsernameTap = () => {
		inputDialog.value.open()
	}
	
	const onUsernameConfirm = (value) => {
		console.log("用户输入: ", value);
	}
</script>

<style>

</style>
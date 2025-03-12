<template>
	<uni-list>
		<uni-list-item showArrow @tap="onAvatarTap" link>
			<template v-slot:header>
				<view class="d-flex a-center">头像</view>
			</template>
			<template v-slot:footer>
				<image class="rounded" style="height: 80rpx; width: 80rpx;" :src="authStore.user.avatar" mode="widthFix">
				</image>
			</template>
		</uni-list-item>
		<uni-list-item @tap="onUsernameTap" showArrow title="用户名" :right-text="authStore.user.username"
			link></uni-list-item>
	</uni-list>

	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog mode="input" title="修改用户名" value="原来的用户名" placeholder="请输入用户名"
			@confirm="onUsernameConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import userHttp from "../../apis/user/userHttp"
	import useAuthStore from "../../stores/auth"

	const authStore = useAuthStore()

	let base_user_url = import.meta.env.VITE_BASE_USER_URL
	console.log("base_user_url:", base_user_url);

	let inputDialog = ref()
	const onAvatarTap = () => {
		uni.chooseImage({
			count: 1,
			async success(chooseImageRes) {
				// console.log(chooseImageRes)
				const tempFilePaths = chooseImageRes.tempFilePaths;
				await userHttp.updateAccessToken()
				uni.showLoading({
					title: "上传中..."
				})
				uni.uploadFile({
					url: base_user_url + '/user/update/avatar', 
					filePath: tempFilePaths[0],
					header: {
						Authorization: "Bearer " + authStore.access_token,
					},
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						const data = JSON.parse(uploadFileRes.data)
						let user = authStore.user
						user.avatar = data.file_url
						authStore.setUser(user)
						uni.hideLoading()
					},
					fail: (error) => {
						uni.hideLoading()
					}
				});
			}
		})
	}

	const onUsernameTap = () => {
		inputDialog.value.open()
	}

	const onUsernameConfirm = async (value) => {
		console.log("用户输入: ", value);
		await userHttp.updateUsername(value)
		let user = authStore.user
		user.username = value
		authStore.setUser(user)
	}
</script>

<style>

</style>


import useAuthStore from "../../stores/auth"

class BaseUserHttp{
	constructor() {
		// this.base_url = "http://192.168.0.110:8000" // 访问本地
		this.base_url = "http://192.168.0.110:80/user_api" //访问 docker swarm nginx入口
	}
	
	_build_full_url(path){
		return this.base_url + path
	}
	
	_request_old(path, data, method){
		const url = this._build_full_url(path)
		const authStore = useAuthStore()
		// 返回一个 Promise 对象：Promise 是 JavaScript 中处理异步操作的一种方式，以便在异步操作中使用 Promise 的链式调用和 async/await 语法
		// Promise 构造函数接受一个执行器函数，该执行器函数有两个参数：resolve 和 reject，分别用于将 Promise 的状态从 pending 变为 fulfilled 和 rejected
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: method,
				data: data,
				header: {
					Authorization: "Bearer " + authStore.access_token
				},
				success: (response) => {
					// 后端返回的参数在 response.data 中。
					// 调用 resolve 函数，将 Promise 的状态变为 fulfilled，并传递后端返回的数据
					if (response.statusCode == 200){
						resolve(response.data)
					}else{
						uni.showToast({
							title: response.data.detail
						})
						reject(response)
					}
				},
				fail: (error) => {
					// 调用 reject 函数，将 Promise 的状态变为 rejected，并传递错误信息
					reject(error)
				}
			})
		})
	}
	
	async update_access_token(){
		const url = this._build_full_url('/user/refresh/token')
		const authStore = useAuthStore()
		if(!authStore.is_logined){
			uni.showToast({
				title: '请先登录！'
			})
			throw new Error('请先登录！')
		}
		const response = await uni.request({
			url: url,
			method: 'GET',
			header: {
				Authorization: "Bearer " + authStore.refresh_token
			},
		})
		if(response.statusCode == 200){
			let access_token = response.data.access_token
			authStore.setAccessToken(access_token)
		} 
		// refresh_token 过期
		else if (response.statusCode == 401) {
			uni.switchTab({
				url: '/pages/index/index'
			})
			throw new Error('登录过期，请重新登陆！')
		}
	}
	
	async _request(path, data, method){
		const url = this._build_full_url(path)
		const authStore = useAuthStore()
		const response = await uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				Authorization: "Bearer " + authStore.access_token
			},
		})
		if (response.statusCode == 200){
			return response.data
		}
		// access_token 过期
		else if (response.statusCode == 403) {
			console.log('access_token已过期，准备重新获取access_token');
			// 重新获取 access_token
			await this.update_access_token()
			console.log('重新获取access_token成功！');
			// 重新发起请求、
			return this._request(path, data, method)
		}
		else {
			uni.showToast({
				title: response.data.detail
			})
		}
	}
	
	get(path, params){
		return this._request(path, params, "GET")
	}
	
	post(path, data){
		return this._request(path, data, "POST")
	}
	
	put(path, data){
		return this._request(path, data, "PUT")
	}
	
	delete(path, data){
		return this._request(path, data, "DELETE")
	}
}


export default new BaseUserHttp();
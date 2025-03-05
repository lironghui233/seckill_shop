

import useAuthStore from "../../stores/auth"
import userHttp from "../user/userHttp"

class BaseSeckillHttp{
	constructor() {
	    this.base_url = "http://192.168.0.101:8100"
	}
	
	_build_full_url(path){
		return this.base_url + path
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
			// 重新获取 access_token
			await userHttp.updateAccessToken()
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


export default new BaseSeckillHttp();
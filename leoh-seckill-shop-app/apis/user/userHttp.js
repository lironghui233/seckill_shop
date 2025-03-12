import baseUserHttp from "./BaseUserHttp"

const getSMSCode = (mobile) => {
	if(!mobile){
		throw new Error('请传入手机号码！')
		return
	}
	const path = "/user/smscode/" + mobile
	return baseUserHttp.get(path)
}

const login = (mobile, code) => {
	const path = "/user/login"
	return baseUserHttp.post(path, {mobile, code})
}

const logout = () => {
	const path = "/user/logout"
	return baseUserHttp.post(path)
}

const updateUsername = (username) => {
	const path = "/user/update/username"
	return baseUserHttp.put(path, {username})
}

const createAddress = (data) =>{
	const path = "/address/add"
	return baseUserHttp.post(path, data)
}

const getAddressList = (page = 1, size = 10) => {
	const path = "/address/list?page=" + page + "&size" + size
	return baseUserHttp.get(path)
}

const updateAddress = (data) => {
	const path = "/address/update"
	return baseUserHttp.put(path, data)
}

const deleteAddress = (address_id) => {
	const path = "/address/delete"
	return baseUserHttp.delete(path, {id: address_id})
}

const updateAccessToken = async () => {
	await baseUserHttp.update_access_token()
}

export default {
	getSMSCode,
	login,
	logout,
	updateUsername,
	createAddress,
	getAddressList,
	updateAddress,
	deleteAddress,
	updateAccessToken,
}
import http from "./http"

const login = (mobile, password) => {
    const path = "/user/login/with/pwd"
    return http.auth_post(path, {mobile, password})
}


export default {
    login
}
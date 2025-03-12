import axios from "axios"
import useAuthStore from "@/stores/auth";
import { useRouter } from "vue-router";

const HttpServer = {
    AUTH: 'auth',
    SECKILL: 'seckill',
}

class Http{
    constructor(){
        this.seckill_instance = axios.create({
            baseURL: import.meta.env.VITE_SECKILL_BASE_URL,
            timeout: 6000
        });

        this.auth_instance = axios.create({
            baseURL: import.meta.env.VITE_AUTH_BASE_URL,
            timeout: 6000
        })
    }

    async refresh_token(){
        const authStore = useAuthStore()
        try{
            let result = await this.auth_instance.get(
                "/user/refresh/token",
                {
                    headers: {
                        Authorization: "Bearer " + authStore.refresh_token
                    }
                }
            )
            // 重新获取了token
            console.log('重新获取了token：', result.data.access_token)
            return result.data.access_token;
        }catch(error){
            const router = useRouter()
            // 如果状态码是401，说明refresh token过期了
            if(error.status == 401){
                // 跳转到登录页面
                router.push({"name": "login"})
            }
        }
    }

    request(http_server, method, path, data={}){
        const authStore = useAuthStore()
        let instance = null;
        if(http_server == HttpServer.AUTH){
            instance = this.auth_instance;
        }else{
            instance = this.seckill_instance;
        }
        return new Promise(async (resolve, reject) => {
            const config = {
                method: method.toLowerCase(),
                url: path,
                headers: {
                    Authorization: "Bearer " + authStore.access_token
                }
            }
            if(method.toLowerCase() == 'get'){
                config['params'] = data
            }else{
                config['data'] = data
            }

            try{
                let result = await instance.request(config)
                // 如果走到下面代码，说明上面await函数没有抛出异常，就肯定说明返回的状态码是200
                resolve(result.data);
            }catch(err){
                // 走到catch中，就说明状态码肯定不是200
                if(err.status == 403){
                    const authStore = useAuthStore()
                    let token = await this.refresh_token()
                    authStore.setAccessToken(token)
                    // 重新发起请求
                    let result = await instance.request(config)
                    resolve(result.data);
                }
                try{
                    let detail = err.response.data.detail;
                    reject(detail)
                }catch{
                    reject('服务器错误！')
                }
            }
        })
    }

    post(http_server, path, data){
        return this.request(http_server, 'POST', path, data)
    }

    get(http_server, path, params){
        return this.request(http_server, 'GET', path, params)
    }

    put(http_server, path, data){
        return this.request(http_server, 'PUT', path, data)
    }

    delete(http_server, path){
        return this.request(http_server, 'DELETE', path, data)
    }

    auth_get(path, params){
        return this.get(HttpServer.AUTH, path, params);
    }

    auth_post(path, data){
        return this.post(HttpServer.AUTH, path, data);
    }

    auth_put(path, data){
        return this.put(HttpServer.AUTH, path, data);
    }

    auth_delete(path, data){
        return this.delete(HttpServer.AUTH, path, data);
    }

    seckill_get(path, params){
        return this.get(HttpServer.SECKILL, path, params);
    }

    seckill_post(path, data){
        return this.post(HttpServer.SECKILL, path, data)
    }

    seckill_put(path, data){
        return this.put(HttpServer.SECKILL, path, data)
    }

    seckill_delete(path, data){
        return this.delete(HttpServer.SECKILL, path, data)
    }
}

export default new Http()
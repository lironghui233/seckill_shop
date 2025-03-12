import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const USER_KEY = "USER_KEY"
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_KEY"
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY"


const useAuthStore = defineStore('auth', () => {
  let _user = ref({})
  let _refresh_token = ref("")
  let _access_token = ref("")
  
  function setUser(user){
	  _user.value = user;
    localStorage.setItem(USER_KEY, user)
  }
  
  function setRefreshToken(refresh_token){
	  _refresh_token.value = refresh_token
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
  }
  
  function setAccessToken(access_token){
	  _access_token.value = access_token
	  localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  }
  
  function setUserToken(user, refresh_token, access_token){
	  setUser(user);
	  setRefreshToken(refresh_token);
	  setAccessToken(access_token);
  }

  function clearUserToken(){
    _user.value = {}
    _refresh_token.value = ""
	  _access_token.value = "";

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // 计算属性
  let user = computed(() => {
    // _user.value = {}
    // 在JS中
    // 1. 空对象{}：用if判断，会返回true，Object.keys(_user.value).length==0
    // 2. 空字符串""：用if判断，会返回false
    if(Object.keys(_user.value).length == 0){
      let user_obj = localStorage.getItem(USER_KEY)
      if(user_obj){
        _user.value = user_obj;
      }
    }
    return _user.value
  })

  let access_token = computed(() => {
    if(!_access_token.value){
      let token_str = localStorage.getItem(ACCESS_TOKEN_KEY)
      if(token_str){
        _access_token.value = token_str
      }
    }
    return _access_token.value;
  })
  
  let refresh_token = computed(() => {
    if(!_refresh_token.value){
      let token_str = localStorage.getItem(REFRESH_TOKEN_KEY)
      if(token_str){
        _refresh_token.value = token_str
      }
    }
    return _refresh_token.value;
  })

  let is_logined = computed(() => {
    if(Object.keys(user.value).length>0 && access_token.value && refresh_token.value){
      return true;
    }
    return false;
  })

  // 想要让外面访问到的，就必须要返回
  return { setUserToken, setUser, setRefreshToken, setAccessToken, user, access_token, refresh_token, is_logined, clearUserToken }
})


export default useAuthStore;
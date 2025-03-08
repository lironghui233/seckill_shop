<script setup>
import {ref, reactive} from "vue";
import authHttp from "@/api/authHttp";
import useAuthStore from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

let loginForm = reactive({
    mobile: "",
    password: ""
})

const onSubmit = async () => {
    try{
        let res = await authHttp.login(loginForm.mobile, loginForm.password)
        let refresh_token = res.refresh_token;
        let access_token = res.access_token;
        let user = res.user;
        authStore.setAccessToken(access_token)
        authStore.setRefreshToken(refresh_token)
        authStore.setUser(user);
        // 跳转到登录页面
        router.push({'name': "home"});
    }catch(err){
        console.log(err)
    }
}

</script>

<template>
<main class="main">
    <el-card class="login-card">
        <h1 style="text-align: center;">知了秒杀系统</h1>
        <el-form style="margin-top: 20px; width: 300px;" label-width="80px">
            <el-form-item label="手机">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginForm.password" placeholder='请输入密码' type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</main>
</template>

<style>
html, body, #app{
    height: 100%;
}
</style>

<style scoped>
.main{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-card{
    padding: 30px;
}
</style>
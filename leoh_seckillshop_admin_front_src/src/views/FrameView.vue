<script setup name="frame">
import { ref, computed, reactive, onMounted } from "vue"
import {
    Expand,
    Fold,
    HomeFilled
} from '@element-plus/icons-vue'
import useAuthStore from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore()
const router = useRouter()


let displayUser = reactive({
    department: {},
    realname: ""
})
let defaultActive = ref("home")
let isCollapse = ref(false);
let asideWidth = computed(() => {
    if (isCollapse.value) {
        return "64px"
    } else {
        return "250px"
    }
})

onMounted(() => {
    defaultActive.value = router.currentRoute.value.name
    displayUser.department = authStore.user.department
    displayUser.realname = authStore.user.realname
})

const onCollapseAside = () => {
    isCollapse.value = !isCollapse.value
}

const onExit = () => {
    authStore.clearUserToken();
    router.push({ name: 'login' })
}

</script>

<template>
    <el-container class="container">
        <el-aside class="aside" :width="asideWidth">
            <router-link to="/" class="brand"><strong>知了</strong><span v-show="!isCollapse">秒杀系统</span></router-link>
            <el-menu :router="true" active-text-color="#ffd04b" background-color="#343a40" class="el-menu-vertical-demo"
                :default-active="defaultActive" text-color="#fff" :collapse="isCollapse" :collapse-transition="false">
                <el-menu-item index="home">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="goods">
                    <template #title>
                        <el-icon><Shop /></el-icon>
                        <span>秒杀管理</span>
                    </template>
                    <el-menu-item index="goods">
                        <el-icon><Goods /></el-icon>
                        <span>商品</span>
                    </el-menu-item>
                    <el-menu-item index="seckill">
                        <el-icon><Sell /></el-icon>
                        <span>秒杀</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header">
                <div class="left-header">
                    <el-button v-show="isCollapse" :icon="Expand" @click="onCollapseAside" />
                    <el-button v-show="!isCollapse" :icon="Fold" @click="onCollapseAside" />
                </div>
                <div class="right-header">
                    <el-button type="default" text @click="onExit">退出登录</el-button>
                </div>
            </el-header>
            <el-main class="main">
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.container {
    height: 100vh;
    background-color: #f4f6f9;
}

.aside {
    background-color: #343a40;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22) !important;
}

.aside .brand {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid #434a50;
    background-color: #232631;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.header {
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
}

.el-menu {
    border-right: none;
}
</style>
import { createRouter, createWebHashHistory } from 'vue-router'
import FrameView from '../views/FrameView.vue'
import HomeView from '@/views/HomeView.vue'
import GoodsView from '@/views/seckill/GoodsView.vue'
import SeckillView from '@/views/seckill/SeckillView.vue'
import useAuthStore from '@/stores/auth'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frame',
      component: FrameView,
      redirect: "/home",
      children: [
        {path: '/home', name: 'home', component: HomeView},
        {path: "/goods", name: "goods", component: GoodsView},
        {path: "/seckill", name: "seckill", component: SeckillView}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  // 判断用户是否登录，如果没有登录
  // 并且访问的页面不是登录页面，那么就要跳转到登录页面
  const authStore = useAuthStore()
  if(!authStore.is_logined && to.name != 'login'){
    return {name: 'login'}
  }
})

export default router

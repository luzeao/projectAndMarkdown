
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import { routes } from './routes'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes as any
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  // console.log(userStore.token);
  // console.log('islogin', userStore.isLogin);
  // console.log('to', to);
  // 当前页面需要登录,但是没有登录
  if (to.meta.auth == true && userStore.isLogin == false) {
    // console.log('去登录');
    router.replace({ name: 'login', query: { ReturnUrl: to.fullPath } })  // currentRoute是一个ref对象
  }
  return true
})
// 储存来的地址和去的地址
router.beforeEach((to, from) => {
  // console.log('从哪里来', from);
  // console.log('到哪里去', to);
  localStorage.setItem('toPath',to.path)
  localStorage.setItem('fromPath',from.path)
  return true
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

import { Message } from 'element-ui'


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


/* 
  先登录,在进行路由切换 => role和checkedkeys 没问题 => 登陆的时候已经存储了
  刷新页面 => 要挂在页面才会获取信息 => 不会先挂载组件,先触发路由守卫,获取不到role和checkedkeys => 所以会直接跳404
*/

let whiteList = ['/login', '/404','/']  // 白名单
let count = 0

router.beforeEach((to, from, next) => {

  if (!whiteList.includes(to.path)) {
    if (count == 0) {
      store.dispatch('getAuthorityInfo');
      count++
    }
    next()
  } else {
    next()
  }

})

router.beforeEach((to, from, next) => {
  let { isLogin } = store.getters
  let { checkedkeys, role } = store.state
  // 判断白名单
  if (!whiteList.includes(to.path)) {  // 不是白名单页面 -> 刷新之后就去登录

    if (isLogin) {
      // 判断用户是否登录,如果登录,就判断是否可以访问
      if (role == 1) {
        next()
      } else {
        if (checkedkeys.includes(to.path)) {
          next()
        } else {
          next(false)
          Message({
            message: '你不配',
            type: 'warning'
          })
        }
      }

    } else {
      router.push({
        path: '/login',
        query: { ReturnUrl: router.currentRoute.fullPath }
      })
      Message({
        message: '请先登陆一下呗!',
        type: 'warning'
      })
    }
  } else {
    next()
  }
})


// // 路由守卫 -> 每次页面跳转 -> 判断是否是用户能访问的
// router.beforeEach((to, from, next) => {
//   // console.log('全局路由守卫2222222');
//   let { role, checkedkeys } = store.state
//   // console.log('role', role);
//   // console.log('checkedkeys', checkedkeys);


//   if (!whiteList.includes(to.path)) {  // 非白名单

//     // checkedkeys => 登录的时候有的 => 存储在vuex中
//     // role => 登录的时候有的 => 存储在vuex中
//     if (role == 1) {  // 超级管理员
//       next()
//     } else if (role == 2) {
//       if (checkedkeys.includes(to.path)) {
//         next()
//       } else {
//         next('/404')
//       }
//     } else if (role == 3) {
//       if (checkedkeys.includes(to.path)) {
//         next()
//       } else {
//         next('/404')
//       }
//     } else {
//       next('/404')
//     }

//   } else { // 白名单
//     next()
//   }

// })

export default router
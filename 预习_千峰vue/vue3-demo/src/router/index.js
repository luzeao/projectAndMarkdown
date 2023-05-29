import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 创建路由实例
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),  // history模式
  history: createWebHashHistory(import.meta.env.BASE_URL),  // hash模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pinia',
      name: 'pinia',
      component: () => import('../views/piniaView.vue')
    },
    {
      path: '/pinia/better',
      name: 'piniaBetter',
      component: () => import('../views/piniaBetterView.vue')
    },
    {
      path: '/vuerouter',
      name: 'vuerouter',
      component: () => import('../views/Vue-RouterView.vue')
    },
    {
      path: '/vmodel',
      name: 'vModel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/v-model.vue')
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      // vue2匹配所有路由
      // path: '*',

      // vue3中的匹配所有路由
      path: '/:pathMatch(.*)*',

      // 重定向
      redirect: (from) => {
        return { name: 'notFound', query: { wd: from.params.pathMatch } }
      }

    }

  ]
})

// vue-router @3 / 4
// router.beforeEach((to,from,next)=>{
//     console.log("from",from);
//     console.log("to",to);
//     next()
// })

router.beforeEach((to, from) => {
  console.log("from", from);
  console.log("to", to);
  // return true;  // next();

  // if (to.path == "/about") {
  //   return false;  //  next(false);
  // }
  // return true;

  if (to.path == "/about" ) {
      // return "/404";  // next("/404")
      return {path:"/404",query:{a:1,b:2}};  // next("/404")
  }

  return true; // next()

})


export default router

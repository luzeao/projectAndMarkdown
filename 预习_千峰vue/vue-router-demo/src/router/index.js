import Vue from 'vue'
import VueRouter from 'vue-router'


// 引入单文件组件
import HeaderBar from '@/layout/HeaderBar.vue'
import FooterBar from '@/layout/FooterBar.vue'

import HomeView from '../views/Home/index.vue'
import ListView from '../views/List/index.vue'
import CarView from '../views/Car/index.vue'
import MineView from '../views/Mine/index.vue'
import LoginView from '../views/Login/index.vue'
import DetailView from '../views/Detail/'
import DetaiCopylView from '../views/Detail/indexcopy.vue'



// Vue.use() 可以在vue中导入插件(vue-router官方定义的插件)
Vue.use(VueRouter)  // 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 路由配置
const routes = [

  // 别名: 访问根目录或者/home都渲染HomeView视图
  {
    path: '/home',
    alias: '/',    // 别名
    name: 'home',

    // 我们可以在每个路由配置中定义一个meta属性,属性值是一个对象 => 可以在该对象中存储一些用户自定义的数据
    meta: {
      tips: "首页",
    },
    // component: HomeView // 默认将HomeView视图渲染到name为default的router-view
    components: {
      header: HeaderBar,
      default: HomeView,
      footer: FooterBar
    }
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      tips: "列表",
      showBack: true
    },
    components: {
      header: HeaderBar,
      default: ListView,
    },

  },
  {
    /* 
      动态路径参数(params) => 以冒号开头
      path => /detail/:proid (此时proid不是作为路由 -> 而是路径参数 -> 对应路径接收数据)
      url  => /detail/100
        得到 => {proid:100}
      一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params
     */
    path: '/detail/:proid',
    name: 'detail',
    meta: {
      tips: "详情",
      showBack: true
    },
    // component: DetailView 
    components: {
      header: HeaderBar,
      default: DetailView,
    },
    /* 
      路由独享守卫 -> 只针对特定路由跳转生效(当从其他路由跳转至详情页时才会生效)
    */
    // beforeEnter: (to, from, next) => {
    //   // console.log(11111);
    //   console.log('准备跳转详情页');
    //   console.log('from', from);
    //   console.log('to', to);
    //   next()
    // }
  },
  {
    /* 
      动态路径参数(params) => 以冒号开头
      path => /detail/:proid (此时proid不是作为路由 -> 而是路径参数 -> 对应路径接收数据)
      url  => /detail/100
        得到 => {proid:100}
      一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params
     */
    path: '/detailcopy',
    name: 'detailcopy',
    component: DetaiCopylView
  },
  {
    path: '/car',
    name: 'car',
    meta: {
      tips: "购物车",
      showBack: true
    },
    // component: CarView 
    components: {
      header: HeaderBar,
      default: CarView,
      footer: FooterBar
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      tips: "登录",
      showBack: true
    },
    // component: LoginView 
    components: {
      header: HeaderBar,
      default: LoginView,
    },
    children: [{
      path: "",  // /login
      name: "login",
      redirect: "account",
      // component: () => import(/* webpackChunkName: "about" */ '../views/Login/Account'), //  当访问父级路由时=> 默认展示哪个视图
    }, {
      path: "account",  // /login/account
      name: "accountLogin",
      component: () => import(/* webpackChunkName: "about" */ '../views/Login/Account'),
      meta: {
        tips: "登录页",
        showBack: true
      },
    }, {
      path: "/login/phone",  // /login/phone
      name: "phoneLogin",
      component: () => import(/* webpackChunkName: "about" */ '../views/Login/Phone'),
      meta: {
        tips: "登录页",
        showBack: true
      },
    }]
  },
  {
    path: '/mine',
    // name: 'mine',
    // component: MineView 
    components: {
      header: HeaderBar,
      default: MineView,
    },
    // 配置当前路由的子路由 /mine/xxx
    children: [
      // 如果路径为空 => 等价于访问/mine => 默认展示order
      {
        path: '',
        name: 'mine',
        meta: {
          tips: "我的",
          showBack: true
        },
        component: () => import('@/views/Mine/Order/index.vue')
      },
      {
        path: '/mine/order',
        name: 'order',
        meta: {
          tips: "我的",
          showBack: true
        },
        component: () => import('@/views/Mine/Order/index.vue')
      },
      // 子路由如果以 / 开头,路径是从根路径开始写
      // 如果路由没有以 / 开头,默认就是当前路由下的子路由 => /mine/coll
      {
        path: 'coll',
        name: 'coll',
        meta: {
          tips: "我的",
          showBack: true
        },
        component: () => import('@/views/Mine/Collection/index.vue')
      },
    ],
  },
  {
    path: '/mine/test',
    name: 'order',
    component: () => import('@/views/Mine/Order/index.vue')
  },
  {
    path: '/404',
    name: 'notfound',
    // 懒加载,因为不是所有时候都会跳转这个页面
    component: () => import('@/views/NotFound/index.vue')
  },
  {
    // 如果是未配置的 => 统一跳转404
    path: '*',
    // 重定向
    // redirect:'/404', // 选项值是字符串,默认基于path路径跳转
    // redirect:{name:"notfound",query:{a:1,b:2}},  // 选项值是对象时,可以基于path路径或name跳转(可以带数据,但是只能是死数据)
    redirect: from => {
      // 当输入错误的路由路径地址时 -> 默认准备跳转错误地址 -> 没有匹配到 -> 跳转 /404
      // from可以理解为,是从哪个路由地址跳转/404
      console.log(from);
      return { name: 'notfound', query: { wd: from.params.pathMatch } }
    }
  },

]

// 根据路由配置生成 路由实例
const router = new VueRouter({
  mode: 'history',  // 路由模式 => hash/history
  base: process.env.BASE_URL,
  routes
})

/* 
  全局路由守卫 => 都依赖于路由实例router绑定
  全局前置守卫 => 每次导航切换都会执行(路由跳转之前执行)
    router.beforeEach(function(to, from, next){})
    to: 即将要进入的目标 路由对象(要跳转的页面路由信息)
    from: 当前导航正要离开的路由(跳转钱的路由信息)
    next() 函数 用法:
      1. 直接使用next() 进入管道中的下一个钩子(回调函数) -> 如果配置了多个全局前置守卫 -> 如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
      2. next(false) 中断当前的导航,如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
      3. next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
      4. next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
      确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错
  
  全局解析守卫 用法同router.beforeEach(只是触发顺序靠后)
    router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

  全局后置钩子 => router.afterEach((to, from) => {})
    你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
    可以理解为已经确定导航要跳转了 => 跳转后可以做一些 前端埋点(统计用户  访问次数  页面访问次数  驻留时间)
 */

// router.beforeEach(function (to, from, next) {
//   console.log('from', from);
//   console.log('to', to);
//   console.log(11111);
//   next()
// })

// // 模拟登陆验证
// let isLogin = function () {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true)
//     }, 2000)
//   })
// }

// router.beforeEach(async function (to, from, next) {
//   console.log(22222);
//   from
//   // console.log(from)
//   if (to.path == '/home' || to.path == '/' || to.path == '/list' || to.path == '/404' || to.path == '/login') {
//     next()
//   } else {
//     var flag = await isLogin()
//     if (flag) {
//       next()
//     } else {
//       next({ name: 'login', query: { ReturnUrl: to.fullPath } })
//     }
//   }
// })


// var whiteList = ['/home', '/', '/list', '/404', '/login']
// router.beforeResolve(async function (to, from, next) {
//   console.log('from', from);
//   console.log('to', to);
//   console.log(22222);
//   from
//   // console.log(from)
//   if (whiteList.includes(to.path)) {
//     next()
//   } else {
//     var flag = await isLogin()
//     if (flag) {
//       next()
//     } else {
//       next({ name: 'login', query: { ReturnUrl: to.fullPath } })
//     }
//   }
// })

// 数据库 => 访客数
// router.afterEach(function (to, from) {
//   console.log('from', from);
//   console.log('to', to);
//   console.log(333, '进行埋点操作:访客数量++');
// })

// 导出路由实例
export default router
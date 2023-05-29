import Vue from 'vue'
import VueRouter from 'vue-router'


// 引入单文件组件
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

// Vue.use() 可以在vue中导入插件(vue-router官方定义的插件)
Vue.use(VueRouter)  // 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // 普通引入 => 根组件挂载时直接引入
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 路由懒加载 => 选项配置是一个函数 => 调用时才执行(当这个路由被访问时才会引入组件)
    component: () => AboutView
  }
]

// 根据路由配置生成路由实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导出路由实例
export default router

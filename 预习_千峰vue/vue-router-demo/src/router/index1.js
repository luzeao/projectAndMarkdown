import Vue from 'vue'
import VueRouter from 'vue-router'


// 引入单文件组件
import HomeView from '../views/Home/index.vue'
import ListView from '../views/List/index.vue'
import CarView from '../views/Car/index.vue'
import MineView from '../views/Mine/index.vue'
import LoginView from '../views/Login/index.vue'
import DetailView from '../views/Detail/'
import DetaiCopylView from '../views/Detail/indexcopy.vue'


// Vue.use() 可以在vue中导入插件(vue-router官方定义的插件)
Vue.use(VueRouter)  // 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

/* 
  以前项目主页: http://localhost:8080/#/ -> 推广出去
  项目维护后: http://localhost:8080/#/home 

  以前的地址可能已经推广出去了,客户可能已经保存
  1. 让访问以前的地址的人统一跳转为新的地址
  2. 给地址起一个别名
*/

// 路由配置
const routes = [
  // 重定向 => 在路由配置中的跳转操作
  // 重定向 => 访问根,会自动跳转/home
  // {
  //   path:'/',
  //   redirect:'/home'
  // },

  // 别名: 访问根目录或者/home都渲染HomeView视图
  {
    path: '/home',
    // 别名
    alias:'/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
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
    component: DetailView // 普通引入 => 根组件挂载时直接引入
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
    component: DetaiCopylView // 普通引入 => 根组件挂载时直接引入
  },
  {
    path: '/car',
    name: 'car',
    component: CarView // 普通引入 => 根组件挂载时直接引入
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView // 普通引入 => 根组件挂载时直接引入
  },
  {
    path: '/mine',
    name: 'mine',
    component: MineView // 普通引入 => 根组件挂载时直接引入
  },
  // {
  //   // 如果是配置路由以外的其他路由 => 统一跳转notfound视图
  //   // * 作用匹配所有路由,前面没有的才会匹配到这里
  //   // 当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分
  //   path: '*',
  //   name: 'notfound',
  //   // 懒加载,因为不是所有时候都会跳转这个页面
  //   component: () => import('@/views/NotFound/index.vue')
  // },
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
  mode: 'hash',  // 路由模式 => hash/history
  base: process.env.BASE_URL,
  routes
})

// 导出路由实例
export default router

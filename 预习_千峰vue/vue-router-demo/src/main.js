import Vue from 'vue'

// 以模块化方式引入vue文件,内部会帮我们处理为组件
import App from './App.vue'

// 以模块化的方式引入./router 下面的 index.js文件
import router from './router'

// 以模块化方式引入css文件,内部会帮我们处理为组件,解析为css放到header中
import './styles/reset.css'  // 全局载入css

import './utils/flexible.js'

import axios from 'axios'
// 给所有的vue实例定义全局方法 => 所有的vue实例都可以访问
Vue.prototype.$axios = axios
Vue.prototype.$get = axios.get
Vue.prototype.$post = axios.post

Vue.config.productionTip = false

new Vue({
  router, // 将路由注入到根实例 => 其下的所有组件均可以访问
  render: h => h(App) // 将app这个组件作为根组件渲染 => 挂载到#app
}).$mount('#app')

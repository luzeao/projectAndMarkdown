import Vue from 'vue'

// 以模块化方式引入vue文件,内部会帮我们处理为组件
import App from './App.vue'

// 以模块化的方式引入./router 下面的 index.js文件
import router from './router'

Vue.config.productionTip = false

new Vue({
  router, // 将路由注入到根实例 => 其下的所有组件均可以访问
  render: h => h(App) // 将app这个组件作为根组件渲染 => 挂载到#app
}).$mount('#app')

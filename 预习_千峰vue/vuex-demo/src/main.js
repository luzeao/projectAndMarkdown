import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,  // $router
  store,   // 把Store实例注入到vue根实例中 -> vue下的所有应用都可以通过$store访问
  render: h => h(App)
}).$mount('#app')

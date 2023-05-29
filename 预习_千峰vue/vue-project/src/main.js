import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/directive'

// 引入插件
import MyPlugins from './plugins/MyPlugins';

// 全局引入element-ul(整个项目都可以使用)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 使用插件
Vue.use(MyPlugins, { a: 1, b: 2 })




import '@/styles/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

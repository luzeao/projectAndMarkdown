
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 全局引入vant
// import vant from 'vant'
// import 'vant/lib/index.css'

import 'vant/lib/index.css'
import '@/styles/reset.scss'
import '@/styles/main.scss'

const app = createApp(App)
const pinia = createPinia() // 创建pinia实例
// 每次刷新页面都会执行一次main.ts => 就是在使用的时候获取了持久化储存的数据
pinia.use(piniaPluginPersistedstate)  // 使用数据持久化储存

app.use(pinia)  // 向根实例注入pinia数据
app.use(router)
// app.use() => vue3在根实例中引入插件的方法 => vue2 => Vue.use()
app.mount('#app')

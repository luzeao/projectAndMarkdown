

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全局引入vant样式
import 'vant/lib/index.css';
const app = createApp(App)

// 全局注册组件
import MyHead from '@/components/MyHead.vue'
import MyBack from '@/components/MyBack.vue'
app.component('MyHead',MyHead)
app.component('MyBack',MyBack)




// 挂载pinia
app.use(createPinia())
// 挂载路由
app.use(router)

app.mount('#app')

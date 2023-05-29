import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App) //

// 1. 路由
import router from './router/router'


// 2. UI库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus) 


app.use(router)

app.mount('#app')
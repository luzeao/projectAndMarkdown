
import { createRouter , createWebHashHistory  } from 'vue-router'


const routes = [
    {
        path:'/',
        redirect:'/grade'
    },
    {
        path:'/grade',
        name:'grade',
        component:()=>import('../views/Gread/Gread.vue')
    },
    {
        path:'/data',
        name:'data',
        component:()=>import('../views/Gread/Data.vue')
    },
    {
        path:'/:pathMatch(.*)',
        redirect:"/grade"
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes, 
})


export default router 
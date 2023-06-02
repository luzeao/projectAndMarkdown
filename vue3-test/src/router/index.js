import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { AppRoutes } from '../views/App/routes'
import { LoginRoutes } from '../views/Login/route'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    ...AppRoutes,
    ...LoginRoutes,
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404/NotFound.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: "/404"
    }
  ]
})

export default router

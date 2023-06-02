
export const LoginRoutes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('./Login.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('./Reg.vue')
  },

]

export const AppRoutes = [
  {
    path: '/',
    component: () => import('./Layout.vue'),
    redirect: '/home',
    children: [
      {
        path:'/home',
        name:'home',
        component:()=>import('./Home.vue')
      },
      {
        path:'/classify',
        name:'classify',
        component:()=>import('./Classify.vue')
      },
      {
        path:'/cart',
        name:'cart',
        component:()=>import('./Cart.vue')
      },
      {
        path:'/mine',
        name:'mine',
        component:()=>import('./Mine.vue')
      },
    ]
  }
]
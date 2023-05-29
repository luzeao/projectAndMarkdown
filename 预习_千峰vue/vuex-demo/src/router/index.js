import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BetterView from '../views/BetterView.vue'
import HelperView from '../views/HelperView.vue'
import MdaView from '../views/MdaView.vue'
import MdbView from '../views/MdbView.vue'
import CommView from '../views/CommView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/better',
    name: 'better',
    component: BetterView
  },
  {
    path: '/comm',
    name: 'comm',
    component: CommView
  },
  {
    path: '/mda',
    name: 'mda',
    component: MdaView
  },
  {
    path: '/mdb',
    name: 'mdb',
    component: MdbView
  },
  {
    path: '/helper',
    name: 'helper',
    component: HelperView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

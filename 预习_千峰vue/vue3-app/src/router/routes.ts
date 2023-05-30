

// 中间区域
import HomeView from '@/views/Home/index.vue'
import ListView from '@/views/List/index.vue'
import CategoryView from '@/views/Category/index.vue'
import MineView from '@/views/Mine/index.vue'
import LoginView from '@/views/Login/index.vue'
import CarView from '@/views/Car/index.vue'
import RegisterView from '@/views/Register/index.vue'
import NotFoundView from '../views/NotFound/index.vue'
import SearchView from "../views/Search/index.vue"
import DetailView from '@/views/Detail/index.vue'
import OrderView from "@/views/Order/Order.vue"
import AddressView from '@/views/Address/index.vue'
import AddressAddView from '@/views/Address/AddAddress/index.vue'

// footer区域
import CommonFooterView from '../layout/CommonFooter.vue'

// router的数据类型
import type { RouteLocationNormalizedLoaded } from 'vue-router'
// import { useRoute } from 'vue-router'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: HomeView,
      footer: CommonFooterView
    }
  },
  {
    path: '/category',
    name: 'category',
    components: {
      default: CategoryView,
      footer: CommonFooterView
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailView
  },
  {
    path: '/mine',
    name: 'mine',
    components: {
      default: MineView,
      footer: CommonFooterView
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/car',
    name: 'car',
    components: {
      default: CarView,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/order/detail',
    name: 'detailorder',
    component: ()=>import('../views/Order/DetailOrder.vue')
  },
  {
    path: '/myorder',
    name: 'myorder',
    meta: {
      auth: true  // 是否需要登录
    },
    component: () => import('@/views/Order/MyOrder.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: AddressView
  },
  {
    path: '/address/add',
    name: 'addressAdd',
    meta: {
      auth: true  // 是否需要登录
    },
    component: AddressAddView
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFoundView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: (from: RouteLocationNormalizedLoaded) => {
      // console.log(from);
      // 使用from.params.pathMatch只会获取到/后面的内容
      // return { name: 'notfound', query: { wd: from.params.pathMatch } }
      return { name: 'notfound', query: { wd: from.fullPath } }
    }
  }
]
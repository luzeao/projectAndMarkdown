import HomeView from '@/views/Home'
import LoginView from '@/views/Login'
import NotFoundView from '@/views/Notfound'

import HomeDefaultView from '@/views/Home/Content'
import BannerListView from '@/views/Banner/BannerList'
import BannerAddView from '@/views/Banner/BannerAdd'
import BannerShowView from '@/views/Banner/BannerShow'
import GoodsListView from '@/views/Goods/List'
import GoodsSearchView from '@/views/Goods/Search'

import AdminListView from '@/views/Admin/AdminList'
import AdminAddView from '@/views/Admin/AdminAdd'

import EChartsView from '@/views/Study/ECharts'
import EditorView from '@/views/Study/Editor'


const routes = [
  {
    path: '/',
    name: 'root',
    component: HomeView,
    children: [
      {
        path: '',
        redirect: '/home'
        // name: "home",
        // component: HomeDefaultView  // 默认展示主页
      }, {
        path: '/home',
        name: "home",
        label: '首页',
        icon: '',
        component: HomeDefaultView
      }, {
        path: '/admin/list',
        name: "adminList",
        label: '管理员列表',
        icon: '',
        parent: {
          path: '/admin',
          name: 'admin',
          label: '人员管理',
          icon: ''
        },
        component: AdminListView
      }, {
        path: '/admin/add',
        name: "adminAdd",
        label: '管理员新增',
        icon: '',
        parent: {
          path: '/admin',
          name: 'admin',
          label: '人员管理',
          icon: ''
        },
        component: AdminAddView
      }, {
        path: '/banner/list',
        name: "bannerList",
        label: '轮播列表',
        icon: '',
        parent: {
          path: '/banner',
          name: 'banner',
          label: '轮播管理',
          icon: ''
        },
        component: BannerListView
      }, {
        path: '/banner/add',
        name: "bannerAdd",
        label: '轮播新增',
        icon: '',
        parent: {
          path: '/banner',
          name: 'banner',
          label: '轮播管理',
          icon: ''
        },
        component: BannerAddView
      }, {
        path: '/banner/show',
        name: "bannerShow",
        label: '轮播展示',
        icon: '',
        parent: {
          path: '/banner',
          name: 'banner',
          label: '轮播管理',
          icon: ''
        },
        component: BannerShowView
      }, {
        path: '/goods/list',
        name: "goodsList",
        label: '商品列表',
        icon: '',
        parent: {
          path: '/goods',
          name: 'goods',
          label: '商品管理',
          icon: ''
        },
        component: GoodsListView
      }, {
        path: '/goods/search',
        name: "goodsSeacrch",
        label: '商品搜索',
        icon: '',
        parent: {
          path: '/goods',
          name: 'goods',
          label: '商品管理',
          icon: ''
        },
        component: GoodsSearchView
      }, {
        path: '/study/echarts',
        name: 'studyEcharts',
        component: EChartsView,
        label: 'echarts学习',
        icon: '',
        parent: {
          path: '/study',
          name: 'study',
          label: '学习',
          icon: ''
        },
      }, {
        path: '/study/editor',
        name: 'editorEditor',
        component: EditorView,
        label: 'editor学习',
        icon: '',
        parent: {
          path: '/study',
          name: 'study',
          label: '学习',
          icon: ''
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFoundView
  },
  {
    path: '*',
    redirect: (from) => {
      return { name: 'notfound', query: { wd: from.params.pathMatch } }
    },
    component: NotFoundView
  },
  // 懒加载
  // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
]

const transformRouterToMenus = (routes) => {
  let items = routes[0].children
  let mapManues = {}  // 储存菜单信息

  // 遍历 / 路由下的子路由 -> 主页相关的配置(菜单,所有人都可以访问)
  items.forEach(item => {
    // 如果path为空字符串
    if (item.path == '') return false
    // 如果没有parent属性,就是一级菜单
    if (!item.parent) {
      // 用对应的一级菜单名称,作为对象的属性,可以判断该菜单有没有被创建
      mapManues[item.name] = {
        path: item.path,
        name: item.name,
        label: item.label,
        icon: item.icon
      }

    } else { // 存在parent属性,说明是二级菜单(有公共的一级 item.parent.name)
      // 通过二级菜单找到对应的一级菜单的name => 判断是否在mapMenus中
      // 不存在 => 该菜单未配置对应的一级菜单 => 自己配置
      // 存在 => 该对象对应的一级菜单已经配置了 => 在children中新增二级菜单的配置
      if (!mapManues[item.parent.name]) { // 二级菜单对应的一级菜单还未配置
        mapManues[item.parent.name] = {
          // 配置一级菜单
          path: item.parent.path,
          name: item.parent.name,
          label: item.parent.label,
          icon: item.parent.icon,
          // 放置当前的二级菜单
          children: [{
            path: item.path,
            name: item.name,
            label: item.label,
            icon: item.icon,
          }]
        }
      } else { // 二级菜单对应的一级菜单已经配置了
        mapManues[item.parent.name].children.push({
          path: item.path,
          name: item.name,
          label: item.label,
          icon: item.icon,
        })
      }
    }
  })
  // console.log(mapManues)
  // 获取所有对象的键值集合
  return Object.values(mapManues)
}


export const menus = transformRouterToMenus(routes)

// meuns => 所有菜单
// roleInfo接受两个参数 => role:0,1,2,3? => checkedkeys(权限列表)
// roleInfo => 角色信息,允许访问的菜单项
// 根据menus -> 将允许展示的菜单项选择出来,把不允许展示的删除(可能会影响原菜单,先深拷贝)
export const generateMenuByRole = (menus, roleInfo) => {

  let _menus = JSON.parse(JSON.stringify(menus))
  // console.log('深复制的menus',_menus);

  let { role, checkedkeys } = roleInfo

  if (role == 1) {  // 超级管理员 => 可以访问所有菜单
    return _menus
  } else if (role == 2 || role == 3) {  // 普通管理员/或者普通用户

    let list = []  // 有允许访问的

    _menus.forEach(v => {  // 遍历一级菜单
      if (checkedkeys.includes(v.path)) {  // 一级存在说明该菜单及其子菜单肯定是可以被访问的
        list.push(v)
      } else {  // 一级菜单不存在,可能子菜单会存在
        var subMenu = v.children
        var subList = []
        subMenu.forEach(item => { // 遍历二级菜单
          if (checkedkeys.includes(item.path)) {  // 是菜单中允许访问的
            subList.push(item)
          }
        })
        if (subList.length > 0) {  // 存在可以访问的子菜单
          v.children = subList  // 将菜单中的children覆盖为能被访问的
          list.push(v)
        }
      }
    })
    return list
  }
}

export default routes
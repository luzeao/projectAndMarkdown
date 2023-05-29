# vue-cli-router笔记

## 1. 项目中的.vue文件介绍
- 项目中的.vue是项目中的单文件组件(html style script) => 每一个.vue文件都是一个组件(基于webpack前端工程化工具 -> 解析.vue文件 -> 分离成结构 样式 js)
  - webpack前端工程化工具
    - 项目开发过程中 => 对项目的文件做批量处理 => 自己处理太麻烦 => 借助工程化工具(官方会帮我们处理)
      + html css js 压缩
      + es6 转 es5
      + sass 转 css
      + 以模块化语法引入 css js .vue json => 官方会处理
  - 单页面应用: 只有一个根应用(所有的应用都在此根应用中显示)
  - 单文件组件: webpack会将文件解析为组件(视图相关组件 => 配合路由展示/页面布局  可复用的组件 => 存在component中,在其他view/component使用)


## 2. router-link 和 router-view
- VueRouter中定义的内置组件
  - router-link => 用于做导航跳转   to => 表示目标路由的链接 => 跳转的路由地址(不同的路由渲染不同的页面)
  - router-view => 基于component动态组件封装实现的 => 对应路由 地址/名称 将对应的组件渲染到 router-view中


### 2-1 router-link中的相关属性
- tag属性
  - tag:"a" 指定router-link组件解析后的标签,默认是a标签
- to属性
- to: 表示目标路由的链接(/xxx)
  - 参数的值可以是字符串也可以是对象(动态绑定)
  - 参数是字符串(只能传路由地址) => to="/home"
  - 参数是对象(可以传更多数据)
    - => :to="{path,name,params,query}"
      - path: 对应路径跳转
      - name: 对应路由命名跳转
      - params: 动态路径参数
      - query: query数据
    - => :to="{path:'/list'}"   // 对应路径跳转
    - => :to="{name:'list'}"    // 对应命名路由跳转
- active-class
  - 设置链接激活时使用的 CSS 类名 默认类名叫router-link-active
    + =>  / 根路由可以被所有的子路由激活 ( / /list /car /mine)
    + =>  /list 解析时可以匹配两个 => 根路由 => 根路由下的list路由
- exact
  - 精确匹配模式(只能匹配自己) => /list 只能匹配 /list 不会匹配根路由
  - exact-active-class => 配置当链接被精确匹配的时候应该激活的 class
- replace => 点击导航,新的路由跳转时,新的历史记录会替换之前的,本质上就是调用了router.replace()方法

## 3. style标签中中的两个属性
- lang="scss"
  - 当前style内的语法会用scss语法解析
- scoped
  - style中不添加scoped => 默认是全局样式,对所有的页面生效
  - style中添加scoped => 默认是局部样式,对当前页面生效
    + 1. 通过给当前template内的元素新增唯一的自定义属性,如果是组件,会透传到组件的根元素
    + 2. 每个css属性后都会添加唯一属性的做限制
## 4. 安装sass依赖
- 命令行输入 cnpm sass sass-loader -D => 开发环境

## 5. 设置每个文件夹中的组件的name
- 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名

## 6. 列表页跳转详情页
- 直接在router-link标签中设置to属性配置跳转地址
  - <router-link to="/detail"></router-link>

## 7. 路由传参 和 动态路径传参
- 如何在跳转的同时携带数据
  1. 动态路径参数
  2. query传参
### 7-1. 动态路径参数
  - 跳转到详情页时配置动态路径参数对应的数据 /detail/:proid
  - 需要在路由页配置
  ```js
  {
    path: '/detail/:proid',
    name: 'detail',
    component: DetailView
  }
  ```
  - 动态路径参数(params) => 以冒号开头
  - path => /detail/:proid (此时proid不是作为路由 -> 而是路径参数 -> 对应路径接收数据)
  - url  => /detail/100
    - 得到 => {proid:100}
  - 一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值 - 设置到 this.$route.params
- 动态路径传参如何获取
  - this.$route.params获取,是一个对象
```html
<div class="show-list" v-if="list.length">
  <ul>
    <!-- 跳转到详情页时配置动态路径参数对应的数据 /detail/商品id -->
    <router-link :to="'/detail/' + item.goodsId" tag="li" v-for="item in list" :key="item.goodsId">
      <img :src="item.goodsImg" alt="">
      <p class="name">{{ item.goodsName }}</p>
      <p class="price">¥{{ item.goodsPrice }}</p>
    </router-link>
  </ul>
</div>
```
### 7-1-1 动态路径参数 - 快捷传参
- 可以通过给to绑定动态属性
  - 传递动态路径参数
- 注意:
  - 1. 此时页面跳转必须通过name属性跳转 => path和params不能同时使用
  - 2. params传递数据时,属性名必须和动态路径的参数名保持一致
```html
<router-link :to="{ name: 'detail', params: { proid: item.goodsId } }" tag="li" v-for="item in list"
  :key="item.goodsId">
  <img :src="item.goodsImg" alt="">
  <p class="name">{{ item.goodsName }}</p>
  <p class="price">¥{{ item.goodsPrice }}</p>
</router-link>
```
### 7-2. query传参
- 在url的路由路径之后拼接数据,用 ? 分隔
  - 可以使用字符串或者是对象,需要用动态传参,因为需要使用组件上的数据
- query传参,使用 **this.$route.query** 接收
```html
<div class="show-list" v-if="list.length">
  <ul>
    <!-- 
      query传参
        在url的路由路径之后拼接数据,用 ? 分隔
      -->
      <!-- query传参: 字符串传参数 -->
    <router-link :to="'/detailcopy?proid=' + item.goodsId" tag="li" v-for="item in list" :key="item.goodsId">
      <img :src="item.goodsImg" alt="">
      <p class="name">{{ item.goodsName }}</p>
      <p class="price">¥{{ item.goodsPrice }}</p>
    </router-link>

    <!-- query传参: 对象传参 -->
    <router-link tag="li" :to="{ name: 'detailcopy', query: { proid: item.goodsId } }" v-for="item in list"
      :key="item.goodsId">
      <img :src="item.goodsImg" alt="">
      <p class="name">{{ item.goodsName }}</p>
      <p class="price">¥{{ item.goodsPrice }}</p>
    </router-link>
  </ul>
</div>
```
## 8. 编程式导航 -> 通过代码跳转
- 在登录页面或者其他页面需要点击跳转如何实现
- this.$route  => 当前路由信息
- this.$router  => 路由实例 => 存放所有路由配置(可以实现路由跳转替换 -> 前进或后退)
  - 页面跳转(路由跳转/导航跳转)
    + 声明式写法 router-link标签
    + 编程式写法 通过路由实例进行跳转 router.push() router.go() router.back() reuter.replace()
  - router.push() 跳转指定路由页面,会新增一条历史记录
  - router.replace() 跳转指定路由页面,不会新增历史记录(替换原本的历史记录)
  - router.back() 返回历史记录的前一条,后退一步
  - router.go(n) 前进或者后退 => 正值表示前进n步,负值表示后退n步
- 如何在登录页跳转到首页
  - 基于原生的location.href( 路由可能是hash路由/history路由 => 路径格式不一样容易出问题)
  - 使用官方提供的编程式导航
```js
// push会新增历史记录
this.$router.push('/')
this.$router.push({name:'home'})
// replace不会新增历史记录
this.$router.replace({name:'home'})
```
## 9. 登录完毕之后需要返回之前商品详情页面
- 点击加入购物车时判断是否已经登录,如果登录就直接加入,如果没有登陆,跳转到登录页面并且记录下跳转前的页面
- 使用 this.$route.fullPath 将前一个页面保存
- 在登录页判断是否有保存下来的数据
  - 如果存在则将路由替换为保存下来的路由
  - 否则跳转到首页
## 10. 捕获所有路由
- \* 作用匹配所有路由,前面没有的才会匹配到这里
- 当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分
```js
{
  // 如果是配置路由以外的其他路由 => 统一跳转404
  // * 作用匹配所有路由,前面没有的才会匹配到这里
  path: '*',
  name: 'notfound',
  // 懒加载,因为不是所有时候都会跳转这个页面
  component: () => import('@/views/NotFound/index.vue')
},
{
  // 匹配以user-开头的任意路由
  path:'/user-*'
}
```
### 10-1 重定向路由 404 用法
- redirect配置参数
```js
{
  // 如果是未配置的 => 统一跳转404
  path: '*',
  // 重定向
  redirect:'/404', // 选项值是字符串,默认基于path路径跳转
  redirect:{name:"notfound",query:{a:1,b:2}},  // 选项值是对象时,可以基于path路径或name跳转(可以带数据,但是只能是死数据)
  redirect: from => {
    // 当输入错误的路由路径地址时 -> 默认准备跳转错误地址 -> 没有匹配到 -> 跳转 /404
    // from可以理解为,是从哪个路由地址跳转/404
    console.log(from);
    return { name: 'notfound', query: { wd: from.params.pathMatch } }
  }
},
```
- 可以在对应的notfound页面展示错误路径提示
```html
<p>{{ $route.query.wd }}不存在</p>
```
### 10-2 别名
- alias选项配置
- 给地址起一个别名,也就是说当客户访问/和/home页面的时候,其实访问的都是/home页面
```js
{
  path: '/home',
  alias:'/',
  name: 'home',
  component: HomeView // 普通引入 => 根组件挂载时直接引入
},
```
## 11. 命名视图-同级
- 如果希望在同一个路由页面中展示多个同级router-view视图 也是可行的
  - 如何实现: 
    + 1. 给多个router-view设置不同的name属性,指定视图的名称,如果没有命名的,默认名字为default
    + 2. 在路由配置中,使用components传入一个对象参数,对应视图名称(name)展示对应的视图组件
```html
<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view class="app-main"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>
```
```js
{
  path: '/home',
  alias: '/',
  name: 'home',
  // component: HomeView // 默认将HomeView视图渲染到name为default的router-view
  components: {
    header: HeaderBar,
    default: HomeView,
    footer: FooterBar
  }
},
```
### 11-1 嵌套路由和嵌套视图展示
- 在需要展示子路由的路由信息内配置children属性
- 子路由如果以 / 开头,路径是从根路径开始写
- 如果路由没有以 / 开头,默认就是当前路由下的子路由
- 如果路径为空 => 等价于访问/mine => 默认展示order
```js
{
  path: '/mine',
  // name: 'mine',
  // component: MineView 
  components: {
    header: HeaderBar,
    default: MineView,
  },
  // 配置当前路由的子路由 /mine/xxx
  children: [
    // 如果路径为空 => 等价于访问/mine => 默认展示order
    {
      path: '',
      name: 'mine',
      component: () => import('@/views/Mine/Order/index.vue')
    },
    {
      path: '/mine/order',
      name: 'order',
      component: () => import('@/views/Mine/Order/index.vue')
    },
    // 子路由如果以 / 开头,路径是从根路径开始写
    // 如果路由没有以 / 开头,默认就是当前路由下的子路由 => /mine/coll
    {
      path: 'coll',
      name: 'coll',
      component: () => import('@/views/Mine/Collection/index.vue')
    },
  ],
},
```
- 只有写在一级路由下的children内的配置,才是二级路由
- 将路由配置写在一级路由下,不管是不是写的/mine/order都是根路由,都会在一个单独的视图中展示
```js
{
  path: '/mine/test',
  name: 'order',
  component: () => import('@/views/Mine/Order/index.vue')
},
```

## 12. 导航(路由)守卫
- 导航 => 路由正在发生改变(跳转)
- vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航

## 12-1 全局导航守卫 => 都依赖于路由实例router绑定
- 全局前置守卫 => 每次导航切换都会执行(路由跳转之前执行)
  - router.beforeEach() -> 该函数接收三个参数
    + to: 即将要进入的目标 路由对象(要跳转的页面路由信息)
    + from: 当前导航正要离开的路由(跳转前的路由信息)
    + next() 函数 用法:
      - 1. 直接使用next() 进入管道中的下一个钩子(回调函数) -> 如果配置了多个全局前置守卫 -> 如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
      - 2. next(false) 中断当前的导航,如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
      - 3. next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
      - 4. next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
      - 确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错
```js
router.beforeEach(function (to, from, next) {
  console.log('from', from);
  console.log('to', to);
  console.log(11111);
  next()  // 如果不调用next方法,当前页面也不会渲染,因为是跳转前,本页面跳本页面也算跳转
})
```
- 全局解析守卫 用法同router.beforeEach(只是触发顺序靠后)
  - router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
```js
router.beforeResolve(function (to, from, next) {
  console.log('from', from);
  console.log('to', to);
  console.log(11111);
  next()  // 如果不调用next方法,当前页面也不会渲染,因为是跳转前,本页面跳本页面也算跳转
})
```
- 全局后置钩子 => router.afterEach((to, from) => {})
  - 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
  - 可以理解为已经确定导航要跳转了 => 跳转后可以做一些 前端埋点(统计用户  访问次数  页面访问次数  驻留时间)
```js
router.afterEach(function (to, from) {
  console.log('from', from);
  console.log('to', to);
  console.log(333, '进行埋点操作:访客数量++');
})
```
### 12-2 路由独享守卫
- 路由独享守卫 -> beforeEnter -> 只针对特定路由跳转生效(当从其他路由跳转至详情页时才会生效)
```js
beforeEnter: (to, from, next) => {
  // console.log(11111);
  console.log('准备跳转详情页');
  console.log('from', from);
  console.log('to', to);
  next()
}
```
### 12-3 组件内的守卫
- beforeRouteEnter => 页面进入之前被调用
  - 在路由跳转之后,组件创建前被调用(组件还未被创建 -> 也就没有初始化)
  - 注意: 此时无法访问this(当前实例)
  - 如果想在此阶段访问this,next可以接受一个回调函数作为参数,此函数会在组件从虚拟DOM渲染到真实DOM之后执行(此时可以通过形参访问当前实例)
  - 常用于埋点操作(页面驻留时间)
```js
beforeRouteEnter(to, from, next) {  // 从其他页面跳到当前页
  console.log('beforeRouteEnter');
  console.log('from', from);
  console.log('to', to);
  console.log('this', this); // 此时无法访问this(当前实例)

  // next()
  // next可以接受一个回调函数作为参数,此函数会在组件从虚拟DOM渲染到真实DOM之后执行(此时可以通过形参访问当前实例)
  next((vm) => {
    console.log('回调执行了', vm);
    vm.enterTime = Date.now()
  })
},
```
- beforeRouteUpdate
  - 在当前路由改变，但是该组件被复用时调用
  - 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候
  - 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  - 可以访问组件实例 `this`
```js
async beforeRouteUpdate(to, from, next) {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  console.log('beforeRouteUpdate', '路由改变,但是组件被复用');
  console.log('from', from);
  console.log('to', to);
  if (to.params.proid != from.params.proid){ // proid发生改变
    this.proid = to.params.proid;
    await this.searchGoodsByGoodsId()
    next()
  }else{
    next()
  }
},
```
- beforeRouteLeave => 页面离开之前被调用
```js
beforeRouteLeave(to, from, next) {  // 从当前页跳到其他页面
  console.log('beforeRouteLeave');
  console.log('from', from);
  console.log('to', to);
  console.log('this', this);
  this.leaveTime = Date.now()
  if (this.leaveTime - this.enterTime >= 10000) {
    console.log('任务完成');
    next()
  } else {
    if (confirm('你的任务还没完成是否继续?')) {
      next(false)
    } else {
      next()
    }
  }
}
```

## 13. 完整的导航解析流程
![](./md-img/%E8%B7%AF%E7%94%B1%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B.png)
1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave(组件离开守卫) => 旧页面中不用的组件准备销毁
3. 调用全局的 beforeEach(全局前置守卫) => 对所有的路由跳转生效
4. 在复用的组件里调用 beforeRouteUpdate(组件更新守卫) => 新页面中可能存在复用的组件
5. 在路由配置里调用 beforeEnter(路由独享守卫) => 只针对跳转的路由生效
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeRouteEnter(组件内进入守卫) => 导航被激活,但是组件还未创建
8. 调用全局的 beforeResolve(全局解析守卫) => 此时导航已经激活 => 此守卫相当于跳转前的最后一道守卫
9. 导航被确认
10. 调用全局的 afterEach(全局后置守卫) => 导航已经确认跳转
11. 触发 DOM 更新
12. 调用 beforeRouteEnter(组件内进入守卫) 中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入 => next((vm)=>{xxxxx})

## 14. 路由元信息
- 我们可以在每个路由配置中定义一个meta属性,属性值是一个对象 => 可以在该对象中存储一些用户自定义的数据
- 可以在每一个vue实例中通过$route.meta访问
```html
<div class="app-header">
  <div class="left">
    <span @click="$router.back()" v-if="$route.meta.showBack">＜</span>
  </div>
  <div class="center">{{ $route.meta.tips }}</div>
  <div class="right"></div>
</div>
```
```js
{
  path: '/list',
  name: 'list',
  meta: {
    tips: "列表",
    showBack:true
  },
  components: {
    header: HeaderBar,
    default: ListView,
    footer: FooterBar
  },
},
```
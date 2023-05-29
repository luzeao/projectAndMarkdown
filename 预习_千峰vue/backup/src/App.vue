<template>
  <div id="app">
    <!-- 
      router-link 和 router-view => VueRouter中定义的内置组件 
        router-link => 用于做导航跳转   to => 跳转的路由地址(不同的路由渲染不同的页面)
        router-view => 基于component动态组件封装实现的 => 对应路由 地址/名称 将对应的组件渲染到 router-view中
    -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
/*
单页面应用: 只有一个根应用(所有的应用都在此根应用中显示)
单文件组件: => webpack会将文件解析为组件(视图相关组件 => 配合路由展示/页面布局  可复用的组件 => 存在component中,在其他view/component使用)

webpack前端工程化工具
  项目开发过程中 => 对项目的文件做批量处理 => 自己处理太麻烦 => 借助工程化工具(官方会帮我们处理)

  html css js 压缩
  es6 转 es5
  sass 转 css
  以模块化语法引入 css js .vue json => 官方会处理


  项目中的.vue是项目中的单文件组件(html style script) => 每一个.vue文件都是一个组件(基于webpack前端工程化工具 -> 解析.vue文件 -> 分离成结构 样式 js)
*/
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

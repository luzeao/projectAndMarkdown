<template>
  <div id="app">
    <div class="app-header">头部</div>
    <div class="app-main">
      <router-view></router-view>
    </div>
    <div class="app-footer">
      <!-- 
        tag:"a" 指定router-link组件解析后的标签,默认是a标签

        to: 表示目标路由的链接(/xxx)
          参数的值可以是字符串也可以是对象(动态绑定)
          参数是字符串(只能传路由地址) => to="/home"
          参数是对象(可以传更多数据) 
            => :to="{path,name,params,query}"
              path: 对应路径跳转
              name: 对应路由命名跳转
              params: 动态路径参数
              query: query数据
            => :to="{path:'/list'}"   // 对应路径跳转
            => :to="{name:'list'}"    // 对应命名路由跳转

          active-class => 设置链接激活时使用的 CSS 类名 默认类名叫router-link-active
            =>  / 根路由可以被所有的子路由激活 ( / /list /car /mine)
              => /list 解析时可以匹配两个 => 根路由 => 根路由下的list路由

          exact => 精确匹配模式(只能匹配自己) => /list 只能匹配 /list 不会匹配根路由

          exact-active-class => 配置当链接被精确匹配的时候应该激活的 class
       -->

      <ul class="nav">
        <router-link tag="li" :class="{ active: $route.path == '/' }" active-class="active" to="/home"
          exact>首页</router-link>
        <router-link tag="li" active-class="active" to="/list" exact>列表</router-link>
        <router-link tag="li" active-class="active" to="/car" exact>购物车</router-link>
        <router-link tag="li" active-class="active" to="/mine" exact>我的</router-link>
      </ul>
    </div>
  </div>
</template>


<style lang="scss">
/* 
  当前style内的语法会用scss语法解析
*/
/* 
  style中不添加scoped => 默认是全局样式,对所有的页面生效
  style中添加scoped => 默认是局部样式,对当前页面生效
    1. 通过给当前template内的元素新增唯一的自定义属性,如果是组件,会透传到组件的根元素
    2. 每个css属性后都会添加唯一属性的做限制
*/
html,
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  font-size: 0.24rem;
}

#app {
  display: flex;
  flex-direction: column;

  .app-header,
  .app-footer {
    height: 1rem;
    line-height: 1rem;
    background-color: grey;
    color: #fff;
  }

  .app-header {
    text-align: center;
  }

  .app-footer {
    .nav {
      text-align: center;
      display: flex;

      li {
        flex: 1;
      }
    }
  }

  .app-main {
    flex: 1;
    overflow-y: auto;
  }

  .active {
    background-color: orange;
    color: #fff;
  }
}
</style>


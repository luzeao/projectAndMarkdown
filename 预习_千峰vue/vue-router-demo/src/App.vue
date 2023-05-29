<template>
  <!-- 
    如果希望在同一个路由页面中展示多个同级router-view视图 也是可行的
      如何实现: 
        1. 给多个router-view设置不同的name属性,指定视图的名称,如果没有命名的,默认名字为default
        2. 在路由配置中,使用components传入一个对象参数,对应视图名称(name)展示对应的视图组件
   -->
  <!-- <div id="app">
    <router-view name="header"></router-view>
    <div class="app-main">
      <router-view></router-view>
    </div>
    <router-view name="footer"></router-view>
  </div> -->

  <!-- 更简单的写法,上面的中间的main会多嵌套一层div标签 -->
  <div id="app">
    <router-view name="header"></router-view>
    <router-view class="app-main"></router-view>
    <router-view name="footer"></router-view>
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


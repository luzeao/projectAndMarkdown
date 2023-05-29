<template>
  <div class="home">
    <h2>mine页面</h2>
    <br>
    <br>
    <br>
    <nav>
      <router-link to="/mine/order">订单页</router-link>
      &emsp;&emsp;&emsp;&emsp;
      <router-link to="/mine/coll">收藏页面</router-link>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名
  export default {
    name:'MineView',
  }
</script>

<style lang="scss" scoped>

</style>
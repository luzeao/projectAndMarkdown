<template>
  <div class="home">
    这是DetailCopy页
  </div>
</template>

<script>
// 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名
export default {
  name: 'DetailCopyView',
  data() {
    return {
      
    }
  },
  mounted() {
    // this.$route => 所有组件均可以访问 => 当前路由信息
    // this.$router => 所有组件均可以访问 => 所有路由组成的路由实例
    console.log('route',this.$route);
    // console.log('router',this.$router);

    // query传参 => 页面中对应this.$route.query接收
    console.log('query',this.$route.query);
    console.log('proid',this.$route.query.proid);

  },
}
</script>

<style lang="scss" scoped></style>
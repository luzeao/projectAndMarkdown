<template>
  <div class="notfound">
    <h1>Not&nbsp;Found</h1>
    <p>{{ $route.query.wd }}不存在</p>
  </div>
</template>

<script>
// 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名
  export default {
    name:'NotFoundView',
    mounted() {
      console.log(this.$route);
    },
  }
</script>

<style lang="scss" scoped>
.notfound{
  width: 100%;
  height: 100%;
  h1{
    font-size: 1rem;
    text-align: center;
    line-height: 100%;
  }
}
</style>
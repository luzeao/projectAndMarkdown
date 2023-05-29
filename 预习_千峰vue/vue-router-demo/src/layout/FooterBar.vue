<template>
  <div class="app-footer">
      <ul class="nav">
        <router-link tag="li" :class="{ active: $route.path == '/' }" active-class="active" to="/home"
          exact>首页</router-link>
        <router-link tag="li" active-class="active" to="/list" exact>列表</router-link>
        <router-link tag="li" active-class="active" to="/car" exact>购物车</router-link>
        <router-link tag="li" active-class="active" to="/mine" exact>我的</router-link>
      </ul>
    </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="app-footer">
    <van-tabbar route v-model="activeIndex" active-color="#1989fa" :border="false">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="search">分类</van-tabbar-item>
      <van-tabbar-item to="/car" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
let activeIndex = ref<number>(0)

</script>

<style lang="scss" scoped>

</style>
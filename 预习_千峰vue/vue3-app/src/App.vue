
<template>
  <div class="page">

    <div class="app-header">
      <!--  @click-left="onClickLeft"
        @click-right="onClickRight"  -->
      <!-- <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow></van-nav-bar> -->
    </div>

    <div class="app-main">
      <router-view></router-view>
    </div>

    <router-view name="footer"></router-view>

  </div>
</template>

<script setup lang="ts">

import { RouterView } from 'vue-router'

</script>

<style lang="scss">
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .app-main {
    flex: 1;
    padding-bottom: 1rem;
    overflow: scroll;
  }
}
</style>

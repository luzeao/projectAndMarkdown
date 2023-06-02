<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<template>
  <div class="back">
    <van-icon name="exchange" size="18" @click="router.go(-1)" />
    <span>返回</span>
  </div>
</template>

<style scoped>
.back {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--van-nav-bar-icon-color);
}
</style>
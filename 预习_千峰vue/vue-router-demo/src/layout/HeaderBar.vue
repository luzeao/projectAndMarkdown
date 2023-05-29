<template>
  <div class="app-header">
    <div class="left">
      <span @click="$router.back()" v-if="$route.meta.showBack">&lt;</span>
    </div>
    <div class="center">{{ $route.meta.tips }}</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('头部', this.$route);
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
}
</style>
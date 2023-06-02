
<template>
  <van-nav-bar :title="title">
    <template #left>

      <slot v-if="!noback">
        <div class="text" @click="router.go(-1)">
          <van-icon name="arrow-left" size="18" />
          <span>返回</span>
        </div>
      </slot>

    </template>
    <template #right>
      <van-popover v-model:show="showPopover" theme="dark" :actions="actions" placement="bottom-end" @select="selectone">
        <template #reference>
          <van-icon name="ellipsis" size="22" />
        </template>
      </van-popover>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const props = defineProps({
  title: String,
  noback: Boolean // 默认是 false
})

const actions = [
  { text: '首页', icon: 'home-o', path: '/home', disabled: route.path == '/home' },
  { text: '搜索', icon: 'search', path: '/search', disabled: route.path == '/search' },
  { text: '登录', icon: 'friends-o', path: '/login', disabled: route.path == '/login' },
  { text: '个人中心', icon: 'user-o', path: '/mine', disabled: route.path == '/mine' },
  { text: '订单', icon: 'orders-o', path: '/order', disabled: route.path == '/order' },
]

const selectone = (value) => {
  router.replace(value.path)
}

const showPopover = ref(false)
</script>

<style scoped>
.text {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--van-nav-bar-icon-color);
}
</style>
<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item
      v-for="item, index in footer" 
      :key="index"
      :name="item.name"
      :icon="item.icon"
      :to="item.path"
    >
     {{ item.text}}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'
const footer = ref([
  {
    path: '/home',
    name: 'home',
    text: '首页',
    icon: 'home-o'
  },
  {
    path: '/classify',
    name: 'classify',
    text: '分类',
    icon: 'apps-o'
  },
  {
    path: '/cart',
    name: 'cart',
    text: '购物车',
    icon: 'cart-o'
  },
  {
    path: '/mine',
    name: 'mine',
    text: '我的',
    icon: 'user-o'
  }
])
const active = ref()
</script>
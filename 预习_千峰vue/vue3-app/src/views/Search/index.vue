<template>
  <div class="search">
    <!-- 头部 -->
    <AppHeader class="HomeNav SearchNav" to=".app-header" left-arrow back>

      <template #title>
        <van-search autofocus v-model="keyWord" clearable placeholder="关键词" shape="round"></van-search>
      </template>

      <template #right>
        <van-button class="SearchBtn" size="small" color="#e93b3d" text-color="#fff" @click="go(keyWord)">搜索</van-button>
      </template>
    </AppHeader>

    <component :is=" SearchHistory" @search="go"></component>
  </div>
</template>

<script setup lang="ts">

import AppHeader from '../../components/AppHeader/index.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import SearchHistory from './SearchHistory/index.vue'

const router = useRouter()

const keyWord = ref<string>('')

// 点击搜索跳转
const go = (wd: string): void => {
  router.push({ path: '/list', query: { keyword: wd } })
}

</script>

<style lang="scss" scoped></style>
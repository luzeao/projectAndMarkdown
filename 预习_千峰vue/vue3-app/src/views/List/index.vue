<template>
  <div class="list">
    <!-- 头部 -->
    <AppHeader class="HomeNav SearchNav" to=".app-header" left-arrow back>

      <template #title>
        <van-search autofocus v-model="keyWord" clearable placeholder="关键词" shape="round"
          @focus="$router.push('/search')"></van-search>
      </template>

    </AppHeader>


  </div>
</template>

<script setup lang="ts">

import AppHeader from '../../components/AppHeader/index.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSearch } from '@/stores/search'

const keyWord = ref<string>('')

const route = useRoute()  // 当前路由信息

const searchStore = useSearch()

onMounted(() => {

  // 把关键词同步到搜索框,记录关键词
  keyWord.value = (route.query.keyword as string)  // 断言搜索关键词
  // 记录搜索关键词 =>localStoarge
  searchStore.addWord(keyWord.value)

})
</script>

<style lang="scss" scoped></style>
<template>
  <div class="search-history">
    <div class="search-near">
      <van-cell title="最近搜索">

        <template #value>
          <van-icon name="delete-o" @click="wordsList = []" />
        </template>
      </van-cell>

      <div class="searchNaerList">
        <van-space>
          <van-tag v-for="item, index in wordsList" :key="index" text="#f0f2f5" text-color="#fff" size="medium"
            @close="closeHandler(item)" closeable @click="$emit('search', item)">
            {{ item }}
          </van-tag>
        </van-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useSearch } from '@/stores/search';

const Search = useSearch()
const { wordsList } = toRefs(Search)  // 保持响应性

const closeHandler = (word: string) => {
  Search.delWord(word)
}
</script>

<style lang="scss" scoped>
.searchNaerList {
  padding: 0 0.2rem;
}
</style>
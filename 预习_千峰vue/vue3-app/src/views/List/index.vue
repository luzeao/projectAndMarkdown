<template>
  <div class="list">
    <!-- 头部 -->
    <AppHeader class="HomeNav SearchNav" to=".app-header" left-arrow back>

      <template #title>
        <van-search autofocus v-model="keyWord" clearable placeholder="关键词" shape="round"
          @focus="$router.push('/search')"></van-search>
      </template>

      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>

    </AppHeader>
    <van-popover v-model:show="showPopover" :actions="actions" theme="dark" close-on-click-action :offset="[300, -10]"
      :show-arrow="false" @select="selectHandler"></van-popover>

    <template v-if="list.length">
      <router-link :to="{ path: '/detail', query: { proid: item.proid } }" v-for="item in list" :key="item.proid"
        v-if="list.length != 0" class="orderitem">

        <van-card class="procard" :origin-price="item.originprice"
          :price="(item.originprice * item.discount / 10).toFixed(2)" :title="item.proname" :thumb="item.img1">
          <template #desc>
            <van-tag plain type="primary">{{ item.brand }}</van-tag>
          </template>
          <template #footer>
            <span>库存{{ item.stock }}</span>
          </template>
        </van-card>
      </router-link>
    </template>

    <template v-else>
      <van-empty image="search" description="暂时没有该商品" />
    </template>

  </div>
</template>

<script setup lang="ts">

import AppHeader from '../../components/AppHeader/index.vue'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearch } from '@/stores/search'
import { getSearchListAPI } from '@/api/pro';

const keyWord = ref<string>('')
const route = useRoute()  // 当前路由信息
const router = useRouter()
const searchStore = useSearch()
const list = ref<any>([])
const showPopover = ref(false);
const actions = [
  { text: '首页' },
  { text: '订单' },
  { text: '个人中心' },
  { text: '搜索' },
];
const selectHandler = (item: any, index: any) => {

  if (index == 0) {
    router.replace('/home')
  } else if (index == 1) {
    router.replace('/myorder')
  } else if (index == 2) {
    router.replace('/mine')
  } else if (index == 3) {
    router.replace('/search')
  }
}
const getSearchList = async () => {
  let res = await getSearchListAPI({
    keyword: route.query.keyword
  })

  console.log('搜索商品列表', res);
  list.value = res.data
}

onMounted(() => {

  // 把关键词同步到搜索框,记录关键词
  keyWord.value = (route.query.keyword as string)  // 断言搜索关键词
  // 记录搜索关键词 =>localStoarge
  searchStore.addWord(keyWord.value)

  getSearchList()

})
</script>

<style lang="scss" scoped>
:deep(.procard) {
  margin-top: 10px;
}
</style>
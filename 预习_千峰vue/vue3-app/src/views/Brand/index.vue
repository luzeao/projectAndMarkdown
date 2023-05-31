<template>
  <div>
    <AppHeader to=".app-header" left-arrow back>

      <template #title>
        {{ brand }}
      </template>

      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </AppHeader>
    <van-popover v-model:show="showPopover" :actions="actions" theme="dark" close-on-click-action :offset="[300, -10]"
      :show-arrow="false" @select="selectHandler"></van-popover>

    <template v-if="list.length != 0">
      <van-cell-group inset v-for="item in list">
        <van-card :title="item.proname" @click="goDetail(item.proid)">
          <template #desc>
            <img :src="item.img1">
            <van-tag size="large" type="warning">{{ item.category }}</van-tag>
            <van-tag size="large" type="danger">{{ item.brand }}</van-tag>
            <div class="box11" v-if="item.discount != 10">原价:{{ item.originprice }}</div>
            <div class="box22">现价:{{ item.originprice * item.discount / 10 }}</div>
          </template>
        </van-card>
      </van-cell-group>
    </template>

    <template v-else>
      <van-empty image="search" description="商品太火爆了,已经被抢空啦" />
    </template>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import { getBrandProListAPI } from '@/api/pro';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

const category = route.query.category
const brand = route.query.brand

let list = ref<any>([])

const showPopover = ref(false);
const actions = [
  { text: '首页' },
  { text: '订单' },
  { text: '个人中心' },
  { text: '搜索' },
];
// 点击菜单每一项的跳转
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

// 获取商品分类下的商品列表
const getBrandProList = async () => {
  let res = await getBrandProListAPI({
    category,
    brand
  })
  console.log('获取商品分类下的商品列表', res);
  list.value = res.data
}

const goDetail = (proid: any) => {
  router.replace({ path: '/detail', query: { proid } })
}

onMounted(() => {
  getBrandProList()
})

</script>

<style lang="scss" scoped>
.box11 {
  margin: 10px 0;

  font-size: larger;
}

.box22 {
  font-size: large;
}
</style>
<template>
  <div>
    <!-- 头部 -->
    <AppHeader to=".app-header">

      <template #title>
        选择城市
      </template>

      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </AppHeader>
    <!-- 头部菜单 -->
    <van-popover v-model:show="showPopover" :actions="actions" theme="dark" close-on-click-action :offset="[300, -10]"
      :show-arrow="false" @select="selectHandler"></van-popover>


    <van-index-bar class="cityBox">
      <div v-for="item in cityList" :key="item.letter">
        <van-index-anchor :index="item.letter.toUpperCase()">
        </van-index-anchor>
        <van-cell :title="city.name" v-for="(city, index) in item.data" :key="index"
          @click="router.replace({ path: '/category', query: { city: city.name } })" />
      </div>
    </van-index-bar>
  </div>
</template>

<script setup lang="ts">

import { cityApi } from "@/api/city";
import { ref, onMounted } from "vue";
import { showFailToast } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const cityList = ref<any>(null);

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


const city = async () => {
  try {
    let res = await cityApi();
    cityList.value = JSON.parse(res.data);
  } catch (err: any) {
    showFailToast(err.message);
  }
};
onMounted(() => {
  city();
});
</script>

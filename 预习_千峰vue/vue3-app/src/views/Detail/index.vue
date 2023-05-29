<template>
  <div class="detail">
    <AppHeader to=".app-header" left-arrow back></AppHeader>
    <div v-if="detailInfo">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img, index) in [detailInfo.img1, detailInfo.img2, detailInfo.img3, detailInfo.img4]"
          :key="index">
          <img class="img" :src="img" alt="">
        </van-swipe-item>
      </van-swipe>
      <van-row class="row desc">
        {{ detailInfo.proname }}
      </van-row>
      <van-row class="row price">
        {{ (detailInfo.originprice * detailInfo.discount) / 10 }}
      </van-row>

      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon icon="cart-o" text="购物车" />
        <van-action-bar-icon icon="shop-o" text="店铺" />
        <van-action-bar-button type="warning" text="加入购物车" @click="addToShoppingCar" />
        <van-action-bar-button type="danger" text="立即购买" />
      </van-action-bar>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'

import { getProDetailAPI } from "@/api/pro"
import { addCartAPI } from '@/api/cart'

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from 'vue-router';
import { showFailToast, showSuccessToast } from 'vant';

import { useUserStore } from "@/stores/user.js"

const router = useRouter();
const route = useRoute();
const User = useUserStore();

const proid = ref(route.query.proid)
// console.log('111111111111111', proid);


const detailInfo = ref<any>(null)

const { isLogin, userInfo } = storeToRefs(User)


// 获取商品详情
const getDetail = async () => {
  try {
    var res = await getProDetailAPI({ proid: proid.value });
    // console.log("商品详情", res);
    detailInfo.value = res.data;
  } catch (err: any) {
    showFailToast(err.message);
  }
}

let addToShoppingCar = async () => {
  // 加入购物车
  // 1. 判断用户是否登录   
  // a. 没有登录 => 去登录, 成功之后再回来
  // b. 已经登录 => 直接买
  console.log("isLogin", isLogin.value);
  if (isLogin.value) {
    // console.log("买!!!", userInfo.value.userid);
    // console.log('proid111', proid.value);

    try {
      await addCartAPI({
        userid: userInfo.value.userid,
        proid: proid.value,
        num: 1,
      })
      showSuccessToast("加入成功");
      router.push({ name: "car" })
    } catch (err: any) {
      showFailToast(err.message);
    }
  } else {
    router.replace({ name: "login", query: { ReturnUrl: route.fullPath } })
  }
}


onMounted(() => {
  getDetail()
})

</script>

<style scoped></style>
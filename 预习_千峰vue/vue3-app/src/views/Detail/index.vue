<template>
  <div class="detail">
    <AppHeader to=".app-header" title="商品详情" left-arrow back></AppHeader>
    <div v-if="detailInfo">
      <div class="box">
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
          ¥{{ ((detailInfo.originprice * detailInfo.discount) / 10).toFixed(2) }}
        </van-row>
      </div>

      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="评论" @click="commentHandler" />
        <van-action-bar-icon icon="cart-o" text="购物车" :badge="badge" @click="router.push('/car')" />
        <van-action-bar-icon icon="shop-o" text="店铺" />
        <van-action-bar-button type="warning" text="加入购物车" @click="addToShoppingCar" />
        <van-action-bar-button type="danger" text="立即购买" />
      </van-action-bar>

      <van-popup v-model:show="show" round closeable position="bottom" :style="{ height: '90%' }">
        <h3 style="text-align: center;margin-top: 20px;margin-bottom: 10px;">商品评论</h3>

        <van-cell-group inset>
          <van-field v-model="text" rows="5" border autosize type="textarea" maxlength="500" placeholder="请输入留言"
            show-word-limit />
          <span>评分</span>
          <van-rate v-model="star" touchable />
          <van-cell inset>
            <van-button type="primary" @click="submitText">提交评价</van-button>
          </van-cell>
        </van-cell-group>

        <van-cell-group>
          <van-cell>

          </van-cell>
        </van-cell-group>

      </van-popup>


    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import { showConfirmDialog } from 'vant';

import { getProDetailAPI } from "@/api/pro"
import { addCartAPI, getCartListAPI } from '@/api/cart'

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from 'vue-router';
import { showFailToast } from 'vant';

import { useUserStore } from "@/stores/user.js"

const router = useRouter();
const route = useRoute();
const User = useUserStore();

const proid = ref(route.query.proid)
const badge = ref<any>(0)

const detailInfo = ref<any>(null)

const { isLogin, userInfo } = storeToRefs(User)

const show = ref<any>(false)
const star = ref<any>(4)
const text = ref<any>('')
const textList = ref<any>([])

// 点击评论事件
const commentHandler = () => {
  show.value = true
}

// 提交评论事件
const submitText = () => {
  let event = new Date()
  let time = event.toLocaleString('zh-CN')
  let msg = {
    text: text.value,
    star: star.value,
    time,
  }
  textList.value.push(msg)
  sessionStorage.setItem('评论', JSON.stringify(textList.value))
  star.value = 5
  text.value = ''
}

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

// 添加至购物车
const addToShoppingCar = async () => {
  // 加入购物车
  // 1. 判断用户是否登录   
  // a. 没有登录 => 去登录, 成功之后再回来
  // b. 已经登录 => 直接买
  console.log("isLogin", isLogin.value);
  if (isLogin.value) {
    try {
      await addCartAPI({
        userid: userInfo.value.userid,
        proid: proid.value,
        num: 1,
      })
    } catch (err: any) {
      showFailToast(err.message);
    }
    getCartList()
    showConfirmDialog({
      title: '提示',
      message: '是否前往购物车'
    }).then(() => {
      router.push({ name: "car" })
    }).catch((err) => {
      console.log('取消查看');
    })

  } else {
    router.replace({ name: "login", query: { ReturnUrl: route.fullPath } })
  }
}

// 获取购物车
const getCartList = async () => {
  let res = await getCartListAPI({
    userid: User.userid
  })
  badge.value = res.data.length

}

onMounted(() => {
  getDetail()
  getCartList()
})

</script>

<style scoped lang="scss">
.box {
  padding: 10px;
}

.price {
  font-size: large;
  color: red;
  margin-top: 10px;
}

.desc {
  font-size: medium;
  margin-top: 5px;
}
</style>
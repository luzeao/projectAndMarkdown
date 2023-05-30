<template>
  <div class="order">
    <!-- 头部 -->
    <AppHeader class="HomeNav SearchNav" title="确认订单" to=".app-header" left-arrow back></AppHeader>
    <template v-if="tel == ''">
      <van-contact-card type="add" @click="onAdd" />
    </template>
    <template v-else>
      <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
    </template>


    <template v-if="isLogin && list.length != 0">
      <div class="car-list">
        <van-swipe-cell v-for="item in list" :key="item.cartid" class="list-item">
          <van-card class="goods-card" :title="item.proname" :price="(item.originprice * item.discount) / 10"
            :thumb="item.img1">
          </van-card>
        </van-swipe-cell>
      </div>
    </template>
    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="submitHandler" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { getCartListAPI, clearCartAPI } from '@/api/cart';
import { updateOrderAddressAPI } from '@/api/order';
import { addOrderAPI } from '@/api/order';
import { showFailToast } from 'vant';
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const { userid, isLogin } = user
const list = ref<any>([])

let name = ref('')
let tel = ref('')


if (route.query.info) {
  let obj = JSON.parse((route.query.info as any))

  name.value = obj.name
  tel.value = obj.tel
} else {
  name.value = ''
  tel.value = ''
}


let allPrice = computed(() => {
  return list.value.reduce((prev: any, item: any) => {
    if (item.flag) {
      prev += (item.originprice * item.discount) / 10 * item.num;
    }
    return prev;
  }, 0).toFixed(2) * 100;
})

// 获取购物车列表
const getCartList = async () => {
  let res = await getCartListAPI({
    userid
  })
  console.log('购物车列表', res);
  list.value = res.data
}


const onEdit = () => {
  router.push({ path: '/address', query: { time: route.query.time } })
}
// 点击新增地址跳转
const onAdd = () => {
  router.push({ path: '/address', query: { time: route.query.time } })
}

// 新增订单
let submitHandler = async () => {
  try {

    // console.log(userid,"cs");

    let res: any = await addOrderAPI({
      userid: userid
    });
    console.log("新增订单成功", res);
    await clearCartAPI({
      userid,
    })
    router.replace('/myorder')
  } catch (err: any) {
    showFailToast(err.message);
  }
}
onMounted(() => {
  getCartList()
})
</script>

<style lang="scss" scoped></style>
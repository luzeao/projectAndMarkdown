<template>
  <div class="order">
    <!-- 头部 -->
    <AppHeader class="HomeNav SearchNav" title="确认订单" to=".app-header" left-arrow back></AppHeader>
    <template v-if="phone == ''">
      <van-contact-card type="add" @click="onAdd" />
    </template>
    <template v-else>
      <van-contact-card type="edit" :tel="phone" :name="Name" @click="onEdit" />
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
import { addOrderAPI } from '@/api/order';
import { getDefaultAddressAPI } from '@/api/address';
import { getProDetailAPI } from '@/api/pro';
import { showFailToast } from 'vant';
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const { userid, isLogin } = user
const list = ref<any>([])
const Name = ref('')
const phone = ref('')

// 获取地址
const getAddressList = async () => {
  let res = await getDefaultAddressAPI({ userid })
  console.log('查询默认地址', res)
  let { name, tel, province, city, county, addressDetail } = res.data[0]

  if (route.query.info) {
    let obj = JSON.parse((route.query.info as any))

    Name.value = obj.name
    phone.value = obj.tel + obj.province + obj.city + obj.county
  } else if (res.data[0]) {
    Name.value = name
    phone.value = tel + province + city + county + addressDetail
  } else {
    Name.value = ''
    phone.value = ''
  }

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
  if (route.query.proid) {
    let res = await getProDetailAPI({
      proid: route.query.proid
    })
    list.value = [res.data]
    console.log(11111111, list.value);

  } else {
    let res = await getCartListAPI({
      userid
    })
    console.log('购物车列表', res);
    list.value = res.data.filter((item: any) => item.flag)
  }

}

// 点击编辑
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
  getAddressList()
})

</script>

<style lang="scss" scoped></style>
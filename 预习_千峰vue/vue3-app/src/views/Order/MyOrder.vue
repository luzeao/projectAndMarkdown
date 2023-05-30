<template>
  <div class="order">
    <!-- 头部 -->
    <AppHeader title="订单列表" to=".app-header" left-arrow back></AppHeader>

    <router-link :to="{ path: '/order/detail', query: { time } }" v-for="(time, index) in orderTime" :key="index"
      v-if="list.length != 0" class="orderitem">

      <van-cell title="下单时间" :value="time"></van-cell>

      <van-cell-group insert class="orderbox">

        <van-card v-for="item in list.filter((item: any) => item.time == time)" :key="item.proid" :num="item.num"
          :price="(item.originprice * item.discount / 10).toFixed(2)" :title="item.proname" :thumb="item.img1" />

      </van-cell-group>

    </router-link>

  </div>
</template>

<script setup lang="ts">
import { orderlistAPI } from '@/api/order'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const router = useRouter()
const user = useUserStore()
let { userid, isLogin } = storeToRefs(user)

let list = ref<any>([])
let orderTime = ref<any>([])

const orderlist = async () => {
  let res = await orderlistAPI({
    userid: userid.value,
  })
  // console.log('用户所有订单', res);
  list.value = res.data
  orderTime = new Set(
    list.value.map((item: any) => {
      return item.time
    })
  )
  // console.log(11111111111, orderTime);
  // console.log(list.value);
}

const onEdit = () => {
  router.push({ path: '/address' })
}

onMounted(() => {
  orderlist()
})
</script>

<style lang="scss" scoped>
.order {
  background-color: antiquewhite;
}


:deep(.orderitem) {
  margin: 10px 10px;
}
</style>
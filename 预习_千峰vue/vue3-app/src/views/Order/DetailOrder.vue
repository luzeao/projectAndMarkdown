<template>
  <div>
    <AppHeader title="订单详情" to=".app-header" left-arrow back></AppHeader>

    <template v-if="!name">
      <van-contact-card type="add" @click="onAdd" />
    </template>
    <template v-else>
      <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
    </template>
    <van-swipe-cell v-for=" item  in  list " :key="item.cartid" class="list-item">

      <van-card class="goods-card" :title="item.proname" :price="(item.originprice * item.discount) / 10"
        :thumb="item.img1" :num="item.num">
      </van-card>
      <van-cell title="商品小计" :value="(item.num * item.originprice * item.discount / 10).toFixed(2)" />
      <van-cell title="下单时间" :value="item.time" />
    </van-swipe-cell>

  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import { confirmOrderAPI } from '@/api/order';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const user = useUserStore()
const route = useRoute()
const router = useRouter()
const time = ref(route.query.time)
let { userid } = user

let list = ref<any>([])
let name = ref('')
let tel = ref('')


const getconfirmOrder = async () => {
  let res = await confirmOrderAPI({
    userid,
    time: time.value
  })
  console.log('获取确认订单', res);
  list.value = res.data
  name.value = list.value[0].name
  tel.value = list.value[0].tel + list.value[0].province + list.value[0].city + list.value[0].county + list.value[0].addressDetail
}

const onEdit = () => {
  router.push({ path: '/address', query: { time: route.query.time, returnUrl: route.fullPath } })
}

const onAdd = () => {
  router.push({ path: '/address', query: { time: route.query.time, returnUrl: route.fullPath } })
}

onMounted(() => {
  getconfirmOrder()
})
</script>

<style lang="scss" scoped></style>
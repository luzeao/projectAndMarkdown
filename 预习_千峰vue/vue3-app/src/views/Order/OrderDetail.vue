<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { orderlistAPI } from '@/api/order'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
const user = useUserStore()

const orderlist = async () => {
  let res = await orderlistAPI({
    userid: user.userid
  })
  console.log('用户所有订单', res);
}

onMounted(() => {
  orderlist()
})
</script>

<style lang="scss" scoped></style>
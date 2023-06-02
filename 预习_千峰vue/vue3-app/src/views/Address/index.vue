<template>
  <div>
    <AppHeader title="地址列表" to=".app-header" left-arrow back></AppHeader>
    <!-- @add="onAdd" @edit="onEdit"  -->
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
      @select="selectHandler" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { getAddressListAPI } from '@/api/address';
import { showFailToast } from 'vant';
import { updateOrderAddressAPI } from '@/api/order';


const user = useUserStore()
const router = useRouter()
const route = useRoute()
const chosenAddressId = ref<string | number>('');
const list = ref([])
const fromPath = localStorage.getItem('fromPath')
const toPath = localStorage.getItem('toPath')


// 获取地址列表
const AddressList = async () => {
  try {
    let res = await getAddressListAPI({
      userid: user.userid
    })
    list.value = res.data
    console.log(list.value);

    // 给每一条数据添加一个id属性
    list.value.forEach((item: any, index) => {
      item.id = index
    })
    // 拼接详细地址
    list.value.forEach((item: any) => {
      item.address = item.province + item.city + item.county + item.addressDetail
    })
    // 将默认地址的id赋值给v-model的变量
    chosenAddressId.value = list.value.findIndex((v: any) => {
      if (v.isDefault == true) {
        return v.id
      }
    })

  } catch (err: any) {
    showFailToast(err.message)
  }
}
// 点击新增地址跳转
const onAdd = () => {
  router.push({ path: 'address/add', query: { time: route.query.time } })
}
// 点击编辑地址
const onEdit = async (item: any, index: any) => {
  router.push({ path: '/address/add', query: { info: JSON.stringify(item), returnUrl: route.fullPath } })
}

// 点击地址时跳转
// console.log(1111111,route.query.returnUrl);
const selectHandler = async (item: any) => {
  console.log(11111, fromPath);

  if (fromPath == '/order' || fromPath == '/order/detail') {
    let res1 = await updateOrderAddressAPI({
      userid: user.userid,
      name: item.name,
      tel: item.tel,
      province: item.province,
      city: item.city,
      county: item.county,
      addressDetail: item.addressDetail,
      time: route.query.time
    })
    router.replace({ path: fromPath, query: { time: route.query.time, info: JSON.stringify(item) } })
  }
}

watchEffect(() => {
  AddressList()
})

</script>

<style scoped></style>
<template>
  <div>
    <van-address-edit :area-list="areaList" :show-delete="isEdit" show-set-default show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="saveHandler" @delete="onDelete"
      :address-info="addressInfo" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { showFailToast, showToast } from 'vant';
import { areaList } from '../../../../node_modules/@vant/area-data';
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { addAddressAPI, updateAddressAPI, delAddressAPI } from "@/api/address.js"
import { useUserStore } from "@/stores/user.js"
import { useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
let User = useUserStore();
let { userid } = storeToRefs(User);
let isEdit = ref(false)

let addressInfo = ref({})

// 判断是否是从编辑跳转
if (route.query.info) {
  isEdit.value = true
  addressInfo.value = JSON.parse(route.query.info as any)
} else {
  isEdit.value = false
  addressInfo.value = {}
}

// 点击保存事件
const saveHandler = async (info: any) => {
  if (route.query.info) {

    let res = await updateAddressAPI({
      userid: userid.value,
      ...info
    })
    console.log('地址更新成功', res);
    
    router.replace('/address')
  } else {
    try {
      var res = await addAddressAPI({
        userid: userid.value,
        ...info
      });
      console.log("地址新增成功", res);
      router.replace('/address')
    } catch (err: any) {
      showFailToast(err.message);
    }
  }
}
const onDelete = async () => {
  const res = await delAddressAPI({
    addressid: JSON.parse(route.query.info as any).addressid
  })
  // console.log('删除地址成功',res);
  router.replace('/address')

}
</script>


<style lang="scss" scoped></style>
<template>
  <div class="updatepass">
    <AppHeader to=".app-header">

      <template #title>
        修改密码
      </template>

      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </AppHeader>
    <van-popover v-model:show="showPopover" :actions="actions" theme="dark" close-on-click-action :offset="[300, -10]"
      :show-arrow="false" @select="selectHandler"></van-popover>


    <van-form ref="regForm" @submit="onSubmit" validate-first validate-trigger="onChange">
      <van-cell-group inset>

        <van-field v-model="oldpassword" type="text" name="oldpass" label="原密码" placeholder="输入原密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="newpassword" type="text" name="newpass" label="新密码" placeholder="输入新密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="dbpass" type="text" name="dbpass" label="新密码" placeholder="确认密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          修改密码
        </van-button>

      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { updatePassword } from "@/api/user"
import { showFailToast } from 'vant';
const user = useUserStore()
let { userid } = user
const showPopover = ref(false);
const router = useRouter()
const oldpassword = ref<string>('')
const newpassword = ref<string>('')
const dbpass = ref<string>('')
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

const onSubmit = async () => {

  if (dbpass.value == newpassword.value) {
    let res = await updatePassword({
      userid,
      oldpassword: oldpassword.value,
      newpassword: newpassword.value
    })
    console.log('修改密码状态', res);
    router.replace('/login')
  } else {
    showFailToast('两次密码不一致')
  }

}
</script>

<style lang="scss" scoped></style>
<template>
  <div class="mine">
    <AppHeader to=".app-header">

      <template #title>
        我的
      </template>

      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </AppHeader>
    <van-popover v-model:show="showPopover" :actions="actions" theme="dark" close-on-click-action :offset="[300, -10]"
      :show-arrow="false" @select="selectHandler"></van-popover>


    <van-row>
      <van-col span="24">
        <van-button class="btn" type="success" v-if="!isLogin" @click="goLogin">登录</van-button>
        <p v-else class="tel">手机号:{{ tel }}</p>
      </van-col>
    </van-row>

    <van-cell title="地址管理" is-link @click="addressHandler" v-if="isLogin" />
    <van-cell title="修改密码" is-link v-if="isLogin" />
    <van-cell title="联系我们" is-link />
    <van-cell title="公司简介" />
    <van-cell title="清除缓存" />
    <van-cell title="设置" />

    <van-button class="btn" type="default" v-if="isLogin" @click="exitHandler">注销登录</van-button>
  </div>
</template>

<script setup lang="ts">

import AppHeader from '@/components/AppHeader/index.vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfoAPI } from '@/api/user'
import { useUserStore } from '@/stores/user';
import { showConfirmDialog } from 'vant';

const router = useRouter()
const user = useUserStore()
const { userid, isLogin } = user
const showPopover = ref(false);
const tel = ref('')
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

// 获取当前登录用户的信息
const getUserInfo = async () => {
  let res = await getUserInfoAPI({
    userid,
  })
  tel.value = res.data[0].tel
}
// 点击去登录
const goLogin = () => {
  router.replace('/login')
}
// 退出登录
const exitHandler = async (): Promise<any> => {
  showConfirmDialog({
    title: '友情提示',
    message: '确定要退出登录吗'
  }).then(() => {
    user.exitAndUpdateUserInfo()
    router.replace('/home')
  }).catch((err) => {
    console.log('取消注销登录');
  })
}
// 点击地址管理跳转地址列表
const addressHandler = () => {
  router.push('/address')
}

onMounted(() => {
  getUserInfo()
})

</script>

<style scoped>
:deep(.btn) {
  display: block;
  margin: 0.5rem auto;
}

.tel {
  font-size: 0.5rem;
  text-align: center;
  margin: 0.5rem auto;
}
</style>
<template>
  <div class="login">
    <!-- 头部 -->
    <AppHeader to=".app-header" title="登陆" left-arrow back></AppHeader>
    <div class="container">
      <van-form ref="regForm" @submit="onSubmit" validate-first validate-trigger="onChange">
        <van-cell-group inset>

          <van-field v-model="tel" name="tel" label="手机号" placeholder="请填写手机号" :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请填写正确手机号' },
            { validator: validateTel }]" />

          <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />

        </van-cell-group>
        <div class="goRegister" @click="goRegisterHandler">去注册</div>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>

        </div>
      </van-form>
    </div>
    <!-- 测试退出功能 -->
    <!-- <button @click="userStore.exitAndUpdateUserInfo">
      退出登录
    </button> -->
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader/index.vue"
import type { Ref } from 'vue'  // 从声明文件中解构出来
import { ref } from 'vue';
import { doCheckPhoneAPI, doFinishRegisterAPI, doLoginAPI } from '@/api/user'
import { showToast } from 'vant';  // 提示消息
import type { FormInstance } from 'vant';  // 声明类型
import type { RouteLocationRaw } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user'

// 使用路由
const router = useRouter()
const route = useRoute()

// 获取表单ref
const regForm = ref<FormInstance>()

const tel: Ref = ref<string>('');
const password: Ref = ref<string>('');

// 使用pinia
const userStore = useUserStore()

// 验证手机号是否存在,存在就可以登录
const validateTel = async (tel: number): Promise<any> => {
  try {
    let res = await doCheckPhoneAPI({ tel })
    return '该手机号未注册'
  } catch (err: any) {
    return true
  }
}
// 点击去注册
const goRegisterHandler = () => {
  router.replace('/register')
}

// 提交事件
const onSubmit = async (): Promise<any> => {
  try {
    // 先登录
    // let res = await doLoginAPI({
    //   loginname: tel.value,
    //   password: password.value
    // })
    // console.log('登陆成功', res);
    // 登陆成功再存储userid,token

    // 登录是异步代码
    await userStore.loginAndUpdateUserInfo({
      loginname: tel.value,
      password: password.value
    })

    // 跳转是同步代码 => 所以先执行这里 => 还没有接收到登录数据,所以要登录两次
    let { ReturnUrl } = route.query
    if (ReturnUrl) {
      router.replace(ReturnUrl as RouteLocationRaw)  // 断言
    } else {
      router.replace('/home')
    }


  } catch (err) {
    return false
  }
}

</script>

<style scoped lang="scss">
.van-form {
  height: 4rem;

  .van-cell-group {
    height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .van-cell {
      height: 20%;
      align-items: center;
      font-size: 0.25rem;
    }
  }

  .van-button--round {
    height: 0.7rem;
  }
}

.goRegister {
  margin-left: 0.2rem;
  color: red;
}
</style>
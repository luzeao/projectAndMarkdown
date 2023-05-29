<template>
  <div class="register">
    <!-- 头部 -->
    <AppHeader to=".app-header" title="注册" left-arrow back></AppHeader>
    <div class="container">
      <van-form ref="regForm" @submit="onSubmit" validate-first validate-trigger="onChange">
        <van-cell-group inset>
          <van-field v-model="tel" name="tel" label="手机号" placeholder="请填写手机号" :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请填写正确手机号' },
            { validator: validateTel }]" />
          <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
          <van-field name="code" v-model="code" center clearable label="验证码" placeholder="请输入短信验证码"
            :rules="[{ validator: validateCode }]">
            <template #button>
              <van-button class="sendBtn" :disabled="isSend" size="small" type="primary" @click="sendCode(tel)" round>
                {{ isSend ? countDown : '发送验证码' }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader/index.vue"
import type { Ref } from 'vue'  // 从声明文件中解构出来
import { ref } from 'vue';
import { doCheckPhoneAPI, doSendMsgCodeAPI, doCheckCodeAPI, doFinishRegisterAPI } from '@/api/user'
import { showToast } from 'vant';
import type { FormInstance } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter()
const countDown = ref<number>(30)
const isSend = ref<boolean>(false)
const timer = ref<number | null>(null)

// 获取表单ref
const regForm = ref<FormInstance>()

const tel: Ref = ref<string>('');
const password: Ref = ref<string>('');
const code: Ref = ref<string>('');

// 验证函数,手机号失焦时判断是否可用
const validateTel = async (tel: number): Promise<any> => {
  // console.log('tel', tel);
  try {

    let res = await doCheckPhoneAPI({ tel })
    // console.log('res', res);
    return true  // 验证成功,返回true

  } catch (err: any) {

    showToast(err.message)
    return false  // 验证失败 => 返回false ,或者错误

  }

}

// 验证验证码的验证函数
const validateCode = async (code: string): Promise<any> => {
  // console.log('code', code);
  if (!code) return false

  try {

    var res = await doCheckCodeAPI({
      tel: tel.value,
      telcode: code
    })
    // console.log('验证码', res);

    return true  // 验证成功,返回true

  } catch (err: any) {
    // showToast('验证码错误')
    return false  // 验证失败 => 返回false ,或者错误

  }
}

// 发送验证码
const sendCode = async (tel: number): Promise<any> => {
  // 发送验证码前,先判断手机号是否正确
  // validate
  // regForm => ref对象 => 需要通过.value
  try {
    // 断言这个元素是ref对象
    await (regForm as Ref).value.validate('tel')  // 能进来说明手机号可用
    let res = await doSendMsgCodeAPI({ tel: tel })
    console.log('验证码是', res.data)
    // 禁用发送按钮
    isSend.value = true
    // 设置计时器,30秒之内不能重复点击
    timer.value = setInterval(() => {
      countDown.value--
      // 如果倒计时归零,可以继续点击
      if (countDown.value == 0) {
        clearInterval((timer as Ref).value)
        isSend.value = false
        countDown.value = 30
      }
    }, 1000)
  } catch (err) {
    return false
  }
}


// 提交事件
const onSubmit = async (): Promise<any> => {
  // console.log(values);
  // console.log(tel.value);
  // console.log(password.value);
  try {
    let res = await doFinishRegisterAPI({
      tel: tel.value,
      password: password.value
    })

    router.push('/login')

  } catch (err) {
    return false
  }
}





</script>

<style scoped lang="scss">
.register {
  width: 100%;
  height: 100%;
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}

.container {
  width: 90%;
  height: 3rem;
  margin: 0 auto;
  margin-top: 1rem;
}

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

.sendBtn {
  width: 1.64rem;
  height: 0.4rem;
}</style>
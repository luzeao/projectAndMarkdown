import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { doLoginAPI } from '@/api/user'
import type { LoginParams } from '@/api/user'

interface userParamsInfo {
  token: string,
  userid: string
}

export const useUserStore = defineStore('user', () => {

  // 声明一个reative对象用来储存 => state数据
  const userInfo: any = reactive<userParamsInfo>({
    token: '',
    userid: ''
  })

  // 声明更新reactive的方法
  const updateUserInfo = (payload: userParamsInfo) => {
    for (let key in (payload as userParamsInfo)) {
      userInfo[key] = (payload as any)[key]
    }
  }

  // 计算属性快捷获取token
  const token = computed(() => {
    return userInfo.token
  })

  // 计算属性快捷获取userid
  const userid = computed(() => {
    return userInfo.userid
  })

  // 计算属性用来验证是否登录
  const isLogin = computed(() => {
    return userInfo.token && userInfo.userid ? true : false
  })

  // 登录并且更新pinia数据
  const loginAndUpdateUserInfo = (payload: LoginParams): Promise<any> => {
    return doLoginAPI(payload).then((res) => {
      updateUserInfo(res.data)
    })
  }

  const exitAndUpdateUserInfo = (): void => {
    updateUserInfo({
      token: '',
      userid: ''
    })
  }

  return { userInfo, updateUserInfo, loginAndUpdateUserInfo, token, userid, isLogin, exitAndUpdateUserInfo }
}, {
  // pinia数据持久化储存 => 默认将模块中的state数据存储到localStorage中 => 对象转json字符串
  // 对象的键名就是属性名{userInfo:{token,userid}} => 转json字符串
  // 对象的键值就是属性值
  persist: true,
})

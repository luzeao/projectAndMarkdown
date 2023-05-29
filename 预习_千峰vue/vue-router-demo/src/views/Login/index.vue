<template>
  <div class="login">
    <p>
      <router-link to="/login/account">账号登录</router-link>
      <router-link to="/login/phone">手机号登录</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>

import { loginAPI } from '@/api/user'

export default {
  name: 'LoginView',
  data() {
    return {
      user: '',
      pwd: ''
    }
  },
  methods: {
    async loginHandler() {
      try {
        var res = await loginAPI({
          user: this.user,
          pwd: this.pwd
        })

        console.log(res)
        if (res.status) {  //登录成功
          /* 
            去主页
            当前页面跳转其他的路由页面
            this.$route  => 当前路由信息
            this.$router  => 路由实例 => 存放所有路由配置(可以实现路由跳转替换 -> 前进或后退)

            页面跳转(路由跳转/导航跳转) 
              1. 声明式写法 router-link
              2. 编程式写法 通过路由实例进行跳转 router.push() router.go() router.back()
            
            路由实例的相关方法
            router.push() 跳转指定路由页面,会新增一条历史记录
            router.replace() 跳转指定路由页面,不会新增历史记录(替换原本的历史记录)
            router.back() 返回历史记录的前一条,后退一步
            router.go(n) 前进或者后退 => 正值表示前进n步,负值表示后退n步

            如何跳转首页
              1. 基于原生的location.href( 路由可能是hash路由/history路由 => 路径格式不一样容易出问题)
              2. 使用官方提供的编程式导航
          */
          /* 
            2.1 传入路径字符串(对应路由中的path)
            this.$router.push('/')  // 对应路径中的path进行跳转
            2.2 传入一个对象
            this.$router.push({path:'/'})
            /login -> /  (push新增会新增历史记录)
            this.$router.push({name:'home'})
            /login -> /  (不会新增历史记录)
            this.$router.replace({name:'home'})
           */

          var query = this.$route.query
          var { ReturnUrl } = query

          if (ReturnUrl) {  // 从其他页面跳转过来的
            // 历史记录 /detail 替换为 /login 替换 /detail
            this.$router.replace(ReturnUrl)
          } else { // 单纯登录功能
            this.$router.push('/')
          }

          //  存储登录的用户名
          // 去主页
          // this.$router.push('/') // 对应路径中的path进行跳转
        } else {
          // 登录失败
          alert(res.message)
        }
      } catch (err) {
        console.log(err)
      }

    },
    mounted() {
      console.log(this.$route);
    },
  },
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: aqua;
}
</style>
<template>
  <div>
    <h2>模块测试(namespaced:true)</h2>


    <!-- 手搓版本 -->
    <!-- <p>user:{{ $store.state.mdB.user }}</p>
    <p>token:{{ $store.state.mdB.token }}</p> -->
    <!-- 
      错误写法
    <p>isLogin:{{ $store.getters.mdB.isLogin }}</p>
    -->
    <!-- <p>isLogin:{{ $store.getters['mdB/isLogin'] }}</p>
    <p>
      <button @click="$store.commit('mdB/updateInfo', { user: 'c321321' })">更新用户</button>
    </p>
    <p>
      <button @click="$store.dispatch('mdB/loginAndUpdateInfo')">模拟登陆</button>
    </p> -->


    <!-- 辅助函数版本 -->
    <p>user:{{ user }}</p>
    <p>token:{{ token }}</p>
    <p>a1和b1:{{ a1 }}----{{ b1 }}</p>
    <p>isLogin:{{ isLogin }}</p>
    <p>
      <button @click="updateInfo({ user: 'c321321' })">更新用户</button>
    </p>
    <p>
      <button @click="loginAndUpdateInfo">模拟登陆</button>
    </p>

  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // ...mapState({
    //   user:(state)=>state.mdB.user,  // 从根store的state开始取值
    //   token:(state)=>state.mdB.token
    // })

    ...mapState('mdB', ['user', 'token']), // 直接从根store的state下的mdB开始取值
    ...mapState('mdB/mdB_1', ['a1', 'b1']), // 直接从根store的state下的mdB内的mdB_1开始取值
    ...mapGetters('mdB', ['isLogin']), // 直接从根store的state下的mdB内开始取值

  },
  methods: {

    ...mapMutations('mdB', ['updateInfo']),
    ...mapActions('mdB', ['loginAndUpdateInfo'])

  },
  mounted() {

    console.log('当前实例', this);
    console.log('当前实例$store', this.$store);

  },
}
</script>

<style lang="scss" scoped>

</style>
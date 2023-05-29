<template>
  <div>
    <h2>模块测试(namespaced:false)</h2>

    <p>user:{{ user }}</p>
    <p>token:{{ $store.state.mdA.token }}</p>
    <p>isLogin:{{ isLogin }}</p>
    <p>
      <button @click="updateInfo({user:'aaaaa321'})">更新用户</button>
    </p>
    <p>
      <button @click="loginAndUpdateInfo()">模拟登陆</button>
    </p>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: state => state.mdA.user,
    }),
    ...mapGetters(['isLogin']),
  },
  methods: {
    ...mapMutations(['updateInfo']),
    ...mapActions(['loginAndUpdateInfo'])
  },

  mounted() {
    console.log('当前实例', this);
    console.log('当前实例$store', this.$store);
  },
}
</script>

<style lang="scss" scoped></style>
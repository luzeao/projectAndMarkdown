<template>
  <div class="home">
    这是List页
  </div>
</template>

<script>

// 按需引入
// import axios from 'axios'
// axios.get
// axios.post


// 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名
export default {
  name: 'ListView',
  data() {
    return {
      list: []
    }
  },
  methods: {

  },
  mounted() {
    this.$get('/searchAllGoods.php', {
      baseURL: 'http://121.43.116.41/demo/php'
    }).then(res => {
      // console.log('res', res);
      return res.data
    }).then(data => {
      // console.log('data', data);
      this.list = data.list
    })
  },

}
</script>

<style lang="scss" scoped></style>
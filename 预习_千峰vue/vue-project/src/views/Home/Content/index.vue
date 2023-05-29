<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic :value="allUser" title="用户总数"></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="商品总数">
            <template slot="formatter"> {{ allpro == 0 ? '---' : allpro }} </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">

      </el-col>
      <el-col :span="6">

      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getStatisticProAPI, getStatisticUserAPI } from '@/api/data';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeDefaultView',
  data() {
    return {
      allUser: 0,
      allpro: 0,

      timer: null
    };
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    // 商品数量
    async getStatisticPro() {
      try {
        var res = await getStatisticProAPI()
        // console.log('商品总数', res);
        this.allpro = res.data

      } catch (err) {
        this.$message.error('获取失败')
      }
    },

    // 注册用户数量
    async getStatisticUser() {
      try {
        var res = await getStatisticUserAPI()
        // console.log('用户总数', res);
        this.allUser = res.data.length

      } catch (err) {
        this.$message.error('获取失败')
      }
    },

    // ajax轮询
    ajaxLoop() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getStatisticPro()
        this.getStatisticUser()
      }, 10000)
    },

  },

  beforeDestroy() {
    clearInterval(this.timer)  // 在组件销毁时，清除ajax轮询
    // console.log(1111111111111111111111111111111111);
  },

  mounted() {
    // console.log(111111111111111111111111111111,this.isLogin);
    this.getStatisticPro()
    this.getStatisticUser()
    this.ajaxLoop()

  },

}
</script>

<style lang="scss" scoped></style>
<template>
  <div class="bannerList">
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="bannerid" label="编号"></el-table-column>

      <el-table-column prop="img" label="图片">
        <!-- slotScope 作用域插槽 -> 组件内向组件外传递的数据 => {row:当前行的数据} -->
        <template #default="slotScope">
          <el-image :src="slotScope.row.img"></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="link" label="图片链接"></el-table-column>

      <el-table-column prop="alt" label="图片提示"></el-table-column>

      <el-table-column prop="flag" label="公开" align="center">
        <template #default="slotScope">

          <el-switch v-model="slotScope.row.flag" active-color="#13ce66" inactive-color="#ff4949"
            @change="changeStateHandler(slotScope.row.bannerid, $event)" :disabled="isNormal"></el-switch>

        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template #default="slotScope">
          <el-button type="danger" @click="deleteBannerById(slotScope.row.bannerid)" :disabled="isNormal">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>

import { getBannerListAPI, updateBnannerAPI, deleteBannerAPI } from '@/api/banner';
import authority from '@/plugins/authorityMinxis';

export default {
  name: 'BannerListView',
  mixins: [authority],
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getBannerList() {
      try {
        var res = await getBannerListAPI()

        // console.log('请求成功', res);
        this.list = res.data
        // this.$message.success('获取轮播图列表成功')
      } catch (err) {
        // console.log('请求失败', err);
        this.$message.error('获取失败')
      }
    },

    // 删除当前点击的轮播

    async deleteBannerById(bannerid) {
      try {
        var res = await deleteBannerAPI({
          bannerid
        })
        // console.log('请求成功', res);
        this.$message.success('删除成功')
        var index = this.list.findIndex(v => v.bannerid == bannerid)
        this.list.splice(index, 1)

      } catch (err) {
        console.log('请求失败', err);
        this.$message.error(err.message)
      }
    },

    // 改变轮播图状态
    async changeStateHandler(bannerid, flag) {
      try {

        var res = await updateBnannerAPI({
          bannerid,
          flag
        })

        console.log('请求成功', res);
        this.$message.success('状态更新成功')

      } catch (err) {
        console.log('请求失败', err);
        this.$message.error(err.message)
      }
    }
  },

  mounted() {
    this.getBannerList()
  },
}
</script>

<style lang="scss" scoped>
.bannerList .img {
  width: 100%;
}
</style>
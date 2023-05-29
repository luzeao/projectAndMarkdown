<template>
  <div class="bannerList">
    <el-table :data="list" style="width: 100%" border>

      <el-table-column prop="adminid" label="管理员id"></el-table-column>

      <el-table-column prop="adminname" label="管理员名称"></el-table-column>

      <el-table-column prop="password" label="管理员密码"></el-table-column>

      <el-table-column prop="role" label="权限等级"></el-table-column>

      <el-table-column prop="checkedKeys" label="权限列表"></el-table-column>

      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="info" @click="lookHandler(row.adminname)">查看</el-button>
          <el-button type="primary" @click="editHandler">编辑</el-button>
          <el-button type="danger" @click="delHanlder(row.adminid)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>

import { adminListAPI, adminDelAPI, adminUpdateAPI, adminDetailAPI } from '@/api/admin';

export default {
  name: 'AdminListView',
  data() {
    return {
      list: []
    }
  },

  methods: {
    // 获取管理员列表
    async adminList() {
      try {
        var res = await adminListAPI()
        this.list = res.data
        console.log(res);
      } catch (err) {
        this.$message.error('获取失败')
      }
    },
    // 点击编辑执行
    editHandler() {

    },
    // 点击查看执行
    async lookHandler(adminname) {
      try {
        var res = await adminDetailAPI({ adminname })
        // console.log(res);
      } catch (err) {
        this.$message.error('获取失败')
      }
    },
    // 点击删除执行
    delHanlder(adminid) {
      this.$confirm('确定要删除该管理员吗?想好了吗?').then(async () => {
        try {
          await adminDelAPI({ adminid })
          // this.list = res.data
          this.$message.success('删除成功')
          this.adminList()
          // console.log(res);
        } catch (err) {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message('取消删除')
      })
    }
  },
  mounted() {
    this.adminList()
  },
}
</script>

<style lang="scss" scoped></style>
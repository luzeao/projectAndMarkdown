<template>
  <!-- <el-dropdown>
    <i class="el-icon-setting" style="margin-right: 15px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>查看</el-dropdown-item>
      <el-dropdown-item>新增</el-dropdown-item>
      <el-dropdown-item>删除</el-dropdown-item>
    </el-dropdown-menu>
    <span>王小虎</span>
  </el-dropdown> -->
  <el-dropdown trigger="click" placement="bottom" @command="itemChange">
    <span class="el-dropdown-link">
      {{ adminname }}<i class="el-icon-s-tools"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="1">我的</el-dropdown-item>
      <el-dropdown-item :command="2">设置</el-dropdown-item>
      <el-dropdown-item :command="3">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: 'HeaderLayout',
  computed: {
    ...mapState(['adminname'])
  },
  methods: {
    ...mapActions(['exitAuthorityInfo']),
    itemChange(commandValue) {
      if (commandValue == 3) {
        // 清除本地数据,vuex存储数据
        // 回到登录页
        this.exitAuthorityInfo()
        this.$router.replace('/login')
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
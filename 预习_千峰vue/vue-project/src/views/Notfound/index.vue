<template>
  <div class="page">
    404
    <!-- 3 -->
    <el-button type="primary" v-authority:remove.superAdmin>超级管理员</el-button>
    <el-button type="primary" v-authority:disabled.superAdmin>管理员</el-button>
    <el-button type="primary">普通用户</el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style lang="scss" scoped>

/* 
  深度选择器
  vue2
    css语法  >>> 需要将唯一的标识提前在谁后面就在谁后面添加
    less语法  /deep/  需要将唯一的标识提前在谁后面就在谁后面添加
    sass语法  ::v-depp  需要将唯一的标识提前在谁后面就在谁后面添加
  
  vue3
    sass语法 :deep(.comp-a  h1){}  直接在括号内写选择器
*/
</style>
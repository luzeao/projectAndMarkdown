<template>
  <div class="adminAdd">

    <el-button type="primary">管理员新增</el-button>

    <el-form class="adminAddForm" ref="adminForm" @submit.prevent :model="form" label-width="120px">

      <el-form-item prop="adminname" label="管理员名称"
        :rules="[{ type: 'string', message: '请填写管理员名称', required: true, trigger: 'blur' }]">
        <el-input v-model="form.adminname"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="管理员密码"
        :rules="[{ type: 'string', message: '请填写管理员密码', required: true, trigger: 'blur' }]">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="管理员等级"
        :rules="[{ type: 'string', message: '请选择管理员等级', required: true, trigger: 'blur' }]">
        <el-select v-model="form.role" clearable @change="roleChange">
          <el-option label="超级管理员" :value="1"></el-option>
          <el-option label="普通管理员" :value="2"></el-option>
          <el-option label="普通用户" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <!-- 管理员权限 -->
      <el-form-item prop="password" label="管理员权限">
        <!-- 
            :default-expanded-keys="[2, 3]" 默认展开
            :default-checked-keys="['/home']"  默认选中
        -->
        <el-tree :data="menus" show-checkbox node-key="path" :props="defaultProps" ref="tree"></el-tree>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitHandler">提交</el-button>
        <el-button type="info" @click="resetHandler">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import { adminAddAPI } from '@/api/admin';


import { menus } from '@/router/routes'


export default {
  name: 'AdminAddView',
  data() {
    return {
      form: {
        adminname: '',
        password: '',
        role: '',
        checkedKeys: []
      },

      menus: menus,

      // 默认配置
      defaultProps: {
        children: 'children',  // 将data中的children作为子分支
        label: 'label'  // 将data中的label作为树状图的标题
      }
    }
  },


  methods: {
    // 提交按钮获取树状结构数据
    submitHandler() {
      // 获取选中的tree中的node-key ,所有子项被选中父也会被选中
      console.log('选中的结构', this.$refs.tree.getCheckedKeys());
      this.form.checkedKeys = this.$refs.tree.getCheckedKeys()
      // console.log('form数据', this.form);

      this.$refs.adminForm.validate(async (bool) => {
        // console.log(bool);
        if (bool) {

          try {
            var res = await adminAddAPI(this.form)
            this.$message.success('添加管理员成功')
            this.resetHandler()
            // console.log(res)
          } catch (err) {
            this.$message.error(err.message)
          }

        }

      })
    },

    // 等级判断
    roleChange(role) {

      this.$refs.tree.setCheckedKeys([])

      if (role == "") {
        this.$refs.tree.setCheckedKeys([])
      } else if (role == 1) {
        this.$refs.tree.setCheckedKeys(["/home", "/banner", "/goods", "/admin", '/study'])
      } else if (role == 2) {
        this.$refs.tree.setCheckedKeys(["/home", "/banner", "/goods", '/study'])
      } else if (role == 3) {
        this.$refs.tree.setCheckedKeys(["/home", "/banner/show", '/goods/list', '/study'])
      }

    },

    // 点击重置
    resetHandler() {
      this.$refs.adminForm.resetFields()
      this.$refs.tree.setCheckedKeys([])

      // console.log(11);
    }

  },

}
</script>


<style lang="scss" scoped>
.adminAddForm {
  margin-top: 20px;
  width: 600px;
}
</style>
<template>
  <div class="login">
    <!-- 
      validateField form组件的属性
      status-icon属性为输入框添加了表示校验结果的反馈图标
      :model 表单数据对象
      lable-width="100px" 提示标签的宽度
      :rules="rules" 验证的规则(对应每个字段的prop属性定义)
     -->
    <el-form :model="form" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm login-box">

      <el-form-item label="用户名" prop="user">
        <el-input type="text" v-model="form.user" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input type="text" v-model="form.pwd" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitHandler">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import { adminLoginAPI } from '@/api/admin';
import { mapMutations } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    // rule => 当前校验规则(对象)
    // value => 验证函数被触发时 表单对应的值
    // callback() => 验证失败时提示的回调 => 如果callback不传参数就代表成功
    var validateUser = (rule, value, callback) => {
      // console.log(rule)
      if (!value) {
        callback('请输入用户名')
      } else if (!(value.length >= 5 && value.length <= 12)) {
        callback('请输入长度6-12位的用户名')
      } else if (!/^\w{5,12}$/.test(value)) {
        callback('用户名由数字字母下划线组成')
      } else {
        callback()
      }
    };

    return {
      form: {
        user: '',
        pwd: '',
      },
      // 对应字段名称(el-input-item => prop属性填写验证规则)
      rules: {
        user: [
          // 必填
          // { type: 'string', required: true, message: '请输入用户名', trigger: 'blur' },
          // // 长度6-12
          // { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          // // 格式 => 正则写法
          // { pattern: /^[a-zA-Z]\w{5,11}$/, message: '用户名由数字字母下划线组成,请勿以数字和下划线开头', trigger: 'blur' },
          // 自定义验证函数
          { type: "string", required: true, validator: validateUser, trigger: 'blur' }
        ],
        pwd: [
          { type: 'string', required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { pattern: /^\w{5,12}$/, message: '密码由数字字母下划线组成', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    ...mapMutations(['updataAuthorityInfo']),
    submitHandler() {
      // this.$refs.loginForm.validate()  // 全都验证
      // 全部验证 获取全部验证的结果
      // 1. 传入回调函数的版本
      // this.$refs.loginForm.validate((bool, obj) => {
      //   console.log('校验结果', bool, obj);
      //   if (bool) {
      //     console.log('去登录');
      //   }
      // })

      // 2. 如果不传入回调,会返回promise实例
      this.$refs.loginForm.validate().then(() => {

        adminLoginAPI({
          adminname: this.form.user,
          password: this.form.pwd
        }).then(response => {   // 请求成功 => 后端返回结果(登陆成功/用户未注册/密码错误)
          console.log('请求成功', response);
          // code == 200 登陆成功
          // code == 10003 密码有误
          // code == 10005 用户名未注册
          // code == 1000xx token过期
          var { code, message, data } = response
          if (code == 200) {
            this.$message({
              type: 'success',
              message: message
            })
            this.updataAuthorityInfo(data)
            // this.$router.push('/')
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      }).catch(err => {
        console.log('校验失败', err);
      })
    },

    // 重置按钮
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("https://static.zhihu.com/heifetz/assets/sign_bg.47eec442.png") no-repeat #b8e5f8;
}

.login-box {
  width: 500px;
  padding-top: 50px;
  padding-right: 70px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.pwdTips {
  color: #67c23a;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
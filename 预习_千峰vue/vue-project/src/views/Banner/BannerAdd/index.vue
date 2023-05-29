<template>
  <div class="bannerAdd">
    <el-radio-group v-model="type" @input="resetForm('bannerUpload')">
      <el-radio-button label="在线上传"></el-radio-button>
      <el-radio-button label="本地上传"></el-radio-button>
    </el-radio-group>
    <el-form class="uploadBanner" label-position="right" label-width="80px" :model="form" ref="bannerUpload">

      <template v-if="type == '在线上传'">
        <el-form-item label="地址" prop="img" :rules="[{ required: true, message: '请传入图片地址' }]" key="line">
          <el-input v-model="form.img"></el-input>
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item label="地址" prop="img" :rules="[{ required: true, message: '请传入图片地址' }]" key="local">
          <el-upload ref="upload" class="" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" drag
            show-file-list :on-change="selectImgChange" :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
      </template>

      <el-form-item label="提示信息" prop="alt" :rules="[{ required: true, message: '请传入提示信息' }]">
        <el-input v-model="form.alt"></el-input>
      </el-form-item>

      <el-form-item label="链接" prop="link" :rules="[{ required: true, message: '请传入图片连接' }]">
        <el-input v-model="form.link"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="subBanner('bannerUpload')">提交</el-button>
        <el-button type="info" @click="resetForm('bannerUpload')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { bannerAddAPI } from '@/api/banner'
import fileToBase64 from '@/utils/fileToBase64'

export default {
  name: 'BannerAddView',
  data() {
    return {
      form: {
        img: '',
        alt: '',
        link: ''
      },
      type: '在线上传'
    }
  },
  methods: {
    async selectImgChange(file) {
      // file 文件信息{name,size,status,uid,raw:文件对象}
      // console.log('选择的图片改变了',file);
      // 将file对象转为base64
      // const fileReader = new FileReader()
      // fileReader.readAsDataURL(file.raw);
      // fileReader.onload = function(){
      //   console.log(this.result);
      // };
      // fileReader.onerror = () => {

      // }
      try {
        var base64Url = await fileToBase64(file.raw)
        this.form.img = base64Url
      } catch (err) {
        this.$message.error(err.message)
      }

    },
    subBanner(formName) {

      // 接收提交表单的名称,在点击提交时,验证整个表单
      this.$refs[formName].validate(async bool => {

        if (bool) {
          try {
            // 如果成功就调用新增轮播的接口
            var res = await bannerAddAPI(this.form)
            console.log('res', res)
            // 上传成功的提示信息
            this.$message({
              type: 'success',
              message: "上传成功"
            })
            if (this.$refs['upload']) {
              this.$refs['upload'].clearFiles()
            }
            // 上传成功后清除整个表单
            this.$refs[formName].resetFields()
          } catch (err) {
            // 如果发生错误,弹出错误信息
            this.$message.error(err.message)
          }
        }

      })
    },

    // 点击重置后,重置整个表单以及验证信息
    // !!注意!! 想要触发点击事件,需要给每一项绑定一个prop属性
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }

  },
}
</script>

<style lang="scss" scoped>
.uploadBanner {
  margin-top: 20px;
  width: 600px;
}
</style>
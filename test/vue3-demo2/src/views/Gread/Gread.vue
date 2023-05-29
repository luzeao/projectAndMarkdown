<template>
  <div>
    <h2>成绩系统 - <el-button type="primary" size='small' @click="router.push('data')"> 数据分析</el-button> </h2>
    <div>
      <el-button type="success" @click="ShowDialog"> 添加成绩</el-button>
    </div>
    <div>
      <el-row style="margin-top:10px">
        <el-col :span="9">
          <el-input v-model="keyword" placeholder="根据名字搜索" />
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="warning" @click="todoSearch"> 点击搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table" style="margin-top:10px">
      <el-table border v-loading="loading" element-loading-text="Loading..." :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(122, 122, 122, 0.8)" :data="list"
        style="width: 100%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="class" label="班级" width="180" />
        <el-table-column prop="math" label="数学" />
        <el-table-column prop="chinese" label="语文" />
        <el-table-column prop="english" label="英语" />
        <el-table-column label="总分">
          <template #default="scope">
            <el-tag v-if="scope.row">
              {{ scope.row.math + scope.row.chinese + scope.row.english }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div>
              <el-button type="danger" size="small" @click="deleteOne(scope.row, scope.$index)">删除</el-button>
              <el-button type="info" size="small" @click="updateOne(scope.row, scope.$index)">修改</el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-dialog v-model="show" :title="flag ? '添加成绩' : '修改成绩'" width="30%" :before-close="handleClose">
      <el-form ref="formRef" label-position="top" label-width="100px" :model="form" :rules="rules"
        style="max-width: 460px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" :disabled="!flag" />
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="form.class" :disabled="!flag" />
        </el-form-item>
        <el-form-item label="语文" prop="chinese">
          <el-input v-model="form.chinese" type="number" />
        </el-form-item>
        <el-form-item label="数学" prop="math">
          <el-input v-model="form.math" type="number" />
        </el-form-item>
        <el-form-item label="英语" prop="english">
          <el-input v-model="form.english" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button :type="flag ? 'danger' : 'primary'" @click="addGrade">
            {{ flag ? '确定' : '修改' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
axios.defaults.baseURL = 'http://121.43.116.41/demo/php'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const keyword = ref('') // 搜索的值 
const uid = ref() // 修改的id
const flag = ref(true)  // true 表示添加  false 修改
const loading = ref(false)
const list = ref([])
const formRef = ref()
const form = ref({

})
const show = ref(false)
const rules = reactive({
  name: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  class: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  chinese: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  math: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  english: [
    { required: true, message: '请输入', trigger: 'blur' },
  ]
})
const handleClose = () => {
  form.value = {}
  formRef.value.resetFields()  // 重置表单 
  show.value = false;
}
const ShowDialog = () => {
  flag.value = true
  show.value = true;
}
// 开始搜索
const todoSearch = () => {
  getGradeList(keyword.value)
}

const getGradeList = async (wd = '') => {
  loading.value = true;
  let res = await axios.get('/searchGradeOrderLimit.php', {
    params: {
      wd,
      col: 'id',
      type: "desc",
      page: 1,
      size: 200
    }
  })
  if (res.data.status) {
    list.value = res.data.list
    loading.value = false;
  }
}
const addGrade = () => {
  // console.log(formRef)
  formRef.value.validate(async (valid) => {
    console.log(valid)
    if (valid) {
      if (flag.value) {
        // 添加接口 
        let res = await axios.get('/addGrade.php', {
          params: {
            ...form.value,
            ch: form.value.chinese,
            mh: form.value.math,
            eh: form.value.english,
          }
        })
        // console.log(res)
        if (res.data.status) {
          getGradeList()
          handleClose()
        }
      } else {
        // 修改 
        let res = await axios.post('/updateGradeById.php', {
          id: uid.value,
          ch: form.value.chinese,
          mh: form.value.math,
          eh: form.value.english,
        })
        if (res.data.status) {   // 重新请求数据 
          getGradeList()
          handleClose()
        }
      }

    } else {
      ElMessage.error('表单校验失败')
    }
  })
}

// 修改
const updateOne = (item, index) => {
  show.value = true;
  flag.value = false; // 修改 

  uid.value = item.id;
  form.value = Object.assign({}, item);
}

// 删除
const deleteOne = async (item, index) => {
  loading.value = true;
  // 后端删除     
  let res = await axios.get('/deleteGradeById.php', {
    params: {
      id: item.id
    }
  })
  if (res.data.status) {
    // 前端删除
    list.value.splice(index, 1)  // 直接修改原数据的

  }
  loading.value = false;
}

onMounted(() => {
  getGradeList()
})
</script>

<style lang="scss" scoped></style>
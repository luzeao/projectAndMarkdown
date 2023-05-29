
<template>
  <div class="table">

    <!-- 新增按钮,点击弹出层 -->
    <el-button type="primary" @click="dialog = true">新增</el-button>

    <!-- 搜索框 -->
    <el-form :model="params" inline>
      <el-form-item prop="name" label="输入查询姓名">
        <el-input v-model="params.wd"></el-input>
      </el-form-item>
    </el-form>

    <!-- 新增成绩弹出层 -->
    <el-dialog v-model="dialog" title="新增成绩" center>
      <el-form :model="GreadAdd">
        <el-form-item prop="name" label="姓名">
          <el-input v-model="GreadAdd.name" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="class" label="班级">
          <el-input v-model="GreadAdd.class" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="ch" label="语文">
          <el-input v-model="GreadAdd.ch" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="mh" label="数学">
          <el-input v-model="GreadAdd.mh" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="eh" label="英语">
          <el-input v-model="GreadAdd.eh" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGreadHandler(GreadAdd)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 表格渲染区域 -->
    <el-table :data="list" border style="width:300">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>

      <el-table-column label="语文">
        <template #default="{ row } = scoped">
          <el-input v-if="row.isEdit" v-model="row.chinese"></el-input>
          <span v-else>{{ row.chinese }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数学">
        <template #default="{ row } = scoped">
          <el-input v-if="row.isEdit" v-model="row.math"></el-input>
          <span v-else>{{ row.math }}</span>
        </template>
      </el-table-column>

      <el-table-column label="英语">
        <template #default="{ row } = scoped">
          <el-input v-if="row.isEdit" v-model="row.english"></el-input>
          <span v-else>{{ row.english }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <!-- <template #default="{ row } = scoped">
          <el-button type="primary" @clicl="row.isEdit = !row.isEdit">{{ row.isEdit }}</el-button>
          <el-button type="primary" @click="delHandler(row.id)">删除</el-button>
        </template> -->
        <template #default="{ row } = scope">
          <el-button type="warning" v-show="!row.isEdit" @click="edit(row)">编辑</el-button>
          <el-button type="danger" v-show="row.isEdit" @click="save(row)">保存</el-button>
          <el-button type="primary" @click="delHandler(row.id)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination background :pager-count="7" layout="prev, pager, next, jumper, total" :total="total"
      @current-change="sizeChangeHandler">
    </el-pagination>

  </div>
</template>

<script setup>
import { getGreadListAPI, delGreadAPI, addGreadAPI, undateGreadAPI } from '../api/greads.js'
import { ref, watchEffect } from 'vue'

let list = ref([])
let total = ref(null)
let dialog = ref(false)

let GreadAdd = ref({
  name: '',
  class: '',
  ch: '',
  mh: '',
  eh: ''
})

let params = ref({
  wd: '',
  col: 'id',
  type: 'desc',
  page: 1,
  size: 10
})
// 获取成绩列表
const getProList = async () => {

  try {
    let res = await getGreadListAPI(params.value)
    // console.log('请求成功', res);
    // console.log(list.value);
    list.value = res.list
    // 新增是否可编辑状态
    list.value.forEach(item => {
      item.isEdit = false
    })
    total.value = res.total
    console.log(11111111111, list.value);
  } catch (err) {
    throw err
  }
}

// 页码改变事件
const sizeChangeHandler = (value) => {
  params.value.page = value
  getProList()
}

// 新增成绩
const addGreadHandler = async (GreadAdd) => {
  try {
    let res = await addGreadAPI(GreadAdd)
    dialog.value = false
    getProList()
    console.log('新增成功', res);
  } catch (err) {
    throw err
  }
}

// 点击编辑按钮让每一个框变为可编辑状态
const edit = (row) => {
  row.isEdit = true;
}
// 点击保存按钮事件
const save = async (row) => {
  let res = await undateGreadAPI({
    id: row.id,
    ch: row.chinese,
    mh: row.math,
    eh: row.english
  })
  console.log('更新成功',res);
  row.isEdit = false;
}

// 删除事件
const delHandler = async (id) => {
  try {
    await delGreadAPI({ id })
    // console.log('删除成功', res);
    getProList()
  } catch (err) {
    throw err
  }
}

watchEffect(() => {
  getProList()
})

</script>

<style lang="scss" scoped>
.table {
  width: 1000px;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
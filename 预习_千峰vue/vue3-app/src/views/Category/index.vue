<template>
  <div class="category">

    <teleport to='.app-header'>
      <van-nav-bar title="分类" left-arrow back fixed placeholder></van-nav-bar>
    </teleport>


    <div class="bigbox">
      <div class="left">
        <van-sidebar v-model="active">
          <van-sidebar-item v-for="item in CategoryList" :title="item" @click="onChange(item)" />
        </van-sidebar>
      </div>
      <div class="right">
        <van-cell-group v-for="item in CategoryBrandlist ">
          <van-tag class="tag" type="primary" size="large">{{ item.brand }}</van-tag>
        </van-cell-group>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getProCategoryAPI, getCategoryBrandlistAPI } from '@/api/pro'
import { onMounted } from 'vue';
let CategoryList = ref([])
let CategoryBrandlist = ref<any>([])
let active = ref('')
// 获取当前分类下的商品分类
const onChange = async (category: any) => {
  let res = await getCategoryBrandlistAPI({
    category
  })
  // console.log('子分类', res);
  CategoryBrandlist.value = res.data
}
// 获取所有分类
const getProCategory = async () => {
  let res = await getProCategoryAPI()
  // console.log('获取分类列表', res)
  CategoryList.value = res.data
}
onMounted(() => {
  getProCategory()
})
</script>

<style scoped lang="scss">
.bigbox {
  display: flex;

  .left {
    height: 80%;
    overflow: auto;
    width: 25%;
  }

  .right {
    height: 100%;
    width: 75%;
  }
}

:deep(.tag) {
  margin: 10px 5px;
}
</style>
<template>
  <teleport to='.app-header'>
    <van-nav-bar title="分类" fixed placeholder>
      <template #left>
        <span @click="router.push('/city')">{{ route.query.city ? route.query.city : '选择城市' }}</span>
        <van-icon name="exchange" />
      </template>
    </van-nav-bar>
  </teleport>


  <div class="bigbox">

    <van-sidebar v-model="active" class="left">
      <van-sidebar-item v-for="item in CategoryList" :title="item" @click="onChange(item)" />
    </van-sidebar>

    <div class="right">
      <van-cell-group v-for="item in CategoryBrandlist ">
        <van-tag class="tag" type="primary" size="large" @click="gobrand(item.brand)">{{ item.brand }}</van-tag>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getProCategoryAPI, getCategoryBrandlistAPI } from '@/api/pro'
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

let CategoryList = ref([])
let CategoryBrandlist = ref<any>([])
let active = ref('')
let cg = ref('')

// 获取所有分类
const getProCategory = async () => {
  let res = await getProCategoryAPI()
  console.log('获取分类列表', res)
  CategoryList.value = res.data
}

// 获取当前分类下的商品分类
const onChange = async (category: any) => {
  cg.value = category
  let res = await getCategoryBrandlistAPI({
    category
  })
  console.log('子分类', res);
  CategoryBrandlist.value = res.data
}

const gobrand = (brand: any) => {
  // console.log(1111111111, brand);
  router.push({ path: '/brand', query: { category: cg.value, brand } })
}
onMounted(() => {
  getProCategory()
})
</script>

<style scoped lang="scss">
.bigbox {
  display: flex;
  height: 100%;

  .left {
    overflow: scroll;
  }

}

:deep(.tag) {
  margin: 10px 5px;
}
</style>
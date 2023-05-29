<template>
  <div class="goodslist">
    <el-form inline label-width="80" @submit.prevent :model="searchParams" ref="searchForm">

      <el-form-item prop="search">
        <el-input v-model="searchParams.search" placeholder="请输入商品关键字"></el-input>
      </el-form-item>

      <el-form-item label="分类选择" prop="category">
        <el-select v-model="searchParams.category" placeholder="请选择分类" clearable>
          <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchPro">搜索</el-button>
        <el-button type="info" @click="resetHandeler('searchForm')">重置</el-button>
      </el-form-item>

    </el-form>


    <el-table class="list" :data="showList" border style="width: 100%" height="600">

      <el-table-column prop="proname" label="商品名称" align="center" width="280"></el-table-column>

      <el-table-column prop="img" label="商品图片" align="center" width="240">
        <template #default="{ row }">
          <el-image style="width: 100px; height: 100px" :src="row.img1"
            :preview-src-list="[row.img1, row.img2, row.img3, row.img4]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="originprice" label="原价" align="center" width="100"></el-table-column>
      <el-table-column label="折后价" align="center" width="100">
        <template #default="{ row }">
          <span v-if="row.discount != 10">{{ row.originprice * row.discount / 10 }}</span>
          <span v-else>暂无折扣</span>
        </template>
      </el-table-column>

      <el-table-column prop="stock" label="商品库存" align="center" width="250"></el-table-column>

      <el-table-column label="是否开启推荐" align="center" width="200">
        <template #default="slotScope">
          <el-switch v-model="slotScope.row.isrecommend" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="0" active-text="推荐" inactive-text="不推荐"
            @change="changeIsrecommendHandler(slotScope.row.proid, $event)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="isseckill" label="是否开启秒杀" align="center" width="250">
        <template #default="slotScope">
          <el-switch v-model="slotScope.row.isseckill" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
            :inactive-value="0" active-text="开启" inactive-text="关闭"
            @change="changeIsseckillHandler(slotScope.row.proid, $event)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" @click="lookUpHandler(row.proid)">查看</el-button>
        </template>
      </el-table-column>

    </el-table>


    <el-drawer title="我是标题" :visible.sync="isShowDrawer" direction="rtl" :with-header="false">
      <el-descriptions title="商品详情" class="drawer" border>
        <el-descriptions-item label="商品名称">{{ info.proname }}</el-descriptions-item>
        <el-descriptions-item label="商品分类">{{ info.category }}</el-descriptions-item>
        <el-descriptions-item label="品牌">{{ info.brand }}</el-descriptions-item>
        <el-descriptions-item label="商品预览">
          <el-image :src="info.img1" :preview-src-list="[info.img1, info.img2, info.img3, info.img4]"></el-image>
        </el-descriptions-item>
        <el-descriptions-item label="商品价格">{{ info.stock == 0 ? '暂无库存' : info.stock }}</el-descriptions-item>
        <el-descriptions-item label="商品库存">{{ info.originprice }}</el-descriptions-item>
        <el-descriptions-item label="当前折扣">{{ info.discount == 10 ? '暂无折扣' : info.discount }}</el-descriptions-item>
        <el-descriptions-item label="商品详情">{{ info.desc }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
import { updateIsseckillAPI, updateIsrecommendAPI, getCategoryAPI, searchProAPI, getProDetailAPI } from '@/api/goods';
export default {
  name: 'GoodsSearchView',
  data() {
    return {
      list: [],
      searchParams: {
        search: '',
        category: ''
      },
      options: [],
      isShowDrawer: false,
      info: {},
      page: 1,
      size: 10,

    }
  },
  computed: {
    // 前端分页  => 后端返回所有数据(数组)  => 前端自己定义page,size => 对应截取
    showList() {

      // page   size= 10
      // 第1页 [0-10]
      // 第2页 [10-20]
      // 第3页 [20-30]
      //  page  [(page-1)*10,page*10)]

      return this.list.slice((this.page - 1) * this.size, this.page * this.size);
    }
  },
  methods: {

    // 修改商品推荐
    async changeIsrecommendHandler(proid, flag) {

      try {
        var res = await updateIsrecommendAPI({
          proid,
          flag
        })
        // console.log('更新推荐状态', res);
        this.$message.success('更新状态成功')
      } catch (err) {
        this.$message.error(err.message)
      }
    },

    // 修改商品秒杀
    async changeIsseckillHandler(proid, flag) {
      try {
        var res = await updateIsseckillAPI({
          proid,
          flag
        })
        // console.log('更新秒杀状态', res);
        this.$message.success('更新状态成功')
      } catch (err) {
        this.$message.error(err.message)
      }
    },

    // 获取商品分类
    async getCategory() {
      try {
        var res = await getCategoryAPI()
        // console.log('商品的分类', res);
        this.options = res.data
      } catch (err) {
        this.$message.error(err.message)
      }
    },

    // 搜索商品
    async searchPro() {
      try {
        var res = await searchProAPI(this.searchParams)
        // console.log('查询商品', res);
        this.list = res.data
      } catch (err) {
        this.$message.error(err.message)
      }
    },

    // 查看商品详情
    async lookUpHandler(proid) {
      try {
        var res = await getProDetailAPI({ proid })
        console.log('查询商品详情', res);
        this.info = res.data[0]
        this.isShowDrawer = true
        console.log(this.info);
      } catch (err) {
        this.$message.error(err.message)
      }
    },

    //重置搜索
    resetHandeler(formName) {

      this.$refs[formName].resetFields()
      this.getCategory()
      this.searchPro()
    }
  },
  watch: {
    'searchParams.category'() {
      this.searchPro()
    }
  },

  mounted() {
    this.getCategory()
    this.searchPro()
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  padding-left: 20px;
  padding-top: 30px;
}
</style>
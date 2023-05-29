<template>
  <div class="goodslist">

    <el-table class="list" :data="list" border style="width: 100%">

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
          <!-- 因为这个自定义指令是操作的dom,并不是直接在组件上添加了disabled属性,所以只是视觉上禁用 -->
          <el-switch v-authority:disabled.admin v-model="slotScope.row.isrecommend" active-color="#13ce66"
            inactive-color="#ff4949" :active-value="1" :inactive-value="0" active-text="推荐" inactive-text="不推荐"
            @change="changeIsrecommendHandler(slotScope.row.proid, $event)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="isseckill" label="是否开启秒杀" align="center" width="250">
        <template #default="slotScope">
          <!-- 因为这个自定义指令是操作的dom,并不是直接在组件上添加了disabled属性,所以只是视觉上禁用 -->
          <el-switch v-authority:disabled.admin v-model="slotScope.row.isseckill" active-color="#13ce66"
            inactive-color="#ff4949" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭"
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
    <div class="pageBox">
      <!-- 
        :total=total 总数据 : 从接口收到
        :current-page.sync="pageParams.count"  默认显示那一页
        :page-size.sync="pageParams.limitNum"  每页显示多少条
        :page-sizes="[5, 10, 15, 20]"   页码更换
       -->
      <el-pagination class="page" background layout="pager,prev,next,total,sizes,jumper" :total="total"
        :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageParams.limitNum"
        :current-page.sync="pageParams.count"></el-pagination>
    </div>

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

import { getGoodsListAPI, updateIsrecommendAPI, getProDetailAPI, updateIsseckillAPI } from '@/api/goods';

export default {
  name: 'GoodsListView',
  data() {
    return {
      pageParams: {
        count: 1,
        limitNum: 5
      },
      list: [],
      total: 0,
      searchParams: {
        search: '',
        category: ''
      },
      options: [],
      isShowDrawer: false,
      info: {}
    }
  },
  methods: {
    // 获取商品列表
    async GoodsList() {

      try {
        var res = await getGoodsListAPI(this.pageParams)
        // console.log('商品列表', res);
        // this.$message.success('获取商品列表成功')
        this.list = res.data
        this.total = res.total
      } catch (err) {
        console.log(err)
        this.$message.error(err.message)
      }

    },

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
        // console.log('更新推荐状态', res);
        this.$message.success('更新状态成功')
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
  },
  watch: {
    // 监听页数发生改变
    pageParams: {
      handler() {
        // console.log('数据发生改变');
        this.GoodsList()
      },
      deep: true
    },
    'searchParams.category'() {
      // console.log('category改变了');
      this.searchPro()
    }
  },

  mounted() {
    this.GoodsList()
  }

}

</script>

<style lang="scss" scoped>
.list {
  height: 700px;
  overflow-y: auto;
}

.drawer {
  padding-left: 20px;
  padding-top: 30px;
}
</style>
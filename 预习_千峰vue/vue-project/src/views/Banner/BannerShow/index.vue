<template>
  <div class="bannerShow" v-loading="loading">

    <template v-if="showImgCount">
      <div class="swiper demo" ref="mySwiper">
        <div class="swiper-wrapper">

          <template v-for="item, index in list">
            <div class="swiper-slide" :key="index" v-if="item.flag">
              <img :src="item.img" alt="">
            </div>
          </template>

        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

      </div>
    </template>

    <template v-if="loading == false && showImgCount == 0">
      <el-empty description="暂无图片"></el-empty>
    </template>
  </div>
</template>

<script>
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper'

import { getBannerListAPI } from '@/api/banner';

export default {
  name: 'BannerShowView',
  data() {
    return {
      list: [],
      mySwiper: null,
      loading: true
    }
  },
  computed: {
    showImgCount() {
      return this.list.filter(v => v.flag).length
    }
  },
  methods: {
    async getBannerList() {
      this.loading = true
      try {
        var res = await getBannerListAPI()

        console.log('请求成功', res);
        this.list = res.data
        this.$message.success('获取轮播图列表成功')
        this.loading = false
      } catch (err) {
        console.log('请求失败', err);
      }
    },
    initSwiper() {
      this.mySwiper = new Swiper(this.$refs.mySwiper, {

        loop: true, // 循环模式选项

        // 监听器
        observer: true,
        observeParents: true,

        // 组件写法,在当前swiper实例中使用导航,分页(点),自动播放组件
        modules: [Pagination, Navigation, Autoplay],


        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,  // 是否可以点击切换
        },

        autoplay: {
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      })
    }
  },
  watch: {
    list() {
      // 监听数据改变 -> 初始化swiper也不行(数据变了,视图更新也是异步的)
      // this.initSwiper()
      this.$nextTick(() => {
        this.initSwiper()
        // console.log('list数据', this.list);
      })
    }
  },

  mounted() {
    this.getBannerList()
    this.initSwiper()  // 组件挂载完毕 渲染swiper ,此时list可能还没有数据 -> 初始化swiper没用
  },
}


</script>

<style lang="scss" scoped>
// @import '../../../../node_modules/swiper/swiper-bundle.min.css';
@import 'swiper/swiper-bundle.min.css';

.bannerShow {
  width: 100%;
  height: 100%;

  .demo {
    width: 100%;
    height: 100%;

    .swiper-slide {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
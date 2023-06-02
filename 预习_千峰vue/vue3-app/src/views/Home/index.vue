<template>
  <div class="home">

    <!-- 头部 -->
    <AppHeader class="HomeNav" to=".app-header" title="主页">
      <template #left>
        <van-icon
          name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgAgMAAAAdw9KTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURUdwTP///////////waf0AoAAAADdFJOUwDjSYAlncUAAAAbSURBVBjTY5j/Hwq+MdTDmH+RmUgK6AuGhcsAU5tyB6Ji+x0AAAAASUVORK5CYII="
          @click="router.replace('/search')"></van-icon>
      </template>
      <template #title>
        <van-search v-model="kerWords" clearable placeholder="关键词" shape="round" @focus="$router.replace('/search')">
          <template #label>
            <van-icon
              name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOo8Puo7Peo7Pek7Peo7Pe0/Qek7PvE+SP9SUuo7Peo7Peo7Pus8P+o7Peo7Pek7PZSxd20AAAAQdFJOUwBV8eG+hyGkEQbGmWs/rthNA0r+AAAA5klEQVQ4y63T0RaDIAgAUEDRUjP//2u3CI/T1vJhvM3uVBAANGx5xwLgiwSZ3TI6uMYANSyuc7AUs03CUvgHRMTEflcZ76FezDGJTE/wTYNI9whhDePhNxAcDVveQWDJbgK6Y8FPQDBH2WdgPlZmYNQvj5D7tP8Ap4+2s8lQX56g4AK34bGPshJ8gbl/wrXoASOUDanlgvVFB3g2T5sGZ2on9xCp23BJ8tusPVzw7O/zhuxtHSIZDYGRo891WUemjeVZgsu4kmY8ju8Ifb2f/i3WV+/gzq0Zgs0xba0eHCSsj4zLR91f1fAfiWsqzlEAAAAASUVORK5CYII="></van-icon>
          </template>
        </van-search>
      </template>
      <template #right>
        <router-link to="/login" v-if="!user.isLogin">登陆</router-link>
        <router-link to="/home" v-else @click="exitHandler">退出</router-link>
      </template>
    </AppHeader>

    <!-- 轮播图 -->
    <div class="banner-wraper">
      <van-swipe :autoplay="3000" lazy-render class="swiper">
        <van-swipe-item v-for="item in list" :key="item.bannerid">
          <img :src="item.img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 九宫格 -->
    <van-grid :column-num="5" class="grid">
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <template v-slot:icon>
          <van-image
            src="https://m15.360buyimg.com/mobilecms/jfs/t1/187640/12/30456/5256/639c2315Ebc95c142/350a8f0c766f5460.png"></van-image>
        </template>
        <template v-slot:text>
          超市
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isRefresh" @refresh="refreshHandler">
      <!-- 下拉加载 -->
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="loadHandler">
        <!-- 商品列表 -->
        <van-row class="pro-list" gutter="10">

          <van-col class="pro-item" :span="12" v-for="item in proList" :key="item.proid">
            <router-link :to="{ name: 'detail', query: { proid: item.proid } }">
              <van-image :src="item.img1" class="pro-img"></van-image>
              <div class="pro-name van-multi-ellipsis--l2">
                {{ item.proname }}
              </div>
              <div class="pro-price">
                {{ (item.originprice * item.discount / 10).toFixed(2) }}
              </div>
            </router-link>
          </van-col>

        </van-row>

      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">

import type { BannerItem } from '@/api/banner';  // 获取类型接口
import type { pageParams } from '@/api/pro'  // 获取类型接口
import { ref, onMounted, reactive } from 'vue';  // 获取vue的方法
import { getBannerListAPI } from '@/api/banner'  // api
import { getProListAPI } from '@/api/pro'  // api
import AppHeader from '@/components/AppHeader/index.vue'  // 引入组件
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';

const router = useRouter()
const user = useUserStore()
const kerWords = ref<string>('')
// 轮播list
const list = ref<BannerItem[]>([])
// 商品列表
const proList = ref<any>([])
// 初始页数
const pageInfo = reactive<pageParams>({
  count: 1,
  limitNum: 10
})
// 加载默认值
const loading = ref<boolean>(false)
// 加载完全结束默认值
const finished = ref<boolean>(false)
// 刷新状态默认值
const isRefresh = ref<boolean>(false)


// 获取轮播图
const getBannerList = async (): Promise<any> => {
  try {

    let res = await getBannerListAPI()
    list.value = res.data
    // console.log('res', res);

  } catch (err) {
    throw err
  }
}

// 获取商品列表
const getProList = async (): Promise<any> => {
  try {

    let res = await getProListAPI(pageInfo)
    proList.value.push(...res.data)
    // console.log('商品列表', res);

  } catch (err) {
    throw err
  }
}

// 每次滚动到底部的执行函数
const loadHandler = async (): Promise<any> => {
  // console.log('准备加载', loading.value);

  await getProList()
  loading.value = false
  // console.log(pageInfo.count);
  if (pageInfo.count > 10) {  // 总共15页面
    finished.value = true
  } else {
    pageInfo.count++
  }

}

// 下拉执行事件
const refreshHandler = async (): Promise<any> => {

  // 下拉的刷新isRefresh会被成true
  pageInfo.count = Math.round(Math.random() * 5) + 1
  proList.value = []
  await getProList()
  // 完成之后改为false
  isRefresh.value = false
  finished.value = false
}

// 退出登录点击事件
const exitHandler = async (): Promise<any> => {
  user.exitAndUpdateUserInfo()
}
// 钩子函数,当页面挂载完成执行
onMounted(() => {
  getBannerList()
  getProList()
})

</script>

<style scoped lang="scss">
.banner-wraper {
  height: 3.5rem;
  width: 7rem;
  margin: 0.1rem auto;
  border-radius: 10px;

  .van-swipe {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.grid {
  position: static;

  .van-grid-item {
    width: 1.5rem;
    height: 1.5rem;

    .van-image {
      width: 85%;
      height: 85%;
    }
  }
}

.pro-list {
  padding: 0 0.2rem;

  .pro-item {
    .pro-img {
      width: 100%;
      display: block;
      margin: 0.2rem auto;
    }

    .pro-name {
      line-height: 0.32rem;
    }

    .pro-price {
      line-height: 0.32rem;
      width: 80%;
    }
  }
}
</style>
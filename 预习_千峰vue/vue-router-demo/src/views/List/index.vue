<template>
  <div class="home">
    <!-- 这是List页 -->
    <div class="show-list" v-if="list.length">
      <ul>
        <!-- 
          如何在跳转的同时携带数据
            1. 动态路径参数
            2. query传参
         -->
        <!-- 跳转到详情页时配置动态路径参数对应的数据 /detail/100 -->
        <!-- 自己拼接比较麻烦 -->
        <!-- <router-link :to="'/detail/' + item.goodsId" tag="li" v-for="item in list" :key="item.goodsId">
          <img :src="item.goodsImg" alt="">
          <p class="name">{{ item.goodsName }}</p>
          <p class="price">¥{{ item.goodsPrice }}</p>
        </router-link> -->

        <!-- 
            快捷传参
            可以通过给to绑定动态属性
              传递动态路径参数
            注意:
              1. 此时页面跳转必须通过name属性跳转 => path和params不能同时使用
              2. params传递数据时,属性名必须和动态路径的参数名保持一致
        -->
        <router-link :to="{ name: 'detail', params: { proid: item.goodsId } }" tag="li" v-for="item in list"
          :key="item.goodsId">
          <img :src="item.goodsImg" alt="">
          <p class="name">{{ item.goodsName }}</p>
          <p class="price">¥{{ item.goodsPrice }}</p>
        </router-link>

        <!-- 
          query传参
            在url的路由路径之后拼接数据,用 ? 分隔
         -->
        <!-- query传参: 字符串传参数 -->
        <!-- <router-link :to="'/detailcopy?proid=' + item.goodsId" tag="li" v-for="item in list" :key="item.goodsId">
          <img :src="item.goodsImg" alt="">
          <p class="name">{{ item.goodsName }}</p>
          <p class="price">¥{{ item.goodsPrice }}</p>
        </router-link> -->

        <!-- query传参: 对象传参 -->
        <!-- <router-link tag="li" :to="{ name: 'detailcopy', query: { proid: item.goodsId } }" v-for="item in list"
          :key="item.goodsId">
          <img :src="item.goodsImg" alt="">
          <p class="name">{{ item.goodsName }}</p>
          <p class="price">¥{{ item.goodsPrice }}</p>
        </router-link> -->
      </ul>
    </div>
  </div>
</template>

<script>

// 按需引入
// import axios from 'axios'
// axios.get
// axios.post
import { searchAllGoodsAPI } from '@/api/goods'


// 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名
export default {
  name: 'ListView',
  data() {
    return {
      list: []
    }
  },
  methods: {
    async searchAllGoods() {
      // searchAllGoodsAPI().then(res => {
      //   this.list = res.list
      // }).catch(err => {
      //   throw err
      // })
      try {
        var res = await searchAllGoodsAPI()
        this.list = res.list
      } catch (err) {
        console.log('请求有误', err);
      }
    }
  },

  mounted() {
    this.searchAllGoods()
  },

}
</script>

<style lang="scss" scoped>
.show-list {
  padding: 0.1rem;
  background-color: red;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      width: 48%;
      margin-bottom: 0.1rem;
      background-color: #fff;

      img {
        width: 80%;
        display: block;
        margin: 0 auto;
      }

      .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 0.36rem;
      }

      .price {
        color: red;
      }
    }
  }
}
</style>
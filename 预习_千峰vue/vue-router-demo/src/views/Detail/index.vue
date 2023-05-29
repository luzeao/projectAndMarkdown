<template>
  <div class="detail">
    <div>
      <template v-if="lgc">
        <a>欢迎,{{ lgc }}</a>
      </template>
      <template v-else>
        <router-link :to="{ name: 'login' }">去登录</router-link>
      </template>
    </div>
    <div class="goods-info" v-if="proinfo">
      <img class="img" :src="proinfo.goodsImg" alt="">

      <div class="name">{{ proinfo.goodsName }}</div>
      <div class="price">{{ proinfo.goodsPrice }}</div>
      <p>
        <button @click="addShoppingCar">加入购物车</button>
      </p>
    </div>
    <hr>
    <!-- 
      查看类似商品,都是跳转同一个路由页面,只是hash不一样 (当前组件会被复用)
        但是hash值改变不会触发视图更新 -> 导致数据虽然改变,但是视图并没有更新
        解决方法 => 虽然视图没变,但是导航中的数据变了 -> $route -> 可以监听$route数据是否发生改变
    -->
    <div class="more">
      <h3>查看类似商品</h3>
      <router-link to="/detail/100010022425">原笔记本</router-link> |
      <router-link to="/detail/100032149194">笔记本1</router-link> |
      <router-link to="/detail/100030588242">笔记本2</router-link>
    </div>

    <br>

    <router-link to="/list">返回商品列表</router-link>
  </div>
</template>

<script>

import { searchGoodsByGoodsIdAPI } from '@/api/goods'

// 如果不设置name 默认会把index.vue => index作为组件名(常用,可能会重复) => 需要自定义一个name => 大驼峰命名
export default {
  name: 'DetailView',
  data() {
    return {
      proid: null,
      proinfo: null,
      lgc: null,
      enterTime: null,
      leaveTime: null
    }
  },
  methods: {
    async searchGoodsByGoodsId() {
      try {
        var res = await searchGoodsByGoodsIdAPI({ gid: this.proid })
        console.log('数据请求成功', res);

        this.proinfo = res.data

      } catch (err) {
        console.log(err)
      }
    },
    // 获取登录昵称
    getLoginNick() {
      this.lgc = localStorage.getItem('lgc') || null
    },
    // 加入购物车
    addShoppingCar() {
      console.log('准备加入购物车')

      // 加入购物车之前先判断用户是否登录
      // 已经登录 -> 调用接口,加入购物车
      // 未登录 -> 跳转登录 -> 再返回
      if (this.lgc) {
        console.log('在这里加入');
      } else {
        // console.log('没登录跳转登录页');
        // this.$router.push('/login')
        console.log(this.$route.fullPath);
        this.$router.replace({ name: 'login', query: { ReturnUrl: this.$route.fullPath } })
      }
    }
  },
  watch: {
    // $route(newVal,oldVal) {
    //   console.log('1',newVal);
    //   console.log('2',oldVal);
    //   // 方法1: 直接刷新页面 -> 不好
    //   // 方法2: 监听到数据发生改变,将proid赋值为新的id,再重新请求
    //   this.proid = this.$route.params.proid;
    //   this.searchGoodsByGoodsId()
    // }
    // 准确监听
    // '$route.params.proid'(newVal, oldVal) {
    //   console.log('1', newVal);
    //   console.log('2', oldVal);
    //   // 方法1: 直接刷新页面 -> 不好
    //   // 方法2: 监听到数据发生改变,将proid赋值为新的id,再重新请求
    //   this.proid = this.$route.params.proid;
    //   this.searchGoodsByGoodsId()
    // }
  },
  mounted() {
    console.log('挂载完毕');
    // this.$route => 所有组件均可以访问 => 当前路由信息
    // this.$router => 所有组件均可以访问 => 所有路由组成的路由实例
    // console.log('route', this.$route);
    // console.log('router',this.$router);

    // 获取动态路径参数
    // console.log('动态参数路径', this.$route.params);
    // console.log('proid', this.$route.params.proid);
    this.proid = this.$route.params.proid;
    this.getLoginNick()
    this.searchGoodsByGoodsId()
  },
  beforeMount() {
    console.log('挂载之前');
  },
  /* 
    组件内路由守卫
      beforeRouteEnter => 页面进入之前被调用
        在路由跳转之后,组件创建前被调用(组件还未被创建 -> 也就没有初始化)
        注意: 此时无法访问this(当前实例)
        如果想在此阶段访问this,next可以接受一个回调函数作为参数,此函数会在组件从虚拟DOM渲染到真实DOM之后执行(此时可以通过形参访问当前实例)
        常用于埋点操作(页面驻留时间)
      beforeRouteUpdate
        在当前路由改变，但是该组件被复用时调用
        举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，

      beforeRouteLeave => 页面离开之前被调用
  */
  beforeRouteEnter(to, from, next) {  // 从其他页面跳到当前页
    console.log('beforeRouteEnter');
    console.log('from', from);
    console.log('to', to);
    console.log('this', this); // 此时无法访问this(当前实例)

    // next()
    // next可以接受一个回调函数作为参数,此函数会在组件从虚拟DOM渲染到真实DOM之后执行(此时可以通过形参访问当前实例)
    next((vm) => {
      console.log('回调执行了', vm);
      vm.enterTime = Date.now()
    })
  },

  async beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    console.log('beforeRouteUpdate', '路由改变,但是组件被复用');
    console.log('from', from);
    console.log('to', to);

    if (to.params.proid != from.params.proid) { // proid发生改变
      this.proid = to.params.proid;
      await this.searchGoodsByGoodsId()
      next()
    } else {
      next()
    }


  },

  beforeRouteLeave(to, from, next) {  // 从当前页跳到其他页面
    console.log('beforeRouteLeave');
    console.log('from', from);
    console.log('to', to);
    console.log('this', this);

    this.leaveTime = Date.now()
    if (this.leaveTime - this.enterTime >= 10000) {
      console.log('任务完成');
      next()
    } else {
      if (confirm('你的任务还没完成是否继续?')) {
        next(false)
      } else {
        next()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-info {
  font-size: 12px;
  padding: 0 0.2rem;

  .img {
    display: block;
    width: 80%;
    margin: auto;
  }

  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.36rem;
  }
}
</style>
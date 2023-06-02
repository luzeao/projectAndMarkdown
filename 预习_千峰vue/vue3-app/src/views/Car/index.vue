<template>
  <div class="car">

    <!-- 头部 -->
    <AppHeader to=".app-header" title="购物车">
      <template #left>

        <div @click="delAll">
          清除购物车
          <van-icon name="delete-o" />
        </div>
      </template>

      <template #right>
        <van-icon name="ellipsis" @click="showPopover = true" />
      </template>
    </AppHeader>
    <van-popover v-model:show="showPopover" :actions="actions" theme="dark" close-on-click-action :offset="[300, -10]"
      :show-arrow="false" @select="selectHandler"></van-popover>

    <!-- 购物车列表 -->
    <div class="car-list">
      <template v-if="isLogin && cartList.length != 0">
        <div class="car-list">

          <van-swipe-cell v-for="item in cartList" :key="item.cartid" class="list-item">
            <van-checkbox @change="changeHandler(item.cartid, $event)" v-model="item.flag"></van-checkbox>
            <van-card class="goods-card" :title="item.proname" :price="(item.originprice * item.discount) / 10"
              :thumb="item.img1">
              <template v-slot:num>
                <van-stepper v-model="item.num" theme="round" @change="addHandler(item.cartid, item.num)" button-size="22"
                  disable-input />
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delHandler(item.cartid)" />
            </template>
          </van-swipe-cell>
        </div>
      </template>


      <template v-else>
        <van-empty image="http://img2.3png.com/8264ae8fd7ffe7829afbdcd9c1c6b241ec16.png/w260" image-size="80"
          description="您的购物车已经空了哦">
          <template #default>
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="goHome">
              去逛逛
            </van-button>
          </template>
        </van-empty>
      </template>
      <van-submit-bar class="order" :price="allPrice" button-text="提交订单" @submit="submitHandler">
        <van-checkbox v-model="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>


  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'  // 头部组件
import { useUserStore } from '@/stores/user';  // pinia实例
import { showFailToast, showSuccessToast, showConfirmDialog, showToast } from 'vant';
import { useRouter } from 'vue-router';
import { delCartByIdAPI, clearCartAPI, updateCartOneCheckedStatusAPI, getCartListAPI, updateCartNumAPI } from '@/api/cart';
import { ref, watchEffect, computed } from 'vue';

const router = useRouter()
// 获取pinia的数据
const User = useUserStore()
const { isLogin, userid } = User
const cartList = ref<any>([]);
const showPopover = ref(false);

const actions = [
  { text: '首页' },
  { text: '订单' },
  { text: '个人中心' },
  { text: '搜索' },
];
// 点击菜单每一项的跳转
const selectHandler = (item: any, index: any) => {

  if (index == 0) {
    router.replace('/home')
  } else if (index == 1) {
    router.replace('/myorder')
  } else if (index == 2) {
    router.replace('/mine')
  } else if (index == 3) {
    router.replace('/search')
  }
}

// 获取商品列表
const getCartList = async () => {
  try {
    var res: any = await getCartListAPI({ userid })
    if (res.code == '200') {
      cartList.value = res.data

    } else if (res.code == 10020) {
      showFailToast('购物车暂时没有商品')
      cartList.value = []
    }
  } catch (err) {
    showFailToast('您的购物车空了哦')
  }
}

// 清除购物车数据
const delAll = async () => {
  if (cartList.value.length) {
    showConfirmDialog({
      title: '提示消息',
      message:
        '真的要清除你辛辛苦苦添加的购物车吗',
    }).then(async () => {
      let res = await clearCartAPI({
        userid
      })
      // console.log('删除购物车所有数据', res);
      cartList.value = []
    }).catch(() => {
      // on cancel
    });
  } else {
    showToast('您的购物车还没有商品哦')
  }

}

// 选中状态的计算属性
let checkAll = computed({
  get: function () {
    var flag = cartList.value.every((item: any) => item.flag);
    return cartList.value.length > 0 ? flag : false;
  },
  set: function (val) {
    cartList.value.forEach((item: any) => item.flag = val);
  }
})

// 所有价格
let allPrice = computed(() => {
  return cartList.value.reduce((prev: any, item: any) => {
    if (item.flag) {
      prev += (item.originprice * item.discount) / 10 * item.num;
    }
    return prev;
  }, 0).toFixed(2) * 100;
})

// 单选状态改变
let changeHandler = async (cartid: any, flag: any) => {
  // console.log(11111, flag);
  try {
    await updateCartOneCheckedStatusAPI({
      cartid,
      flag,
    });
    // console.log("状态更新成功", res);
  } catch (err: any) {
    showFailToast(err.message);
  }
}

// 点击加减的事件
const addHandler = async (cartid: any, num: any) => {
  // console.log("cartList.value", cartList.value)
  try {
    await updateCartNumAPI({
      cartid,
      num
    })
  } catch (err: any) {
    showFailToast(err.message);
  }
}

// 删除事件
const delHandler = async (cartid: any) => {
  try {
    await delCartByIdAPI({ cartid })
    // console.log('删除购物车数据', res);

    await getCartList()
    cartList.value = []
    showSuccessToast('删除成功')

  } catch (err: any) {
    showFailToast(err.message);
  }
}

// 点击去逛逛按钮
const goHome = () => {
  router.replace('/home')
}

// 提交事件
let submitHandler = async () => {
  var num = cartList.value.filter((item: any) => item.flag).length; // 找到选中的商品数量
  if (num > 0) {
    try {
      router.push('/order')
    } catch (err: any) {
      showFailToast(err.message);
    }
  } else {
    showFailToast("您还未选中任何商品!")
  }


}

watchEffect(() => {
  getCartList()

})
</script>

<style lang="scss" scoped>
.login-tips {
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    margin-left: 0.1rem;
  }
}

.list-item {
  :deep(.van-swipe-cell__wrapper) {
    display: flex;
  }

  :deep(.van-button--danger) {
    height: 100%;
  }

  .goods-card {
    flex: 1;
  }

}
</style>
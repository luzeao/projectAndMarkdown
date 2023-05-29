<template>
  <div class="AppHeader">

    <!-- 将当前页面中的navbar传到 .app-header 内
      <van-nav-bar title="主页" left-text="xxx" right-text="按钮">

      </van-nav-bar>
    -->
    <teleport :to='to'>
      <van-nav-bar 
        :class="$attrs.class"
        :border="border" 
        :fixed="fixed" 
        :z-index="zIndex" 
        :safe-area-inset-top="safeAreaInsetTop"
        :title="title" 
        :left-text="leftText" 
        :right-text="rightText" 
        :left-arrow="leftArrow"
        :placeholder="placeholder"
        @click-left="leftClickHandler"
        @click-right="rightClick"
      >

        <!-- AppHeader name=left 插槽中的内容接收 => 传入给navbar -->
        <!-- 如果appheader的父组件给appheader传递插槽内容,appheader将会对应的内容传递给navbar -->
        <!-- 如果appheader的父组件没有给appheader传递插槽内容,appheader将不会传递内容给navbar -->
        <!-- 如何知道appheader的各个命名插槽中是否接收内容?? this.$slots => 当前组件对应插槽名称,接收的插槽内容 -->
        <template v-if="$slots.left" #left>
          <slot name="left"></slot>
        </template>

        <template v-if="$slots.title" #title>
          <slot name="title"></slot>
        </template>

        <template v-if="$slots.right" #right>
          <slot name="right"></slot>
        </template>

      </van-nav-bar>
    </teleport>

  </div>
</template>

<script lang="ts">

// 选项式 => 好写
// 在teleport van-nav-bar 的基础上进行二次封装 => AppHeader
// AppHeader => 想要有tp功能 => to参数,给teleport
// AppHeader => 想要 navbar 的 title left-text left-arrow @click-left @click-right=> 全都要

import { Teleport } from 'vue';
import { NavBar } from 'vant'

export default {
  name: 'AppHeader',
  inheritAttrs:false,
  props: {
    ...NavBar.props,  // AppHeader 需要接受的数据和 NavBar保持一致

    to: { //teleport需要的参数
      type: String
    },

    // @click-left @click-right  => 接收的函数,绑定给点击事件
    leftClick: {
      type: Function
    },

    rightClick: {
      type: Function
    },
    back: {  // 是否点击左边按钮回退
      type: Boolean,
      default: false
    }
  },
  methods: {
    leftClickHandler(e:any){
      if(this.back){
        this.$router.back()
      }
      if(this.leftClick){
        this.leftClick(e)
      }
    }
  },
}



</script>

<style lang="scss" scoped>
</style>
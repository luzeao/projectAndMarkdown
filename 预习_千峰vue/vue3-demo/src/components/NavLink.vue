<template>
  <!-- 普通在线地址 -->
  <a v-if="isExternalLink" :href="to" v-bind="$attrs">
    <!-- 此slot接收组件使用时,标签对中间的内容 -->
    <slot></slot>
  </a>

  <!-- 导航跳转 -->
  <router-link v-else custom :to="to" :replace="replace" v-slot="{ href, navigate, isActive }">
    <span @click="navigate" :class="isActive ? activeClass : inactiveClass">

      <slot></slot>
    </span>
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
console.log(111111111111111111111111, RouterLink);


// 组合式中接收props的方法
// defineProps(['a','b','c']) 数组写法 => 对应属性名接收,要一个一个写
var props = defineProps({  // 对象写法
  ...(RouterLink.props),
  inactiveClass: String,
})

// 组合式接收事件方法
// defineEmits(['update:value'])

const { to, replace, activeClass, inactiveClass } = props
// console.log(to, replace, activeClass, inactiveClass);

// 判断是否是在线地址 https://www.baidu.com
const isExternalLink = computed(
  () => typeof props.to === 'string' && props.to.startsWith('http')
)
</script>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>
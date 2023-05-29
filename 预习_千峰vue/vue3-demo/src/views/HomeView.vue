<template>
  <div>{{ count }}</div>
  <div>{{ doubleCount }}</div>
  <div><button @click="addCount">count++</button></div>

  <HelloWorld></HelloWorld>
</template>


<!-- <script>

// 不添加setup,默认采用选项式写法

export default {
  name: 'HomeView',
  data() {
    return {
      count: 1
    }
  },

  methods: {
    addCount() {
      this.count++
    }
  },

  computed: {
    doubleCount() {
      return this.count * 2
    }
  },

  watch: {
    count(newVal, oldVal) {
      console.log('监听count改变',newVal, oldVal);
    }
  },

  mounted() {
    console.log('组件已经挂载完毕');
  },
}

</script> -->

<!-- <script>

// 组合式写法

import { ref, computed } from 'vue' // npm中引入的vue
export default {

  name: 'HomeView',


  setup() {

    let count = ref(10)
    console.log(count);
    let addCount = () => {
      count.value++  // 在组合式中修改数据要通过ref对象的 .value 语法
    }

    let doubleCount = computed(() => {
      return count.value * 2
    })

    // 原理 -> 闭包
    return {
      count: count,
      addCount: addCount,
      doubleCount
    }
  }

}

</script> -->

<script setup>
// 这个脚本块将被预处理为组件的 setup() 函数，这意味着它将为每一个组件实例都执行。<script setup> 中的顶层绑定都将自动暴露给模板
// 1. 将脚本预处理为setup函数,
// 2. 定义数据 方法 计算属性 (watch监听 生命周期钩子函数 => 不暴露,直接执行) => 自动暴露给模板
// 3. 被引入的组件默认会作为局部组件使用

// 引入组合式相关方法
import { ref, computed, onMounted } from 'vue' // npm中引入的vue

import HelloWorld from '../components/HelloWorld.vue';  // 被引入的组件默认会作为局部组件使用


// 定义数据 方法 计算属性 监听 生命周期钩子函数
let count = ref(10)

// 方法
let addCount = () => {
  count.value++
}

// 计算属性
let doubleCount = computed(() => {
  return count.value * 2
})

// 生命周期钩子函数
onMounted(() => {
  console.log('组件挂载完毕');
})



</script>
<template>
  <div>
    <h2>pinia better demo</h2>
    <div>
      <p>a:{{ a }}---doubleA:{{ doubleA }}</p>
      <p>b:{{ b }}---doubleB:{{ doubleB }}</p>
      <p>doubleBoth:{{ doubleBoth }}</p>
    </div>
    <div>
      <!-- 计算属性默认只有取值没有赋值 -->
      <!-- <button @click="a++">a++</button> -->
      <!-- <button @click="addA">a++</button>
      <button @click="addB">b++</button> -->
    </div>
    <div>
      <!-- <button @click="demo.a++">a++ {{ demo.a }}</button> -->
      <button @click="a++">a++直接加</button>
      <button @click="b++">b++直接加</button>
      <button @click="addA">a++方法加</button>
      <button @click="addB">b++方法加</button>
      <!-- 组合式无法使用$reset方法 -->
      <!-- <button @click="demo.$reset()">重置所有数据</button> -->
    </div>
  </div>
</template>

<script>

// 选项式 => 借助辅助函数
import { useDemoStore } from '../stores/demo.js';
import { mapState, mapActions, mapWritableState } from 'pinia';

export default {
  data() {
    return {}
  },
  computed: {
    // 通过辅助函数处理
    // 计算属性默认只有取值没有赋值 => 有局限性
    // ...mapState(useDemoStore, ['a', 'b', 'doubleA', 'doubleB', 'both', 'doubleBoth'])
    // ...mapState(useDemoStore, ['b', 'doubleA', 'doubleB', 'both', 'doubleBoth']),
    // ...mapState(useDemoStore, {
    //   a: state => state.a
    // }),
    /* 
      处理完毕之后就相当于
      最终还是处理为计算属性 => 且计算属性store中的数据也是相互影响的
      a(){
        return useDemoStore().a
      }
    */

    // mapWritableState 处理useDemoStore可以让计算属性的数据保持响应性(既可以取值也可以赋值)
    ...mapWritableState(useDemoStore, ['a', 'b', 'doubleA', 'doubleB', 'both', 'doubleBoth'])
  },
  methods: {
    ...mapActions(useDemoStore, ['addA', 'addB'])
  },
}
</script>

<!-- <script setup>

import { storeToRefs } from 'pinia';  // pinia自带的方法,同toRefs
import { toRefs } from 'vue';

// 组合式
// 引入创建的pinia模块
import { useDemoStore } from '../stores/demo.js'
import { useCounterStore } from '../stores/counter.js'

// 可以在组件中的任意位置访问 `demo` 变量
// demo是一个store实例
const demo = useDemoStore()
const Counter = useCounterStore()
console.log('Counter', Counter);

// 对demo实例进行解构 => demo是一个proxy对象(响应式的) => 相当于let a = 1 => 直接对proxy响应对象解构,会使数据丧失响应性
// var { a, b, doubleA, doubleB, doubleBoth } = demo

// storeToRefs => pinia的方法 => 等价于将响应对象上的每一个属性都转化为ref对象(计算属性),ref对象和源对象相互影响(保证响应性)
// let { a, b, doubleA, doubleB, doubleBoth } = toRefs(demo)  // 可以直接使用toRefs方法
let { a, b, doubleA, doubleB, doubleBoth } = storeToRefs(demo)  // 或者使用pinia提供的storeToRefs方法

// 方法直接解构取值就行
let { addA, addB } = demo


</script> -->

<style lang="scss" scoped></style>
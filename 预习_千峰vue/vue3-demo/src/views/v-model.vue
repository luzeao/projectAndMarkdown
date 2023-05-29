<template>
  <main>
    <!-- <TheWelcome /> -->
    <p>{{ a }}</p>
    <p><button @click="a++">a++</button></p>
    <CompA v-model:a="a" b="2" c="3">
      <p>
        <slot>111</slot>
      </p>
    </CompA>
  </main>
</template>


<script setup>
/* 
  1. 每个 *.vue 文件最多可以包含一个 <script setup>。(不包括一般的 <script>)

  2. 这个脚本块将被预处理为组件的 setup() 函数，这意味着它将为每一个组件实例都执行。<script setup> 中的顶层绑定都将自动暴露给模板

  3. 脚本中外层生命的变量 会作为 setup函数的返回值 (顶层的绑定会被暴露给模板)

  4. 引入的.vue文件 会对应变量名自动注册为当前页面(组件)的子组件

*/

// import TheWelcome from '../components/TheWelcome.vue'

import { ref } from "vue";
import CompA from "../components/CompA.vue";
let a = ref(10);

</script>

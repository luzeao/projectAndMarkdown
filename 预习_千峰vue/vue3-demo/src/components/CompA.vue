<template>
  <div>
    <div>
      <p>这是组件A:{{ a }}</p>
      <p><button @click="$emit('update:a', a + 1)">a++</button></p>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { useAttrs, useSlots } from 'vue';

// 组合式
// 接收的数据
defineProps(["a"]);
// 接收的方法
defineEmits(["update:a"]);
// 定义组件的接收配置
// defineOptions({
//   // 禁止透传
//   inheritAttrs:false
// })

// 获取透传的数据
// 方法1
// let app = getCurrentInstance()
// console.log(app.attrs);

// 方法2
// 透传的数据
const attrs = useAttrs()
console.log('attrs', attrs);

const slots = useSlots()  // 使用插槽 => 父组件给子组件传入的插槽内容
console.log('slots', slots);

  // 选项式
/* export default {
   props: ["a"],
   emits: ["update:a"],
   setup(props) { // props => 父组件传入子组件的数据,如果被子组件接收可以通过props属性访问
       console.log("props", props);
       console.log("props", props.a);

       // defineProps(["a"])
       // defineEmits(["update:a"])

       // 没有被子组件接收的数据  1. 会透传到组件的根元素 2.组件实例上有attrs属性用于存储

   },
   template: `<div>
       <p>这是组件A:{{a}}</p>
       <p><button @click="$emit('update:a',a + 1)">a++</button></p>
   </div>`,
     mounted() {
       console.log("选项式","mounted",this);
   },
} */
</script>

<style lang="scss" scoped></style>
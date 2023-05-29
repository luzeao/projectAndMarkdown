<template>
	<div>
		<h2>piniaDemo</h2>
		<p>a:{{ demo.a }}</p>
		<p>b:{{ demo.b }}</p>
		<p>doubleA:{{ demo.doubleA }}</p>
		<p>doubleB:{{ demo.doubleB }}</p>
		<p>doubleBoth:{{ demo.doubleBoth }}</p>
		<button @click="demo.addA(10)">addA</button>
		<button @click="demo.addB">addB</button>
		<button @click="demo.addBoth">addBoth</button>
		<br>
		<button @click="demo.addA_async">addA_async</button>
		<button @click="demo.addB_async">addB_async</button>
		<button @click="demo.addBoth_async">addBoth_async</button>
		<br>
		<p>

			<!-- 
				!!!! 选项式可以直接使用demo.$reset()方法来重置所有数据
				!!!! 组合式中不能直接调用 $reset方法
			 -->
			<!-- <button @click="demo.$reset()">重置</button> -->

			<button @click="() => {
				// 一条一条的修改比较麻烦
				demo.a = 10; demo.b = 20
			}">修改a,b</button>

			<button @click="() => {
				// demo = { a: 10, b: 20 } // 对store实例赋值 => 不允许

				// $patch方法 => 可以直接接受收一个对象,遍历,对应键名修改state数据
				demo.$patch({ a: 10, b: 20 })
			}">修改a,b简易版</button>
		</p>

	</div>
</template>

<!-- <script>
// 选项式语法,需要先把引入的模块挂载到实例上才可以使用
import { useDemoStore } from '../stores/demo.js';
export default {
	data() {
		return {
			demo: demo
		}
	}
}
</script> -->


<script setup>

// 引入创建的pinia模块
import { useDemoStore } from '../stores/demo.js'
import { getCurrentInstance } from 'vue';
console.log('getCurrentInstance1111111', getCurrentInstance());
// 可以在组件中的任意位置访问 `demo` 变量
const demo = useDemoStore()

console.log('demo', demo);

// var res = demo.addA()
// console.log('res',res)


</script>

<style lang="scss" scoped></style>
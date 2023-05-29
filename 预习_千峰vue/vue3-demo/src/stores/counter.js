import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'


// pinia组合式 
// 1. defineStore('counter',callback)  要求第二参数传入回调函数(setup函数) => 回调函数的返回值,就是store实例中存储的数据
// 2. 定义数据的方法同vue3  ref  shallowRef  reactive  shallowReactive  readonly  shallowReadonly  computed 


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const zhang = reactive({
    name:'张三',
    age:18
  })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

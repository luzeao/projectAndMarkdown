
// pinia定义公共状态和方法
// 组合式

import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'

export const useDemoStore = defineStore('demo', () => {
  let a = ref(1)
  let b = ref(2)

  let doubleA = computed(() => {
    return a.value * 2
  })

  let doubleB = computed(() => {
    return b.value * 2
  })

  let doubleBoth = computed(() => {
    return doubleB.value + doubleA.value
  })

  let addA = () => {
    a.value++
  }

  let addB = () => {
    b.value++
  }

  let addBoth = () => {
    addA()
    addB()
  }
  let addA_async = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        a.value++
        resolve()
      }, 1000)
    })
  }

  let addB_async = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        b.value++
        resolve()
      }, 2000)
    })
  }

  let addBoth_async = async () => {
    await addA_async()
    // console.log(1111);
    await addB_async()
    // console.log(2222);
  }


  return {
    a,
    b,
    doubleA,
    doubleB,
    doubleBoth,
    addA,
    addB,
    addBoth,
    addA_async,
    addB_async,
    addBoth_async,
  }
})
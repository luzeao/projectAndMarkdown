
// pinia定义公共状态和方法
// 选项式

import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', {
  state() {
    return {
      a: 1,
      b: 2
    }
  },
  getters: {
    doubleA() {
      return this.a * 2
    },
    doubleB() {
      return this.b * 2
    },
    doubleBoth() {
      return this.doubleA + this.doubleB
    }
  },
  actions: {
    async addA(payload) {
      // console.log('payload', payload);
      this.a++
    },
    addB() {
      this.b++
    },
    addBoth() {
      this.addA()
      this.addB()
    },
    addA_async() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.a++
          resolve()
        }, 1000)
      })
    },
    addB_async() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.b++
          resolve()
        }, 2000)
      })
    },
    async addBoth_async() {
      await this.addA_async()
      // console.log(1111);
      await this.addB_async()
      // console.log(2222);
    }
  }
})
<template>
  <div class="home">
    <h2>Vuex尝试</h2>
    <div>
      a:
      <p>{{ a }}</p>
      <p>{{ doubleA }}</p>
      <p>{{ tripleA }}</p>
    </div>
    <div>
      <!-- 在vuex中想要调用mutations中的方法,需要使用commit对应方法名字调用 -->
      调用:
      <button @click="addA()">a++</button>
      <button @click="reduceA()">a--</button>
      <button @click="updateA(10)">更新a</button>

    </div>
    <div>
      异步调用
      <button @click="addA_Async">异步a++</button>
      <button @click="test">test方法</button>
    </div>
    <hr>
    <div>
      b:
      <p>{{ b }}</p>
      <p>{{ doubleB }}</p>
      <p>{{ tripleB }}</p>
    </div>
    <div>
      <!-- 在vuex中想要调用mutations中的方法,需要使用commit对应方法名字调用 -->
      调用:
      <button @click="addB()">b++</button>
      <button @click="reduceB()">b--</button>
      <button @click="updateB(10)">更新b</button>

    </div>
    <div>
      求和
      <p>AB之和{{ both }}</p>
      <p>2倍的AB之和{{ doubleBoth }}</p>
    </div>
    <div>
      <button @click="addBoth({ a: 1, b: 2 })">addBoth</button>
      <button @click="addBoth_Async({ a: 1, b: 2 })">addBoth_Async</button>
      <button @click="addBoth_Async_Pro({ a: 1, b: 2 })">addBoth_Async_Pro</button>
    </div>
  </div>
</template>

<script>

/* 
  $store => Vue中的全局属性 => Vue.component.$store => Vue下的所有应用都可以通过$store访问
  state     公共状态(数据)     this.$store.state.xxx
  getters   公共状态(计算属性)  this.$store.getters.xxx
  mutations 公共方法(同步)     this.$store.commit('xxx',arg)
  actions   公共方法(异步)     this.$store.dispatch('actions名称',arg)

  在template中取值过于麻烦 => 有没有什么方法可以优化一下,让template中取值更加方便
    1. 对于 state 和 getters 这些属性 取值麻烦 => 可以依赖于vue实例中的计算属性做二次处理
    2. 对于mutations 和 actions 这些方法 调用麻烦 => 可以依赖于vue实例中的methods做二次处理
*/


// 把Store实例注入到vue根实例中 -> vue下的所有应用都可以通过$store访问
export default {
  name: 'HomeView',
  data() {
    return {
      isLogin: true
    }
  },
  computed: {
    // 计算属性a => this.a => 依赖于this.$store.state.a (Vuex中的公共数据变化之后 计算属性同步更新)
    // 计算属性doubleA => this.doubleA => 依赖于this.$store.getters.doubleA (Vuex中的公共数据变化之后 计算属性同步更新)
    // state
    a() {
      return this.$store.state.a
    },
    b() {
      return this.$store.state.b
    },

    // getters
    doubleA() {
      return this.$store.getters.doubleA
    },
    tripleA() {
      return this.$store.getters.tripleA
    },
    doubleB() {
      return this.$store.getters.doubleB
    },
    tripleB() {
      return this.$store.getters.tripleB
    },
    both() {
      return this.$store.getters.both
    },
    doubleBoth() {
      return this.$store.getters.doubleBoth
    }

  },
  methods: {
    // mutations中的方法
    addA(params) {
      this.$store.commit('addA', params)
    },
    reduceA(params) {
      this.$store.commit('reduceA', params)
    },
    updateA(params) {
      this.$store.commit('updateA', params)
    },
    addB(params) {
      this.$store.commit('addB', params)
    },
    reduceB(params) {
      this.$store.commit('reduceB', params)
    },
    updateB(params) {
      this.$store.commit('updateB', params)
    },
    // actions中的方法
    addA_Async(params) {
      this.$store.dispatch('addA_Async', params)
    },
    addA_Async_Pro(params) {
      this.$store.dispatch('addA_Async_Pro', params)
    },
    addB_Async(params) {
      this.$store.dispatch('addB_Async', params)
    },
    addB_Async_Pro(params) {
      this.$store.dispatch('addB_Async_Pro', params)
    },
    addBoth(params) {
      this.$store.dispatch('addBoth', params)
    },
    addBoth_Async(params) {
      this.$store.dispatch('addBoth_Async', params)
    },
    addBoth_Async_Pro(params) {
      this.$store.dispatch('addBoth_Async_Pro', params)
    },

    async test() {
      // // dispatch('actionsName',arg) => 适用于传递单个参数(多参数传参也可以,自己传入一个对象)
      // this.$store.dispatch('addA_Async',10) // arg = 10
      // this.$store.dispatch('addA_Async',{
      //   a:10,
      //   b:20
      // })
      // // dispatch(options ={type,arg})传入一个对象 => 适用于传递多个参数 -> 传对象 => 适用于传递多个参数 -> 传对象
      // // type:触发actions的方法名
      // // 把整个对象作为arg传入
      // this.$store.dispatch({ // arg => {params:10}
      //   type:'addA_Async',
      //   params:10
      // })
      // var res = this.$store.dispatch('addA_Async',10)
      // console.log('actions方法的返回值',res)

      // this.$store.dispatch('addA_Async_Pro', 10).then(() => {
      //   alert('新增完毕')
      // })

      // async和await写法
      try {
        await this.$store.dispatch('addA_Async_Pro', 10)
        alert('新增完毕')
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    console.log('当前实例', this);
    console.log('当前实例下的store实例', this.$store);
  },
}
</script>
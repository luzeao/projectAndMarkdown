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


*/

import { mapState, mapGetters,mapMutations,mapActions } from 'vuex'

// mapState() => 可以同时映射多个state数据,存放在对象中
// console.log('mapState的执行结果', mapState(['a', 'b']));
// console.log('mapState的执行结果', mapState({ a:'a', b:'b' }));

// 把Store实例注入到vue根实例中 -> vue下的所有应用都可以通过$store访问
export default {
  name: 'HelperView',
  data() {
    return {
      isLogin: true
    }
  },
  computed: {
    // 计算属性a => this.a => 依赖于this.$store.state.a (Vuex中的公共数据变化之后 计算属性同步更新)
    // 计算属性doubleA => this.doubleA => 依赖于this.$store.getters.doubleA (Vuex中的公共数据变化之后 计算属性同步更新)

    // ... 将mapState()的返回值 => 对象 => 展开放到计算属性中
    // ...mapState(['a','b']),  // 传入数组,计算属性的名字和vuex属性名保持一致
    ...mapState({// 传入对象
      // 同上面的的手搓版
      // a: (state) => state.a,    // 计算属性名称叫 a 和 this.$store.state.a进行绑定
      // b: (state) => state.b,    // 计算属性名称叫 b 和 this.$store.state.b进行绑定
      // A: (state) => state.a,    // 计算属性名称叫 A 和 this.$store.state.a进行绑定
      // B: (state) => state.b     // 计算属性名称叫 B 和 this.$store.state.b进行绑定
      // 简单写法
      a: 'a',
      b: 'b',
      A: 'a',
      B: 'b'
    }),

    // getters
    ...mapGetters(['doubleA','tripleA','doubleB','tripleB','both','doubleBoth']),

  },
  methods: {

    // mutations中的方法
    ...mapMutations(['addA','reduceA','updateA','addB','reduceB','updateB']),

    // actions中的方法
    ...mapActions(['addA_Async','addA_Async_Pro','addB_Async','addB_Async_Pro','addBoth','addBoth_Async','addBoth_Async_Pro']),

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
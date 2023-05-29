<template>
  <div class="home">
    <h2>Vuex尝试</h2>
    <div>
      a:
      <p>{{ $store.state.a }}</p>
      <p>{{ $store.getters.doubleA }}</p>
      <p>{{ $store.getters.tripleA }}</p>
    </div>
    <div>
      <!-- 在vuex中想要调用mutations中的方法,需要使用commit对应方法名字调用 -->
      调用:
      <button @click="$store.commit('addA')">a++</button>
      <button @click="$store.commit('reduceA')">a--</button>
      <button @click="$store.commit('updateA', 10)">更新a</button>

    </div>
    <div>
      异步调用
      <button @click="$store.dispatch('addA_Async', 10)">异步a++</button>
      <button @click="test">test方法</button>
    </div>

    <hr>
    <div>
      b:
      <p>{{ $store.state.b }}</p>
      <p>{{ $store.getters.doubleB }}</p>
      <p>{{ $store.getters.tripleB }}</p>
    </div>
    <hr>
    <div>
      求和
      <p>AB之和{{ $store.getters.both }}</p>
      <p>2倍的AB之和{{ $store.getters.doubleBoth }}</p>
    </div>
    <div>
      <button @click="$store.dispatch('addBoth', { a: 10, b: 20 })">addBoth</button>
      <button @click="$store.dispatch('addBoth_Async', { a: 10, b: 20 })">addBoth</button>
      <button @click="$store.dispatch('addBoth_Async_Pro', { a: 10, b: 20 })">addBoth</button>
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

  commit和dispatch的两种提交数据的风格
  dispatch('actionsName',arg) => 适用于传递单个参数(多参数传参也可以,自己传入一个对象)
  this.$store.dispatch('addA_Async',10) // arg = 10
  this.$store.dispatch('addA_Async',{
    a:10,
    b:20
  })
  dispatch调用时传入一个对象写法 => 适用于传递多个参数 -> 传对象
  type:触发actions的方法名
  把整个对象作为arg传入
    this.$store.dispatch({ // arg => {params:10}
      type:'addA_Async',
      params:10
    })
*/

// 把Store实例注入到vue根实例中 -> vue下的所有应用都可以通过$store访问
export default {
  name: 'HomeView',
  data() {
    return {
      isLogin:true
    }
  },
  methods: {
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
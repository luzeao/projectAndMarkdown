## 1. 什么是Vuex
### 1-1 vuex初识
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
- new Vuex.Store({})
  - state:{}
    + 公共数据
  - getters:{}
    + state的计算属性(依赖于state)
  - mutations:{}
    + 用来存放修改数据的方法(只支持同步方法)
  - actions:{}
    + 异步操作方法 => 不建议直接修改state => 通过mutations中的方法改(等异步操作结束后,再调用修改数据的方法)
  - modules:{}
    + 全部数据混淆到一起不好管理,可以按功能分类
![](./md-img/vuex%E7%AE%80%E5%8D%95%E4%BB%8B%E7%BB%8D.jpg)


### 1-2 vuex初识
- 可以通过 store.state 来获取状态对象，以及通过 store.commit 方法对应方法名触发状态变更
```html
<div>
  <!-- 在vuex中想要调用mutations中的方法,需要使用commit对应方法名字调用 -->
  <button @click="$store.commit('addA')">a++</button>
  <button @click="$store.commit('reduceA')">a--</button>
  <button @click="$store.commit('updateA',10)">更新a</button>
</div>
<script>
new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  getters: {
    // state 形参 => 可以通过state获取state对象中的数据
    doubleA: function (state) {
      return state.a * 2
    },
    tripleA: function (state) {
      return state.a * 3
    },
  },
  mutations: {
    // state 形参 => 可以通过state获取state对象中的数据
    // payload 载荷 => 在组件中调用方法时可以传递一些数据
    // 如何调用 => commit('updateA',10)
    addA: function (state) {
      state.a++
    },
    reduceA: function (state) {
      state.a--
    },
    updateA: function (state, payload) {
      state.a = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
</script>
```


## 2. commit和actions的两种传参风格
- $store => Vue中的全局属性 => Vue.component.$store => Vue下的所有应用都可以通过$store访问
- state     公共状态(数据)     this.$store.state.xxx
- getters   公共状态(计算属性)  this.$store.getters.xxx
- mutations 公共方法(同步)     this.$store.commit('xxx',arg)
- actions   公共方法(一般用来做异步)     this.$store.dispatch('actions名称',arg)
- dispatch('actionsName',arg) => 适用于传递单个参数(多参数传参也可以自己传入一个对象)
```js
export default {
  name: 'HomeView',
  methods: {
    test() {
      // dispatch('actionsName',arg) => 适用于传递单个参数(多参数传参也可以,自己传入一个对象)
      this.$store.dispatch('addA_Async',10) // arg = 10
      this.$store.dispatch('addA_Async',{
        a:10,
        b:20
      })
      // dispatch(options ={type,arg})传入一个对象 => 适用于传递多个参数 -> 传对象
      // type:触发actions的方法名
      // 把整个对象作为arg传入
      this.$store.dispatch({ // arg => {params:10}
        type:'addA_Async',
        params:10
      })
    }
  },
}
```


## 3. actions中异步方法改写promise的方法
- 简单写法 => 只知道启动异步操作 => 在异步操作结束之后再调用mutations中的方法修改数据(无法知道异步操作什么时候结束)
```js
new Vuex.Store({
  actions: {
    // actions用于存放异步操作 -> 在异步操作结束之后再调用mutations中的方法修改数据
    // context => 和store实例有相同属性和方法的新对象(和store不全等)
    // payload => actions中的方法被调用时,也可以接收参数
    // 简单写法 => 只知道启动异步操作 => 在异步操作结束之后再调用mutations中的方法修改数据(无法知道异步操作什么时候结束)
    addA_Async(context, payload) {
      console.log("context",context);
      console.log("payload",payload);
      // context => {state,getters,commit,dispatch}
      var { commit } = context
      setTimeout(() => {
        commit('addA',payload)
      }, 1000)
      return 1
    }
  }
})

this.$store.dispatch('addA_Async',10)
```
- promise写法 => 返回一个promise实例(pendding) => 在异步操作结束之后,再调用mutations中的方法修改数据(将promise的实例的状态改为fulfilled)
```js
addA_Async_Pro(context, payload) {
  return new Promise((resolve) => {
    console.log("context", context);
    console.log("payload", payload);
    var { commit } = context
    setTimeout(() => {
      commit('addA', payload)
      resolve(true)
    }, 1000)
  })
}

this.$store.dispatch('addA_Async_Pro', 10).then(() => {
  alert('新增完毕')
})
```


## 4. vuex中的getters,mutations,actions的复用
### 4-1 getters复用
- getters(计算属性)中的属性复用
- 定义一个需要复用的方法 -> 传入第二参数getters
- state 形参 => 可以通过state获取state对象中的数据
- getters 形参 => 可以通过getters获取getters对象中的数据 => 可以复用计算属性
```js
// doubleBoth => doubleA + doubleB(计算属性)
doubleBoth(state, getters) {
  // return state.a * 2 + state.b * 2 => 比较low => 没有复用doubleA和B
  return getters.doubleA + getters.doubleB
}
```


### 4-2 mutations复用
- mutations中的方法中不能直接使用另一个方法 => 要在actions中实现
```js
addBoth(context, payload) {
  console.log('参数', payload);
  var { commit } = context
  commit('addA', payload.a)
  commit('addB', payload.b)
},
```


### 4-3 actions复用
- 直接在自己内部复用自己
- 只是调用方法的关键词要改成 dispatch
```js
//actions中复用actions中的多个方法 
addBoth_Async(context, payload) {
  console.log('参数', payload);
  var { dispatch } = context
  dispatch('addA_Async', payload.a)
  dispatch('addB_Async', payload.b)
},

//actions中复用actions中的多个方法 promise版本
async addBoth_Async_Pro(context, payload) {
  console.log('参数', payload);
  var { dispatch } = context
  await dispatch('addA_Async_Pro', payload.a)
  await dispatch('addB_Async_Pro', payload.b)
  alert('a和b更新完毕')
}
```


## 5. 简化版本1 
- 在template中取值过于麻烦 => 有没有什么方法可以优化一下,让template中取值更加方便
  - 1. 对于 state 和 getters 这些属性 取值麻烦 => 可以依赖于vue实例中的计算属性做二次处理
  - 2. 对于mutations 和 actions 这些方法 调用麻烦 => 可以依赖于vue实例中的methods做二次处理


## 5. vuex的辅助函数
- 可以直接使用import映射在当前组件
```js
import { mapState, mapGetters,mapMutations,mapActions } from 'vuex'
```
  - 然后使用...运算符解构对象
  - 如果需要改名字就传入一个对象,键名就是需要更改的名字
  - 键值就是对应映射的数据或者方法
  - 可以同时映射多个数据或者方法,存放在对象中
```js
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
    ...mapState({a: 'a',b: 'b',A: 'a',B: 'b'}),

    // getters
    ...mapGetters(['doubleA','tripleA','doubleB','tripleB','both','doubleBoth']),

  },
  methods: {

    // mutations中的方法
    ...mapMutations(['addA','reduceA','updateA','addB','reduceB','updateB']),

    // actions中的方法
    ...mapActions(['addA_Async','addA_Async_Pro','addB_Async','addB_Async_Pro','addBoth','addBoth_Async','addBoth_Async_Pro']),

    async test() {
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
```


## 6. module模块划分
### 6-1 module模块划分-默认
- 默认情况下,子模块中的state中的数据会对应模块名称,挂载到父模块(store)的state属性中中
- getters,mutations,actions中的属性和方法会挂载到根store(取值直接从根store中取即可 -> 缺点:getters,mutations,actions全都挂载在根store,依存关系不明显)
![](./md-img/%E6%9C%AA%E6%B7%BB%E5%8A%A0namespaced%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A8%A1%E5%9D%97.png)
```html
<div>
  <h2>模块测试(namespaced:false)</h2>

  <p>user:{{ $store.state.mdA.user }}</p>
  <p>token:{{ $store.state.mdA.token }}</p>
  <p>isLogin:{{ $store.getters.isLogin }}</p>
  <p>
    <button @click="$store.commit('updateInfo',{user:'c321321'})">更新用户</button>
  </p>
  <p>
    <button @click="$store.dispatch('loginAndUpdateInfo')">模拟登陆</button>
  </p>

</div>
```


### 6-2 module模块划分-命名空间
![](./md-img/%E6%B7%BB%E5%8A%A0namespaced%E5%B1%9E%E6%80%A7.png)
- 是否设置命名空间(默认为false 如果设置为true  state,getters,mutations,actions都会对应模块名称挂载到根store)
  - 模块划分的比较精准 -> 取值比较麻烦
- 该模块的子模块中也可以添加namespaced:true
```html
<p>user:{{ user }}</p>
<p>token:{{ token }}</p>
<p>a1和b1:{{ a1 }}----{{ b1 }}</p>
<p>isLogin:{{ isLogin }}</p>
<p>
  <button @click="updateInfo({ user: 'c321321' })">更新用户</button>
</p>
<p>
  <button @click="loginAndUpdateInfo">模拟登陆</button>
</p>
```
```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    // ...mapState({
    //   user:(state)=>state.mdB.user,  // 从根store的state开始取值
    //   token:(state)=>state.mdB.token
    // })
    ...mapState('mdB', ['user', 'token']), // 直接从根store的state下的mdB开始取值
    ...mapState('mdB/mdB_1', ['a1', 'b1']), // 直接从根store的state下的mdB内的mdB_1开始取值
    ...mapGetters('mdB', ['isLogin']), // 直接从根store的state下的mdB内开始取值
  },
  methods: {
    ...mapMutations('mdB', ['updateInfo']),
    ...mapActions('mdB', ['loginAndUpdateInfo'])
  },
  mounted() {
    console.log('当前实例', this);
    console.log('当前实例$store', this.$store);
  },
}
```


## 7. 在没有命名空间的模块访问内容
- 访问state中的属性使用映射,需要使用箭头函数的方法
- getters,mutations,actions可以正常使用映射方法
```JS
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: state => state.mdA.user,
    }),
    ...mapGetters(['isLogin']),
  },
  methods: {
    ...mapMutations(['updateInfo']),
    ...mapActions(['loginAndUpdateInfo'])
  },

  mounted() {
    console.log('当前实例', this);
    console.log('当前实例$store', this.$store);
  },
}
```


## 8. 在带命名空间的模块内访问全局内容
- 访问根store实例的state属性和getters属性
- 可以在模块的getters属性中的函数添加rootState和rootGetters来作为第三和第四参数传入
```html
<div>
  <p>{{ lookBoth }}</p>
  <p>{{ lookBothDouble }}</p>
</div>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('mdB', ['lookBoth', 'lookBothDouble'])
  },
}
</script>
<script>
// 当前模块 mdB => 访问根store中的数据
lookBoth(state, getters, rootState, rootGetters) {
  console.log('rootState', rootState);
  console.log('rootGetters', rootGetters);
  return rootState.a + rootState.b
},
lookBothDouble(state, getters, rootState, rootGetters) {
  console.log('rootState', rootState);
  console.log('rootGetters', rootGetters);
  return rootGetters.doubleA + rootGetters.doubleB
}
</script>
```
- 在actions中使用全局的方法
- 如果需要调用根实例中的方法,需要添加root属性作为第三参数传入
```html
<p>
  <button @click="addBoth({ a: 10, b: 20 })">addBoth</button>
</p>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('mdB', ['addBoth'])
  },
}
</script>
<script>
addBoth(context, payload) {
  // context => {commit,dispatch,state,getters,rootState,rootGetters}
  // commit和dispatch可以对应名称调用当前模块的mutations和actions的方法
  // 也可以调用全局模块的方法(如果调用根模块需要添加第三参数root:true)
  // 也可以对应模块名称和方法 调用子模块的方法
  // 其他模块建议通过根模块访问
  var { commit } = context
  console.log('context', context);
  console.log('接收的参数', payload);
  // 访问当前模块
  commit('updateInfo',{user:"dd11111",token:"cccccccc"})
  // 调用全局的 如果不加 {root:true} 默认是局部的
  commit('addA', payload, { root: true })
  commit('addB', null, { root: true })
}
</script>
```


### 8-1 模块中的相互访问
```js
// 当前模块访问根store中的state和getters
console.log(rootState.a);
console.log(rootState.b);
console.log(rootGetters.doubleA);
console.log(rootGetters.doubleB);

// 通过 rootState, rootGetters 访问其他模块(mdB -> 假装一下是其他模块)
console.log(rootState.mdB.user);
console.log(rootState.mdB.token);
console.log(rootGetters['mdB/isLogin']);
console.log(rootGetters['mdB/lookBoth']);

// 通过根模块rootState, rootGetters 访问其他模块的子模块
console.log(rootState.mdB.mdB_1.a1);
console.log(rootState.mdB.mdB_1.b1);
console.log(rootGetters['mdB/mdB_1/both_mdB_1']);
```
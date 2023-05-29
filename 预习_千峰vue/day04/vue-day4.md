# vue-day3笔记
## 1. watch的深度监听
- wtch监听数组时,是可以监听到数组的改变的,和数组的变更方法以及替换方法相似
- 再给data中的数据绑定数据监听时,默认只给data中的根属性绑定数据监听(watch),根属性的值发生改变之后才会触发 数据监听(watch),如果根属性的值也是一个对象,该对象的值发生改变不会触发 内部对象 的 数据监听(watch)
- 响应式原理 和 watch监听 的区别
  - Vue的响应式对所有数据进行拦截, Object.defineProperty() => 只要data中的任意属性发生了改变 => 都会触发视图更新
  - 但是深度监听的是为了监听某一个属性是否发生改变
- 深度监听: 分别给data中的根属性,及其下对象的子属性绑定数据监听(watch),当根属性的值发生变化,或者根属性下的对象的子属性的值发生变化,才会触发数据监听(watch)
- 在监听时将属性作为一个对象传入 添加一个deep属性为true,就会开启深度监听
```html
<body>
  <div id="app">
    <form action="" @submit.prevent>
      <div class="input-group">
        <label>firstName:</label>
        <input type="text" v-model="form.firstName">
        <span>{{form.firstName}}</span>
      </div>
      <div class="input-group">
        <label>lastName:</label>
        <input type="text" v-model="form.lastName">
        <span>{{form.lastName}}</span>
      </div>
      <div>
        <label>fullName:</label>
        <input type="text" v-model="fullName">
        <span>{{fullName}}</span>
      </div>
      <button @click="form={firstName:'',lastName:''}">修改from</button>
    </form>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      // 再给data中的数据绑定数据监听时,默认只给data中的根属性绑定数据监听(watch),跟属性的值发生改变之后才会触发 数据监听(watch),如果根属性的值也是一个对象,该对象的值发生改变不会触发 form 的 数据监听(watch)
      form: {
        firstName: '',
        lastName: ''
      }
    },
    computed: {
      // fullName() {
      //   return this.firstName + (this.lastName ? ' ' + this.lastName : '')
      // }
      fullName: {
        get() {
          return this.form.firstName + (this.form.lastName ? ' ' + this.form.lastName : '')
        },
        set(val) {
          if (val) {
            var list = val.split(' ')
            this.form.firstName = list[0]
            this.form.lastName = list[1] || ''
          }
        }
      }
    },
    watch: {

      // 浅监听(只会监听data根数据的改变)
      // form() {
      //   console.log('form中的数据改变了');
      // },

      // 深度监听: 分别给data中的根属性,及其下对象的子属性绑定数据监听(watch),当根属性的值发生变化,或者根属性下的对象的子属性的值发生变化,才会触发数据监听(watch)
      // 深度监听引发的新的问题: newVal,oldVal 引用同一个内存空间(被监听的对象的新值和旧值)
      form: {
        handler(newVal,oldVal) {
          console.log('form中的数据改变了');
          console.log('form中的数据改变了newVal',newVal);
          console.log('form中的数据改变了oldVal',oldVal);
        },
        deep:true, // 是否开启深度监听(如果被监听的属性下的对象中的数据发生改变,也会触发)
      }
    }
  })
```
### 1-1 watch监听对象中的某个属性
- 深度监听引发的问题: newVal,oldVal 引用同一个内存空间(被监听的对象的新值和旧值),导致显示的结果是一样的
  - 解决办法1: 解决方法1,监听对象中的某个属性
  - 解决办法2: 解决方法2.深拷贝一份之后,监听新的对象
```js
var vm = new Vue({
  el: '#app',
  data: {
    form: {
      firstName: '',
      lastName: ''
    }
  },
  computed: {
    fullName: {
      get() {
        return this.form.firstName + (this.form.lastName ? ' ' + this.form.lastName : '')
      },
      set(val) {
        if (val) {
          var list = val.split(' ')
          this.form.firstName = list[0]
          this.form.lastName = list[1] || ''
        }
      }
    },
    formCopy() {
      return JSON.parse(JSON.stringify(this.form))
    }
  },
  watch: {
    // 因为深度监听时,新数据和旧数据访问的内存空间都是一样的,所以新数据和旧数据是一样的
    // 解决方法1,监听对象中的某个属性
    "form.firstName"(newVal, oldVal) {
      console.log('form的firstName属性改变了', newVal, oldVal);
    },
    "form.lastName"(newVal, oldVal) {
      console.log('form的lastName属性改变了', newVal, oldVal);
    },
    // 解决方法2.深拷贝一份之后,监听新的对象
    formCopy(newVal, oldVal) {
      console.log('form的属性改变了', newVal, oldVal);
    }
  }
})
```
### 1-2 watch属性立即执行
- 传统的watch写法,必须等到数据发生改变之后才会执行
- 能不能让watch监听的属性 在初始化渲染时默认执行一次(类似与computed)
  - 在监听数据时配置immediate(立即)属性为true => 注意:在此实例化初识渲染后默认执行一次 newVal是当前值,oldVal是undefined
```html
<body>
  <div id="app">
    <p>{{count}}</p>
    <p>{{doubleCount}}</p>
    <p>{{tripleCount}}</p>
    <button @click="count++">count++</button>
    <button @click="count--">count--</button>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1,
      doubleCount: 2,
      tripleCount: 3
    },
    methods: {},
    computed: {},
    watch: {
      // 能不能让watch监听的属性 在初始化渲染时默认执行一次(类似与computed)
      // 在监听数据时配置immediate(立即)属性为true => 注意:在此实例化初识渲染后默认执行一次 newVal是当前值,oldVal是undefined
      count: {
        handler(newVal, oldVal) {
          console.log('触发监听', newVal, oldVal);
          if (newVal >= 1) {
            this.doubleCount = newVal * 2
            this.tripleCount = newVal * 3
          } else {
            this.count = oldVal
          }
        },
        immediate: true
      }
    },
  })
</script>
```
## 2. axios的介绍以及简单应用
- axios 全局方法,任何位置都可以使用
  - console.log(axios)
- `url` 是用于请求的服务器 URL
  - url: '/user',
- `method` 是创建请求时使用的方法
  - method: 'get', // 默认值
- `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  - 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  - baseURL: 'https://some-domain.com/api/',
- axios携带数据
  - get => params:{}
  - post => data:{}
- `timeout` 指定请求超时的毫秒数。
  - 如果请求时间超过 `timeout` 的值，则请求会被中断
  - timeout: 1000, // 默认值是 `0` (永不超时)
- `responseType` 表示浏览器将要响应的数据类型
  - 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  - 浏览器专属：'blob'
  - responseType: 'json', // 默认值
![](./axiso%E5%AF%B9%E8%B1%A1.png)
```js
// post测试 => 不能以post请求本地文件
axios({
  method: 'post',
  url: '../data/goods.json',
  headers: {
    "content-type":"application/x-www-form-urlencoded", // formData
    "content-type":"application/json" // json
  },
  data: { // 测试post传参
    a: 1,
    b: 2
  }
})
// get测试
axios({
  method: 'get',
  url: '../data/goods.json',
  params: {
      a: 1,
      b: 2
  }
}).then(res => {
  console.log('axios自己配置的信息',res)
  return res.data
}).then(data => {
  console.log('请求得到的数据',data)
})
```
### 2-1 axios发送get和post请求
```js
// 发送get请求
axios.get("/php/searchGoodsOrderLimit.php",{
  baseURL:"http://121.43.116.41/demo",
  params:this.searchParams,
}).then(response=>{
  console.log("axios配置的响应对象",response);
  return response.data;
}).then(data=>{
  console.log("响应数据",data);
})
// 发送post请求
axios.post("/php/login.php",this.loginParams,{
  baseURL:"http://121.43.116.41/demo",
  headers:{
      "Content-Type":"application/x-www-form-urlencoded",
  },
}).then(response=>{
  console.log("axios配置的响应对象",response);
  return response.data;
}).then(data=>{
  console.log("响应数据",data);
})
```
### 2-2 axios之全局配置
```js
// 全局 axios 默认值   => 指定默认配置，它将作用于每个请求。
axios.defaults.baseURL = 'http://121.43.116.41/demo';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;   //携带token的
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  // post默认传递数据的方式
// 当配置完全局配置之后发送get和post请求就只需要配置携带的参数即可
// ge请求
axios.get("/php/searchGoodsOrderLimit.php",{
  params:this.searchParams,
}).then(response=>{
  console.log("axios配置的响应对象",response);
  return response.data;
}).then(data=>{
  console.log("响应数据",data);
})
// post请求
axios.post("/php/login.php",this.loginParams).then(response=>{
  console.log("axios配置的响应对象",response);
  return response.data;
}).then(data=>{
  console.log("响应数据",data);
})
```
## 3. vue中获取元素,ref属性与\$refs对象,$nextTick方法使用
- ref属性和$refs对象一般是用来获取元素/组件(vue)的方法
- 因为vue中如何获取元素/组件(vue),原生方法 => 基本都是从文档中获取(范围可能不准确)
- vue中定义了自己查找元素的方法 => 基于 ref属性 => 理解为,在我们的vue实例初始化渲染过程中,将包含ref属性的元素提取出来,对应ref名放在vue实例的$refs属性中(优点:只在对应的vue实例范围内查找)
- 使用$refs方法获取元素内文本时,数据虽然发生了改变,后续需将模版编译为 虚拟DOM,通过diff算法比较之后,求出最优解 => 更新到 真实DOM(页面)上 (异步操作 => 微任务)
  - 如何解决上面的问题
    + 1. 设置延时器(宏任务,会等微任务执行完毕)
    + 2. 官方给Vue实例提供了方法 this.$nextTick()
      - 用法1:可以接收一个回调函数,在虚拟dom编译为真实dom(视图更新之后)执行 => 相当于是微任务后面又新增的一个微任务
      - 用法2:不接收任何参数,默认返回一个进行中(pedding)状态的promise实例,该promise实例在在虚拟dom编译为真实dom(视图更新之后)变为成功状态(fulfilled)
      - 用法2 也可以直接用async和await来实现
```html
<body>
  <div id="app">
    <p class="p" ref="p">{{count}}</p>
    <p><button @click="count++">count++</button></p>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    watch: {
      async count(newVal, oldVal) {
        console.log('监听count发生改变', newVal, oldVal);

        // 想查看数据改变之后对应元素的内容是否立即发生改变

        // 原生方法 => 基本都是从文档中获取(查找返回的元素可能并不是挂载的元素内的)
        // var p = document.querySelector('.p')

        // 注意: 数据虽然发生了改变,后续需将模版编译为 虚拟DOM,通过diff算法比较之后,求出最优解 => 更新到 真实DOM(页面)上 (异步操作 => 微任务)
        // 所以虽然数据发生了改变,但是视图还未更新,dom中的内容还是原本的内容
        console.log('直接打印', this.$refs.p.textContent)

        // 如何解决? => 等到虚拟DOM 编译为真实DOM (视图更新之后再查看元素的内容)

        // 1. 设置延时器(宏任务,会等微任务执行完毕)
        setTimeout(() => { console.log('延时器打印', this.$refs.p.textContent) })

        // 2. 官方给Vue实例提供了方法 this.$nextTick()
        // 用法1:可以接收一个回调函数,在虚拟dom编译为真实dom(视图更新之后)执行
        this.$nextTick(() => { console.log('$nextTick方法,用法1', this.$refs.p.textContent) })
        // 用法2:不接收任何参数,默认返回一个进行中(pedding)状态的promise实例,该promise实例在在虚拟dom编译为真实dom(视图更新之后)变为成功状态(fulfilled)
        this.$nextTick().then(() => { console.log('$nextTick方法,用法2', this.$refs.p.textContent) })
        // 用法3 也可以直接用async和await来实现
        await this.$nextTick()
        console.log('$nextTick方法,用法3使用async', this.$refs.p.textContent)

      }
    },
    mounted() {
      console.log(this.$refs.p);
    },
  })
</script>
```
## 4. ref获取元素细节-在vue中获取多元素
- ref属性的存储依赖于就近的vue实例(就近原则)
- 普通用法无法获取多元素 => 默认情况下,如果有多个元素/vue组件,有相同的ref名称 => 后面的会覆盖前面的(不要同名)
- 如果ref属性用在v-for中时,会将对应名称的元素/vue组件,整合为数组存储
```html
<body>
  <div id="app">
    <p ref="p">{{count}}</p>
    <p><button @click="count++">count++</button></p>
    <div ref="div" v-for="n in 10">{{n}}</div>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    mounted() {
      console.log(this.$refs.p);
      console.log(this.$refs.div);
    },
  })
```
## 5. 简单了解生命周期和钩子函数
![](./%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%A4%BA%E4%BE%8B%E5%9B%BE.jpg)
- vue生命周期分为三个阶段
  - 初始化阶段(初始化 模版编译 挂载)
    - => beforeCreate
    - => create
    - => beforeMount
    - => mounted
  - 更新阶段(响应式)
    - => beforeUpdate
    - => updated
  - 销毁阶段(卸载) => 当前实例无法再使用
    - => beforeDestroy
    - => destroyed
- 生命周期钩子函数不是必须的(有没有钩子函数生命周期都会正常进行) => 钩子函数的目的可以帮助我们在不同的阶段,可以查看数据变化,或者执行一系列操作
### 5-1 vue生命周期-初始化阶段
- => beforeCreate
  - -> 第一个执行的生命周期钩子函数,在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用(此时new Vue(options)中的选项配置还未解析 => 只能使用实例)
- => create
  - -> 在实例创建完成后被立即同步调用,此时new Vue(options)中的选项配置已经被解析了,已经配置完毕:在实例创建完成后被立即同步调用,此时new Vue(options)中的选项配置已经被解析了,然而，挂载阶段还没开始，且 $el property 目前尚不可用
- => 模版编译阶段
  - -> 先查找有没有el元素
  - -> 如果使用了template属性,会将template当做编译模版渲染
  - -> 如果没有使用template属性,会使用挂载元素中的编译模版
  - -> 如果el元素也没有找到,就会查找是否调用了vm.$mount(el)方法
- => beforeMount
  - -> 在挂载开始之前被调用：相关的 render 函数首次被调用 (将template解析为虚拟DOM)
- => mounted
  - -> 挂载完毕,此时虚拟DOM已经解析为真实DOM,视图已经被更新
  - -> 一般情况下喜欢在组件/vue实例挂载之后 在做数据处理
```html
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    // template:``,
    methods: {
      addCount() {
        console.log("addCount执行了");
        this.count++
      }
    },
    computed: {
      doubleCount() {
        console.log("计算属性执行了");
        return this.count * 2;
      }
    },
    watch: {
      count(newVal, oldVal) {
        console.log('count发生改变', newVal, oldVal);
      }
    },
    // 1. 在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用
    beforeCreate() {
      console.log('1. beforeCreate 阶段 实例', this);
      console.log('1. beforeCreate 阶段 $data', this.$data);
      console.log('1. beforeCreate 阶段 count', this.count);
      console.log('1. beforeCreate 阶段 方法', this.addCount);
      console.log('1. beforeCreate 阶段 计算属性', this.doubleCount);
      console.log("---------------------------------------------------");
    },
    // 2. 在实例创建完成后被立即同步调用,此时new Vue(options)中的选项配置已经被解析了,已经配置完毕:在实例创建完成后被立即同步调用,此时new Vue(options)中的选项配置已经被解析了,然而，挂载阶段还没开始，且 $el property 目前尚不可用
    created() {
      console.log('2. created 阶段 实例', this);
      console.log('2. created 阶段 $data', this.$data);
      console.log('2. created 阶段 count', this.count);
      console.log('2. created 阶段 方法', this.addCount);
      console.log('2. created 阶段 计算属性', this.doubleCount);
      console.log('2. created 阶段 虚拟DOM', this._vnode);
      console.log("---------------------------------------------------");
    },
    // 3. 在挂载开始之前被调用：相关的 render 函数首次被调用 (将template解析为虚拟DOM)
    beforeMount() {
      console.log('3. beforeMount 阶段 实例', this);
      console.log('3. beforeMount 阶段 $data', this.$data);
      console.log('3. beforeMount 阶段 count', this.count);
      console.log('3. beforeMount 阶段 方法', this.addCount);
      console.log('3. beforeMount 阶段 计算属性', this.doubleCount);
      console.log('3. beforeMount 阶段 虚拟DOM', this._vnode);
      console.log('3. beforeMount 阶段 $el', this.$el);
      console.log("---------------------------------------------------");
    },
    // 4. 挂载完毕,此时虚拟DOM已经解析为真实DOM,视图已经被更新
    mounted() {
      console.log('4. mounted 阶段 实例', this);
      console.log('4. mounted 阶段 $data', this.$data);
      console.log('4. mounted 阶段 count', this.count);
      console.log('4. mounted 阶段 方法', this.addCount);
      console.log('4. mounted 阶段 计算属性', this.doubleCount);
      console.log('4. mounted 阶段 虚拟DOM', this._vnode);
      console.log('4. mounted 阶段 $el', this.$el);
      console.log("---------------------------------------------------");
    },
  })
  // vm.$mount('#app')
</script>
```
### 5-2 vue生命周期-更新阶段
- => beforeUpdate
  - -> 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器
- => updated
  - -> 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用,此时可以访问更新之后的dom,然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之
  - -> 注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 vm.$nextTick
```js
var vm = new Vue({
  el: '#app',
  data: {
    count: 1
  },
  methods: {
    addCount() {
      console.log("addCount执行了");
      this.count++
    }
  },
  computed: {
    doubleCount() {
      console.log("计算属性执行了");
      return this.count * 2;
    }
  },
  watch: {
  },
  // 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器
  beforeUpdate() {
    console.log('5.数据发生了改变 视图还未更新', this.count, this.$refs.p.textContent);
    console.log("---------------------------------------------------");
  },
  // 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用,此时可以访问更新之后的dom,然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之,注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 vm.$nextTick
  updated() {
    console.log('6.数据发生了改变 视图已经更新', this.count, this.$refs.p.textContent);
    console.log("---------------------------------------------------");
  },
})
```
### 5-2 vue生命周期-销毁/卸载阶段
- => beforeDestroy
  - -> 实例销毁之前调用。在这一步，实例仍然完全可用
- => destroyed
  - -> 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁
  - -> 可以在组件销毁/卸载之前,清除绑定的事件,计时器/延时器
```js
var vm = new Vue({
  el: '#app',
  data: {
    count: 1,
    timer: null
  },
  methods: {
    addCount() {
      console.log("addCount执行了");
      this.count++
    }
  },
  computed: {
    doubleCount() {
      console.log("计算属性执行了");
      return this.count * 2;
    }
  },
  watch: {},
  mounted() {
    window.onscroll = function () {
      console.log("滚动条滚动了");
    }
    this.timer = setInterval(() => {
      console.log(Date.now());
    }, 1000)
  },
  // 实例销毁之前调用。在这一步，实例仍然完全可用
  beforeDestroy() {
    console.log('7. beforeDestroy 阶段 实例', this);
    console.log('7. beforeDestroy 阶段 $data', this.$data);
    console.log('7. beforeDestroy 阶段 count', this.count);
    console.log('7. beforeDestroy 阶段 方法', this.addCount);
    console.log('7. beforeDestroy 阶段 计算属性', this.doubleCount);
    console.log('7. beforeDestroy 阶段 虚拟DOM', this._vnode);
    console.log('7. beforeDestroy 阶段 $el', this.$el);
    console.log('7.数据发生了改变 视图还未更新', this.count, this.$refs.p.textContent);
    console.log("---------------------------------------------------");
    window.onscroll = null,
    clearInterval(this.timer)

  },
  // 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁
  destroyed() {
    console.log('8. destroyed 阶段 实例', this);
    console.log('8. destroyed 阶段 $data', this.$data);
    console.log('8. destroyed 阶段 count', this.count);
    console.log('8. destroyed 阶段 方法', this.addCount);
    console.log('8. destroyed 阶段 计算属性', this.doubleCount);
    console.log('8. destroyed 阶段 虚拟DOM', this._vnode);
    console.log('8. destroyed 阶段 $el', this.$el);
    console.log("---------------------------------------------------");
  },
})
```
### 5-3 vue生命周期应用
- created => 此阶段: 可以对Vue实例中绑定的数据进行修改(可以触发watch监听,但是不会触发更新阶段 beforeUpdate和updated  => 此时初始化阶段还未结束)
- beforeMount => 此阶段亦可修改数据(不建议)  => 它是视图挂载前,修改数据的最后一次机会
- mounted => 此阶段:常用于请求数据(ajax) => 在Vue实例初始化渲染完毕之后,在发送请求获取数据(异步操作),等到数据请求成功之后,存储到Vue实例中 => 重新渲染视图
- beforeDestroy => 此阶段: Vue实例销毁之前,常用于清除Vue中绑的的一些事件,计时器,延时器
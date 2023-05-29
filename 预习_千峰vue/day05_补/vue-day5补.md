# vue-day5补充
## 1. 组件通信
### 1-1 父传子-初始值
- 组件传参需要遵循单项数据流的原则,父组件给子组件传递参数 => 子组件不能直接修改
- 如果子组件需要改父组件传入的数据 => 变相修改
  - 把从父组件接收的数据,作为子组件某个属性的初始值
### 1-2 父传子-计算属性
- 如果子组件需要改父组件传入的数据 => 变相修改
  - 把从父组件接收的数据,作为子组件某个属性的初始值
  - 根据父组件传入的数据生成计算属性 (如果父组件传入的数据发生改变 -> 子组件中的数据也会跟着改变)
```js
Vue.component('get-total', {
  props: {
    pay: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      // val: this.pay, // 将传入的数据作为组件的初始值(父组件传递的数据发生改变不会重新初始化)
    }
  },
  template: `<p class='get-total'>{{handlerMoney}}</p>`,

  computed: {
    handlerMoney() {
      // 直接在计算属性中接收父组件传的数据,这样子组件的数据也会随着父组件数据变更而变化
      return new Intl.NumberFormat().format(this.pay)
    }
  }
})
```
## 2. Vue中的自定义事件
- $on(event,callback)  => 绑定自定义事件
  - => event -> 事件类型
  - => callback -> 对应的事件处理函数
- $off(event,callback) => 清除自定义事件 (对应函数引用清除)
  - => event -> 事件类型
  - => callback -> 对应的事件处理函数
- $emit(event,data)     => 触发自定义事件
  - => event -> 事件类型
  - => data -> 事件接收的参数
```js
var vm = new Vue({
  el: '#app',
  data: {
    count: 1
  }
})

let a, b, c, d;

// 绑定自定义事件
vm.$on('hello', a = function (data) {
  console.log('自定义事件hello触发了111', data);
});

vm.$on('hello', b = function (data) {
  console.log('自定义事件hello触发了222', data);
});

vm.$on('world', c = function (data) {
  console.log('自定义事件world触发了222', data);
});

vm.$on('world', d = function (data) {
  console.log('自定义事件world触发了222', data);
});

// 清除自定义事件
vm.$off('hello', a)
vm.$off('hello', b)
vm.$off('world', c)
vm.$off('world', d)

// 触发自定义事件
vm.$emit('hello', 10)
vm.$emit('world', 20)

// 绑定的事件会存放到 _event内,对应事件的处理函数存放到数组中
console.log(vm)
```
## 3. 组件通信
### 3-1 组件通信-子传父
1. 父组件给子组件动态传递数据以及修改数据的方法(通过自定义事件传入)
2. 自定义事件的名称可以自行定义,传入的函数被子组件自定义事件接收(两个函数引用同一片内存空间),子组件触发自定义事件,也会执行父组件传入的函数
```html
<body>
  <div id="app">
    <p>{{count}}</p>
    <p><button @click="count++">按钮</button></p>
    <br>
    <br>
    <!-- 
      组件通信 : 子传父
        1. 父组件给子组件动态传递数据以及修改数据的方法(通过自定义事件传入)
        2. 自定义事件的名称可以自行定义,传入的函数被子组件自定义事件接收(两个函数引用同一片内存空间),子组件触发自定义事件,也会执行父组件传入的函数
    -->
    <count-input :value="count" @update:value="updateValueHandler"></count-input>
  </div>
</body>
<template id="demo">
  <div class="count-input">
    <span class="reduce" @click="value > 1 && $emit('update:value',value-1)">-</span>
    <input type="number" class="count" :value="value" @change="changeHandler"></input>
    <span class="add" @click="$emit('update:value',value+1)">+</span>

  </div>
</template>
<script>
  // 组件通信 : 子传父
  Vue.component('count-input', {
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {

      }
    },
    template: `#demo`,
    methods: {
      changeHandler(e) {
        // console.log(e.target.value);
        // 输入框修改后的值
        var val = e.target.value
        if (val < 0 || (val % 1 != 0)) { // 如果手动输入的内容不规范 => 赋值为原值 => 数据没有更新 => 不会触发视图更新
          this.$emit('update:value', this.value)  // 赋值为原值 => 不会触发视图更新
          this.$forceUpdate() // 强制视图更新 
        } else {
          this.$emit('update:value', val) // 符合规范,更新数据
        }
      }
    },
    mounted() {
      console.log('组件实例', this);
    },
  })
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    methods: {
      updateValueHandler(v) {
        this.count = v
      }
    },
  })
</script>
```
### 3-2 组件通信-子传父-sync修饰符
- .sync修饰符 等价于 对应我们绑定的参数名新增自定义事件 @undate:参数名="(v)=>{count=v}"
  - <count-input :value="count" @update:value="updateValueHandler"></count-input>
- 使用.sync修饰符之后的写法
  - <count-input :value.sync="count"></count-input>
  - 并且可以不需要再父组件中挂载方法,Vue会自动帮助我们挂载方法

### 3-3 组件通信-子传父-native修饰符
- 在一个组件的根元素上监听一个原生事件
- 在组件上绑定的时间默认是自定义事件,如果想在组件上绑定原生时间,需要添加.native修饰符
```html
<comp-a :count.sync="count" @click.native="clickHandler"></comp-a>
```

### 3-4 组件通信-子传父-自定义组件的v-model
- <count-input :value="count" @update:value="updateValueHandler"></count-input>
- <count-input :value.sync="count"></count-input>
- 对比上述代码 v-model缺少了接收数据的属性 和 更改数据的方法 -> 可以在组件内定义(可以理解为,在组件内定义接收数据的属性名) -> 外界看起来更简洁(更像双向数据绑定)
  - 所以需要再子组件中添加model选项配置
```
model: {
  prop: 'value', // 接收数据的属性 => 需要在props中接收
  event: 'update:value', // 改变数据的方法
}
```
### 3-4-1 vue3中的v-model
- Vue2 和 Vue3的区别
  - 1. 创建Vue实例要通过 createApp
  - 2. data选项要求是返回对象的函数
  - 3. 没有el配置了, 通过vue实例的mount方法挂载
  - 4. vue3中没有.sync修饰符 => 统一用v-model
```js
var {createApp} = Vue;
var app = createApp({
  data(){
    return {

    }
  },
  components: {}
}).mount("#app")
```
- 定义组件的v-model  => 本质上和.sync修饰符是类似的  => 目的也是为了实现父子组件通信
- 组件中使用v-model需要注意:
- 组件内需要设置model属性 => 
- 1. 定义一个属性prop,用于定义接收父组件传入v-model的指令的值的属性
- 2. 定义一个属性event,用于定义修改v-model指令值的事件的事件
```
props: ["modelValue"],
emits:["update:modelValue"]
```
- vue3中可以给v-model设置参数  => 用于接收接收v-model指令值的属性名和接收更新执指令值的方法model:参数名
```
<lw-check-box v-model:checked="bool" ></lw-check-box>
props: ["checked"],
emits:["update:checked"]
```
### 3-5 组件通信 - 非父子组件
-  如果是同级组件 => 有相同的父组件(根组件) => 可以将父组件作为通信的桥梁
-  组件中也有相应的层级关系(父组件,子组件,根组件),通过ref属性也可以获取组件
  - 组件层级的相关属性 
    + -> $parent => 父组件
    + -> $children => 子组件(不建议使用$children => 组件也可以进行动态渲染,下标可能改变)
    + -> $root => 根组件
- 事件总线
  - 创建一个新的实例对象,但是不在页面上做任何操作
  - 给新的实例对象绑定自定义事件
  - 在需要接收数据的组件中中绑定事件,另一个组件中触发事件,并且将需要传的数据当做参数传过去
```html
<body>
  <div id="app">
    <color-select></color-select>
    <show-article></show-article>
  </div>
</body>

<template id="compA">
  <div class="colorSelect">
    <input type="color" :value="color" @change="colorHandler">
  </div>
</template>

<template id="compB">
  <div class="article" :style="{color:color}">
    <p>说到这里，大师脸上流露出一丝冷笑，“很多人都认为，蓝银草是废武魂，但经过我多年的研究，蓝银草同样有属于自己的作用。如果不是蓝银草在觉醒时产生的魂力过于弱小，哪怕是成为战魂师，也并不是不可能的。</p>
  </div>
</template>
<script>
  var bus = new Vue({})  // 新的实例,全局的
  Vue.prototype.$bus = new Vue()  // 同上也是创建一个新的实例
  
  // A组件要传数据
  Vue.component('color-select', {
    data() {
      return {
        color: '#666666',
      }
    },
    template: "#compA",
    methods: {
      colorHandler(e) {
        console.log('color发生改变');
        this.color = e.target.value // 先改自己的,再把自己的传过去
        bus.$emit('changeColor', e.target.value)
      }
    },
  })
  // B组件要收数据
  Vue.component('showArticle', {
    data() {
      return {
        color: '#666666'
      }
    },
    template: "#compB",
    mounted() {
      // b组件挂载完毕 -> 通过bus实例自定义事件 -> 
      bus.$on('changeColor', (v) => {
        this.color = v
      })
    },
  })
  var vm = new Vue({
    el: '#app',
    data: {

    }
  })
</script>
```


### 3-6 组件通信-非父子组件-多层嵌套-依赖注入
- 想要将根组件中的数据 依次通过 A B 组件传递给 组件C
- 如果组件嵌套的层数过多 => 父组件想要将数据传递给某个子组件 => 就比较麻烦 => 有没有更简单的方法
  - -> 官方提供了
  - -> 依赖注入 provide / inject 实现数据的跨层级传递
  - -> 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效
  - -> provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property
  - 如果需要响应式数据,需要在provide中配置一个返回对象的函数,并且在返回的对象内声明一个函数,函数内在返回当前实例上的数据
  - -> inject 选项应该是
    - 一个字符串数组，或
    - 一个对象，对象的 key 是本地的绑定名，value是父组件传递的数据
```html
<body>
  <div id="app">
    <p>{{count}}</p>
    <button @click="count++">加</button>
    <comp-a></comp-a>
  </div>
</body>
<template id="compA">
  <div class="compA">
    这是组件A{{getCount()}}
    <button @click="setCount(getCount()*2)">count*2</button>
    <comp-b></comp-b>
  </div>
</template>
<template id="compB">
  <div class="compB">
    这是组件B{{getCount()}}
    <button @click="setCount(getCount()+1)">count--</button>
    <comp-c></comp-c>
  </div>
</template>

<template id="compC">
  <div class="compC">
    这是组件C{{getCount()}}
    <button @click="setCount(getCount()+1)">count++</button>
  </div>
</template>
<script>
  Vue.component('compC', {
    data() {
      return {}
    },
    template: "#compC",
    methods: {},
    // 子代组件对应属性名引入数据 => this['getCount'] = 父组件['getCount']
    inject: ['getCount', 'setCount']
  })
  Vue.component('compB', {
    data() {
      return {}
    },
    template: "#compB",
    methods: {},
    inject: ['getCount', 'setCount']
  })
  Vue.component('compA', {
    data() {
      return {}
    },
    template: "#compA",
    methods: {},
    inject: ['getCount', 'setCount']
  })
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    /* 提供 静态/响应式 数据
    provide 传入一个返回对象的函数,函数的this指向当前实例
    1. 可以依赖于当前实例中的数据
    2. 直接依赖当前实例的数据(对当前实例进行取值) => 提供的还是死值
    传入一个箭头函数,在函数中通过this修改数据 => 响应式(子组件注入之后,需要作为函数调用) */
    provide() {
      return {
        count: this.count, // this.count 就是取出当前实例的count的值,还是1
        getCount: () => { // 传入一个函数 => 函数内的this也指向当前实例 => 被子组件对应名称引用 => 当子组件调用方法时会调用此函数 => 重新取值
          return this.count
        },
        // 子组件也可以更改父组件中的值
        setCount: (v) => {
          this.count = v
        }
      }
    }
  })
</script>
```
### 3-7 依赖注入 inject对象参数
- 子组件引入,对象写法
  - 键名: 当前组件接收数据的属性名
  - 键值: 字符串(父组件provide数据的属性名)/对象
```
inject: {
  "getCount": "getCount",
  // 如果名字重复 => 改一个新名字 => this.['updateCount'] = 父组件provide数据['getCount']
  updateCount: "setCount",
  // this['a'] = 父组件provide数据['a']
  a: {
    from: 'a',  // 依赖于父组件的provide提供的a属性
    default: 100 // 如果父组件没有提供,就使用默认值100
  }
}
```
# vue-day5笔记
## 1. Vue3中的flush属性
- 想在侦听器回调中能访问被Vue更新之后的DOM
```js
var vm = new Vue({
  el: '#app',
  data: {
    count: 1
  },
  watch: {
    // Vue3 想在侦听器回调中能访问被Vue更新之后的DOM
    count: {
      handler: async function (newVal, oldVal) {
        console.log('监听count发生改变', newVal, oldVal);
        console.log(this.$refs.p.textContent);
      },
      flush: 'post',
    }
  },
  mounted() {
    console.log("vue实例", this);
    console.log('vue.$refs', this.$refs);
    console.log('p', this.$refs.p);
  },
})
```
## 2. 模块化和组件化概念
- 模块化 => 将一个大程序拆分成相互依赖的小文件(JS => JS业务/复用功能)
- 优点: 
  - 1. 减少全局变量的使用(每个模块都是独立的js文件,模块内的变量都是局部变量)
  - 2. 代码复用 => 按需暴露 按需引入
  - 3. 模块之间可以相互引入
  - 4. 代码维护比较方便
- 有哪些模块化:
  - 1. ES6的module      => export暴露           import引入
  - 2. nodeJS的commonJS => module.exports暴露   require()引入
- 组件化
  - 组件化的目的和模块化类似,但是不仅限于js代码复用,还可以包含 html css 复用
  - 一个组件就是一个完整的功能(组件之间也可以相互引入 父组件 子组件 根组件)
- vue中的组件化
  - 一个组件就是一个<font color=#FF0000 >可复用</font>的vue实例 (也含有data methods computed watch 生命周期钩子函数)
## 3. 如何定义组件以及使用组件
### 3-1 全局组件
- Vue.component(compName,compOptions) => 全局组件
  - -> compName 自定义组件的名称(字符串 -> 复杂名称建议使用中划线命名法)
  - -> options 组件相关的配置(也包含 data methods computed watch 生命周期钩子函数)
- 定义组件的注意事项
  - 1. 组件的dat必须是一个函数,因为组件是可以复用的,如果是一个对象,那么复用的时候,一个实例改变了,会导致其他复用的实例中的数据也发生改变
  - 2. 需要先定义组件,在创建根实例/根组件
  - 3. 单个根元素(Vue2) => template只能有单个根元素
- 如何使用组件
  - 对应组件名称使用组件 => 可以在其他组件中使用对应组件的标签来引用该组件
- 全局组件的优点
  - 只需全局注册一次,在页面中的任何位置均可以使用
- 缺点
  - 全局注册的组件无论在页面中是否使用,都会打包到项目源码中,代码量增加
  - 因为都是全局的,所以组件之间也可以相互嵌套,组件之间的层级关系不是很明确
```html
<body>
  <div id="app">
    <com-a></com-a>
    <hr>
    <com-b></com-b>
    <hr>
    <com-c></com-c>
  </div>
</body>
<script>
  Vue.component('com-a', {
    data() {
      return {}
    },
    template: `<div>
      <p>我是组件A</p>
      <com-b></com-b>
      </div>`,
  });
  Vue.component('com-b', {
    data() {
      return {}
    },
    template: `<div>
      <p>我是组件B</p>
      </div>`,
  });
  Vue.component('com-c', {
    data() {
      return {}
    },
    template: `<div>
      <com-a></com-a>
      <p>我是组件C</p>
      </div>`,
  });
  var vm = new Vue({
    el: '#app',
    data: {
      count:1
    }
  })
</script>
```
### 3-2 局部组件
- 你可以通过一个普通的 JavaScript 对象来定义组件
- 然后在 components 选项中定义你想要使用的组件
  - components 选项中的键名: 组件的名称
  - components 选项中的键值: 组件的配置
- 对于 components 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象
- 如果想让某一个局部组件在另一个局部组件内可用,需要在父组件内声明components选项中定义你想要使用的组件
- 局部组件的优点
  - 使用时才会被注册(如果不被使用,不会打包到项目的源码中)
  - 组件之间的层级关系也比较清晰
- 局部组件的缺点
  - 注册起来比较麻烦 => 如果使用频率比较高,建议使用全局注册
```html
<body>
  <div id="app">
    <com-a></com-a>
    <hr>
    <com-b></com-b>
    <hr>
    <com-c></com-c>
  </div>
</body>
<script>
  var comB = {
    data() {
      return {}
    },
    template: `<div>
      <p>我是组件B</p>
      </div>`,
  }

  var comA = {
    data() {
      return {}
    },
    template: `<div>
      <p>我是组件A</p>
      <com-b></com-b>
      </div>`,
    components: {
      "com-b": comB
    }
  }

  var comC = {
    data() {
      return {}
    },
    template: `<div>
      <p>我是组件C</p>
      <com-a></com-a>
      <com-b></com-b>
      </div>`,
    components: {
      "com-a": comA,
      "com-b": comB,
    }
  }

  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    components: {
      // 键名: 组件的名称
      // 键值: 组件的配置
      'com-a': comA,
      'com-b': comB,
      'com-c': comC,
    }
  })
</script>
```

## 4. 组件传参props
- 传参注意事项
  - HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
  - 注意: 子组件接收的数据(属性),是由父组件传入的
```html
<!-- 在 HTML 中是 中划线命名 的 -->
<blog-post post-title="hello!"></blog-post>
<script>
Vue.component('blog-post', {
  // 在 JavaScript 中是 驼峰命名 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
</script>
```
- 我们只看到了以字符串数组形式列出的 参数
- props也可以是一个对象(对象的键名 => 接收数据的属性名, 键值 => 接收数据的类型(String Boolean Number Array Object Date)) => 所有属性都是有就接收,没有就undefined
```js
Vue.component('prop-test', {
  props: {
    // num: Number, // 只能是数字类型
    num: [Number, String], // 数值或者字符串类型
    str: String,
    bool: Boolean,
    a:null,
    b:undefined,
    arr:Array,
    obj:Object
  },
})
```
- 单向数据流 => 子组件不能直接修改父组件传入的数据
  - 直接修改会报错 => oid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "countTime" 
  - 避免直接更改属性，因为每当父组件重新渲染时，该值都会被覆盖。相反，使用基于属性值的数据或计算属性。正在改变的属性：“countTime”
  - 应该如何修改
    + 被接收的数据也会直接挂载到子组件的实例化对象上 => 可以通过实例化对象直接访问 (注意: 也可以通过this.$props)
    + 由于组件被设计为单向数据流 => 子组件不能直接修改父组件传入的数据 => 可以将被接收的父组件的数据作为子组件某项数据的初始值
### 4-1 静态传参
- 当前案例传入的属性是静态属性(属性值都是字符串类型) => 传入之后不可更改 => 更习惯作为子组件的初始值
```html
<my-adver adver-time="30" :loop="true" link="https://www.baidu.com" src="https://img1.baidu.com/it/u=1848835637,2481235776&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"></my-adver>
```
### 4-2 动态传参
- 动态传参的优点
  - 组件接收数据时,得到原本的类型 
  - 可以使用父组件的数据
```html
<prop-test :num="count" :str="'hello'" :bool="true" :a="null" :b="undefined" :arr="[1,2,3]" :obj="{a:1,b:2,c:3}"></prop-test>
```
### 4-3 定义参数props类型
- props也可以是一个对象(对象的键名 => 接收数据的属性名, 键值 => 接收数据的类型) => 可以对键值进行更为详细的描述
  - 有哪些类型的参数
    + required: true => 是否必填
    + default: 100 => 默认值
    + validator: function (value) {return 判断条件}  => 必须满足判断条件 => 否则报错
  - 数据可以是哪些类型
    + String
    + Number
    + Boolean
    + Array
    + Object
    + Date
    + Function
    + Symbol
```js
Vue.component('prop-test', {
  props: {
    num: {
      type: [Number, String], // 接收数据的类型
      required: true,  // 必填()
    },
    str: {
      type: String,
      validator: function (val) { // 验证函数 => 接收对应属性名的值,执行验证函数,返回值为true表示验证成功,否则失败
        console.log('value', val)
        if (val.length >= 5 && val.length <= 12) return true
      }
    },
    bool: {
      type: Boolean,
      default: true, // 默认值
    },
    a: null,
    b: undefined,
    arr: Array,
    obj: Object
  },
})
```
## 5. 透传attribute
- 没有被props接收的数据会存放到哪里
  - 透过组件传递到组件的根元素上 => 全都作为html属性 => 继承
  - 查看时可以通过this.$attrs获取传入的数据
  - 此时如果组件上存在同名属性 => 传入属性的会覆盖原本的 (style和class除外 => 会合并)
### 5-1 透传属性取消继承
- 如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 inheritAttrs: false
- **注意**
  - class和style一样会透传和合并
  - 此时组件的$attrs依旧可用 => 可以通过$attrs => 在指定元素内使用
```js
Vue.component('prop-test', {
  inheritAttrs: false,
  data() {
    return {

    }
  },
  template: `<div style='width:100px' class='tow'>
    我是组件prop-text
    <span :title='$attrs.str'>{{$attrs.num}}</span>s
    </div>`,
  watch: {
    num(newVal, oldVal) {
      console.log("num接受的数据发生改变", newVal, oldVal);
    }
  },
  mounted() {
    console.log("接受的数据", this.$props); // 没有通过props属性定义接收的数据 undefined
    console.log("当前组件实例", this);
  },
})
```
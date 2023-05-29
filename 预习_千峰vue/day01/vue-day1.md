## vue day1
### 1. 初识vue
- 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统
- 如何使用vue
  - 下载本地使用
  ```js
  <script src="../js/vue.js"></script>
  ```
  - 直接在线使用
  ```js
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  ```
### 2. 声明式渲染
- new Vue({options}) => 创建一个 Vue实例(应用)
- 在创建vue实例的过程中,将vue实例中的内容渲染到绑定的元素中
- **注意**
  - vue中的绝大部分功能都是依赖options(选项)参数实现的
  - 挂载的数据,挂载的方法,最终也会在实例化对象上绑定一份 => 模版数据上能访问的数据和方法,本质上都是通过vue实例访问的挂载的数据和方法才能在模版语法中使用,不挂载直接使用会报错

``` 
// 插值 => 文本插值 (将{{}}内的内容插入到标签内,作为标签内的文本 => 拼接)
{{message}}
```
- 声明式渲染的使用
```html
<body>
  <!-- 在没有使用vue之前 => 他就是一个普通的文本 -->
  <div id="app">
    <p>
      message:{{message}}
    </p>
    <p>
      count:{{count}}
    </p>
    <p>
      say:{{say()}}
    </p>
  </div>
</body>
<script>
  // ajax({type,url,data,async}) => 传入对象作为参数 => 同时传入多个数据 => 不同的键名执行不同的代码逻辑
</script>
<script>
var app = new Vue({ // vue中的绝大部分功能都是依赖于options(选项)参数实现的
  el: '#app', // 挂载的元素(css选择器) => #app
  data: {     // 挂载的数据 => 可以有多条(对象) => 可以在挂载的元素内使用(对应数据名称使用)
    message: 'Hello Wrold',
    count: 1,
    msg: "你好"
  },
  methods: {  // 挂载的方法 => 执行既定的内容 => 可以在挂载的元素内使用(对应函数名称使用)
    say: function () {
      console.log("this", this); // 在vue实例中,methods,computed,watch,中的方法的this都指向当前vue实例
      // return "你好"
      return this.msg
    }
  }
})
console.log(app) //打印vue创建的实例
console.log(app.$el) // 查看挂载的元素
console.log(app.$data) // 查看挂载的数据
console.log(app.count) // 对应属性名查看挂载的数据
console.log(app.message) // 对应属性查看挂载的数据
console.log(app.say) // 对应属性查看挂载的数据
</script>
```
### 3. 响应式渲染
- 响应式渲染 => 当挂载的数据被修改之后,也会触发视图更新(挂载的元素内的html结构重新渲染)
```js
document.onclick = function () {
  
  // 通过$data访问挂载的数据
  app.$data.message = "hello vue"
  app.$data.count = 100
  app.$data.msg = "我不好"

  // 通过实例化对象访问数据 => 写法更简单
  app.message = '你好'
  app.count = 10
  app.msg = "ok"
}
```
### 4. Vue的模版语法
#### 4-1 文本插值
- 常见的文本插值用法
  - 可以在文本插值中使用 data中绑定的数据 => 不同的数据渲染的结果也不一样
    + string,number,boolean function => 会正常的渲染到页面上(隐式转换为字符串,toString)
    + null 和 undefined => 将不会渲染到页面上(变成空字符串)
    + 数组和对象会先转换成JSON字符串 再渲染到页面上
  - 可以再文本插值中使用JavaScript表达式 (由运算符和操作数(变量和常量)组成的式子)
  - 可以在文本插值中使用函数 (data/methods)
    + 建议将函数写在methods中
```js
var vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello',
    count: 100,
    bool: true,
    a: null,
    b: undefined,
    arr: [1, 2, 3],
    obj: { a: 1, b: 2 },
    fn: function () {
      console.log(111)
    }
  },
  methods: {
    say: function () {
      return 1
    }
  }
})
```
#### 4-2 指令(Directives)
- 指令(Directives) => vue在标签内设置的自定义属性 => 属性名统一使用 v- 开头
- v-前缀开头的特殊属性(attribute),指令属性的值预期是单个 JavaScript 表达式,指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
- 注意: 指令属性的值预期是一个JavaScript表达式 => 将表达式的执行结果作为指令的最终结果
##### 4-2-1 指令的用法格式一
- v-指令名称="指令值"
- v-html => 根据指令的值设置元素的html结构(html解构包含标签和文本) => 可以只设置文本
- v-text => 根据指令的值设置元素的文本内容 => 只能设置文本内容
- v-pre  => 并不是所有时候都想{{}}生效,可以禁用双大括号语法 => 禁用后{{}}会作为普通文本渲染
- v-clock => 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 \[v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕
```html
<style>
  [v-cloak] {
  display: none;
  }
</style>
<body>
  <div v-cloak> // 当vue实例初始化渲染完成,会把v-block属性移除
  {{ message }}
  </div>
</body>
```
```html
<body>
  <div id="app">
    <!-- {{}}文本插值本质上属于拼接(替换)操作 -->
    <p>{{message}}</p>

    <!-- html属性的值作为{{}}内的文本拼接 -->
    <!-- <p>{{html}}</p> -->
    <p v-html="html"></p>
    <p v-html="'<b>okok</b>'"></p>
    <p v-text="message"></p>

    <p v-pre>{{这是一段文本}}</p>
  </div>
</body>
<script>
// v-html => 根据指令的值设置元素的html结构(html解构包含标签和文本) => 可以只设置文本
// v-text => 根据指令的值设置元素的文本内容 => 只能设置文本内容
// v-pre  => 并不是所有时候都想{{}}生效,可以禁用双大括号语法 => 禁用后{{}}会作为普通文本渲染
var vm = new Vue({
  el: "#app",
  data: {
    message: 'hello world',
    html:"<b>okok</b>"
  },
})
```
##### 4-2-2 指令的用法格式二
- v-指令名称:参数="指令值"
- v-bind 动态绑定属性,将data中绑定的数据作为标签内的某个属性(根据参数来定)的属性值
```html
<body>
  <div id="app">
    <!-- 有时候希望将data中的绑定数据作为 标签内属性的属性值 -->
    <!-- v-bind 动态绑定属性,将data中绑定的数据作为标签内的某个属性(根据参数来定)的属性值 -->
    <p v-bind:id="idName" v-bind:class="className">{{message}}</p>
  </div>
</body>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      message: 'hello world',
      idName:'one',
      className:'go'
    },
  })
```
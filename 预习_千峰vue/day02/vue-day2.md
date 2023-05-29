# vue-day2笔记
## 1. 注意事项
1. 挂载的数据只能在挂载的元素中使用
2. 一般情况下,一个页面建议只有一个根实例(单页面应用做准备)
3. 一般情况下,如果选项配置(options)中没有template属性,默认使用挂载的outerHTML作为编译的模版
  - 如果设置了template属性,将会以template属性的值作为编译模版
4. 单个根元素(一个模版中只能有一个根元素 => 根实例/组件 => vue2的要求 => v3可以有多个同级元素作为根元素)
5. 默认情况下,可以通过选项配置(options)中的el属性设置挂载的元素
6. vue实例(都可以通过原型属性\[[prototype]]访问构造函数的原型对象 Vue.prototype)
![](./vue%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1%E4%B8%8A%E7%9A%84%E6%96%B9%E6%B3%95.png)
  - 如果在创建实例化对象时没有挂载元素,可以使用原型对象上的 $mount(select)方法
```js
var vm = new Vue({
  data: {
    message: 'hello Vue',
    count: 10,
    bool: true
  },
  // 如果添加了template属性,原本的结构会被覆盖
  // template: `<h1>{{message}}</h1>`
})
console.log(vm) // vue实例(都可以通过原型属性[[prototype]]访问构造函数的原型对象 Vue.prototype)
vm.$mount('#app')
```
## 2. 使用v-bind动态绑定属性
- 动态绑定属性 => 将vue实例中的数据绑定到标签中 作为某个属性的属性值
```html
<div v-bind:class="cls" :id="id"></div>
<script>
new Vue({
  el: '#app',
  data: {
    id: 'one',
    cls: 'box'
  }
})
</script>
```
## 3. 使用v-bind 绑定clsss和style
### 3-1 使用v-bind 绑定clsss
1. 一般情况下 v-bind指令的结果要求是字符串类型,如果不是字符串会隐式转换为字符串(如果属性的值是 null 和 undefined 该属性不会动态绑定)
2. 操作元素的 class 列表和内联样式是数据定的一个常见需求, v-bind 用于 class 和 style 时,vue.js做了专门的增强,表达式的结果的类型除了字符串之外,可以是数组或者对象
```html
<div id="app">
    <!-- 静态绑定属性 -->
    <div class="box" id="one"></div>
    <!-- 动态绑定多class名 => 绑定的是data中对应属性名的值 -->
    <div v-bind:class="list" id="one"></div>
    <div v-bind:class="obj" id="one"></div>
    <div v-bind:class="comb" id="one"></div>
    <div v-bind:class="{one:true,active:count%2==0}" id="one"></div>
    <!-- 批量绑定属性 -->
    <div v-bind="objStr"></div>
  </div>
</body>

<script>
/* 
  v-bind
    1. 一般情况下 v-bind指令的结果要求是字符串类型,如果不是字符串会隐式转换为字符串(如果属性的值是 null 和 undefined 该属性不会动态绑定)
    2. 操作元素的 class 列表和内联样式是数据定的一个常见需求, v-bind 用于 class 和 style 时,vue.js做了专门的增强,表达式的结果的类型除了字符串之外,可以是数组或者对象
*/

  new Vue({
    el: '#app',
    data: {
      count: 2,
      cls1: 'one',
      list: ['one', 'two', 'three'], // 如果属性值是数组会自动用空格拼接成字符串
      obj: {
        // 对象的键名就是要拼接的class名,键值表示是否拼接(true拼接,false拼接)
        "one": true,
        "two": false,
        "three": true
      },
      objStr:{
        id:'demo',
        class:'one',
      }
      comb: ['one', { two: true }, 'three'] // 组合版
    }
  })
</script>
```
### 3-2 v-bind绑定style
```html
<body>
  <div id="app">
    <!-- 动态绑定style样式 -->
    <div id="one" style="color: blueviolet;">111</div>
    <div id="one" :style="styleStr">111</div>
    <div id="one" :style="styleObj">111</div>
    <div id="one" :style="styleList">111</div>
  </div>
</body>
<script>
/* 
v-bind
  1. 一般情况下 v-bind指令的结果要求是字符串类型,如果不是字符串会隐式转换为字符串(如果属性的值是 null 和 undefined 该属性不会动态绑定)
  2. 操作元素的 class 列表和内联样式是数据定的一个常见需求, v-bind 用于 class 和 style 时,vue.js做了专门的增强,表达式的结果的类型除了字符串之外,可以是数组或者对象
*/
  new Vue({
    el: '#app',
    data: {
      styleStr: 'color: blueviolet;',
      styleObj: {
        color: "red",
        fontSize: '20px'
      },
      styleList: [{
        color: "red",
        fontSize: '20px'
      }, {
        lineHeight: "100px"
      }]
    }
  })
</script>
```
## 4. v-on绑定事件
- vue中绑定事件的方式
  - 触发事件时执行对应的JavaScript表达式
  - 触发事件时执行对应的事件函数
  - 触发事件执行对应的事件函数,在事件函数中调用传入的函数,此写法可以自己定义传入的参数,想接收事件对象传入第二参数$event => 官方定死的
```html
<body>
  <div id="app">
    <!-- vue中绑定事件的方式 -->
    <!-- 1. 触发事件时执行对应的JavaScript表达式 -->
    <button v-on:click="count++">点击add</button>
    <!-- 2. 触发事件时执行对应的事件函数,函数可以接受一个形参表示事件对象 -->
    <button v-on:click="addCount">点击add</button>
    <!-- 3. 触发事件执行对应的事件函数,在事件函数中调用传入的函数,此写法可以自己定义传入的参数,想接收事件对象传入第二参数$event => 官方定死的 -->
    <button v-on:click="addN(10,$event)">加N</button>
    <p>
      {{ count }}
    </p>
  </div>
</body>
<script>
  new Vue({ 
    el: '#app',
    data: {
      count: 0
    },
    methods: {
      addCount: function (e) {
        console.log('事件对象', e)
        this.count++
      },
      addN: function (n = 1, e) {
        console.log("事件对象", e);
        this.count += n
      }
    },
  })
</script>
```
### 4-1 v-on事件绑定简写
- v-on:click可以直接简写为@click
### 4-2 v-on事件修饰符
1. .stop    => 阻止事件冒泡
2. .prevent => 阻止默认事件
3. .capture => 以事件捕获机制触发事件
4. .self    => 只有元素自身才会触发事件
5. .once    => 事件只会触发一次
6. .passive => 用于提升移动端性能,一般配合.prevent使用
```html
<body>
  <div id="app">
    <div>
      <h2>默认冒泡</h2>
      <div class="wrap" @click="wrapHander">
        <div class="sub" @click="subHander"></div>
      </div>
    </div>
    <div>
      <h2>.stop修饰符(阻止冒泡)</h2>
      <div class="wrap" @click="wrapHander">
        <div class="sub" @click.stop="subHander"></div>
      </div>
    </div>
    <div>
      <h2>.capture修饰符(捕获阶段执行)</h2>
      <div class="wrap" @click.capture="wrapHander">
        <div class="sub" @click.capture="subHander"></div>
      </div>
    </div>
    <div>
      <h2>.self修饰符(只有自己可以触发)</h2>
      <!-- e.target == this  事件源必须是元素本身 -->
      <div class="wrap" @click.self="wrapHander">
        <div class="sub"></div>
      </div>
    </div>
    <div>
      <h2>.once修饰符(事件触发一次之后就被移除了)</h2>
      <!-- 绑定的事件触发一次之后就被移除了 -->
      <div class="wrap" @click.once="wrapHander">
        <div class="sub"></div>
      </div>
    </div>
    <div>
      <h2>.prevent修饰符(阻止默认行为)</h2>
      <a href="https://www.baidu.com" @click.prevent>百度</a>
      <form action="" @submit.prevent>
        <button>提交</button>
      </form>
    </div>
  </div>
</body>
<script>
  /* 
    指令的常见用法
      1. v-指令名称 = '指令值'
        => v-html  v-text  v-pre
      2. v-指令名称:参数 = '指令值'
        => v-bind:id  v-bind:class  v-on:click
      3. v-指令名称:参数.修饰符.修饰符.修饰符 = '指令值'
        => v-on:click.stop
  */
  new Vue({
    el: '#app',
    data: {

    },
    methods: {
      wrapHander() {
        console.log("wrap被点击了")
      },
      subHander() {
        console.log("sub被点击了")
      },
    },
  })

</script>
```
### 4-3 v-on按键修饰符
- 只有按下特定的按键才会触发事件
- .enter => 回车键
- .f5    => f5键才会触发,但是需要先用.prevent阻止默认的刷新事件
- .left  => 左键
- .right => 右键
- .up    => 上键
- .down  => 下键
- ...... 可以看vue2的文档
```html
<body>
  <div id="app">
    <div>
      <h2>按键修饰符</h2>
      <p>
        <!-- 只有按下回车键才会触发 -->
        <input type="text" @keydown.enter="keyupHandler">
      </p>
    </div>
  </div>
</body>
<script>
  new Vue({
    el: '#app',
    data: {

    },
    methods: {
      keyupHandler(e) {
        console.log('按的那个键', e.key)
        console.log('键盘码', e.keyCode)
      }
    },
  })
</script>
```
### 4-4 系统修饰符
- .ctrl
- .alt
- .shift
- .meta
### 4-5 .exact修饰符
-  修饰符允许你控制由精确的系统修饰符组合触发的事件
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```
## 5. 钩子函数
- 钩子函数(mounted) => vue实例初始化渲染完毕之后执行的函数(有就执行,没有就不执行)
```js
var vm = new Vue({
  el: '#app',
  data: {
    // num: Math.random(),
    num: null,

  },
  methods: {
    clickHandler() {
      this.num = Math.random() * 100
    }
  },
  // 钩子函数(mounted) => vue实例初始化渲染完毕之后执行的函数(有就执行,没有就不执行)
  mounted() {
    console.log('初始化完毕');
    this.clickHandler() // 在vue根实例渲染完毕之后,自动执行一次这个函数
  },
})
```
## 6. v-if,v-else,v-else-if条件渲染以及v-if条件渲染分组
### 6-1 v-if,v-else,v-else-if条件渲染
- v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染
- v-if='指令值' 指令结果为true => 渲染,反之不渲染
```html
<body>
  <div id="app">
    <div>
      <h2>v-if,v-else,v-else-if条件渲染</h2>
      <button @click="clickHandler">获取随机数</button>

      <!-- v-else就是v-if的else块 -->
      <p>是否大于50
        <span v-if="num>50">大于</span>
        <span v-else>不大于</span>
      </p>

      <p>数值等级
        <span v-if="num>95">A++</span>
        <span v-else-if="num>90">A</span>
        <span v-else-if="num>80">B</span>
        <span v-else-if="num>70">C</span>
        <span v-else-if="num>60">D</span>
        <span v-else>没有等级</span>
      </p>
    </div>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      // num: Math.random(),
      num: null,

    },
    methods: {
      clickHandler() {
        this.num = Math.random() * 100
      }
    },

    // 钩子函数(mounted) => vue实例初始化渲染完毕之后执行的函数(有就执行,没有就不执行)
    mounted() {
      console.log('初始化完毕');
      this.clickHandler() // 在vue根实例
    },
  })
</script>
```
### 6-2 v-if条件渲染分组
- 如果想同时渲染多个元素,又不想包裹无意义的标签,可以选择template标签,可以把template当做一个不可见的包裹元素
```html
<body>
  <div id="app">
    <div>
      <h2>v-if条件渲染分组</h2>
      <div>
        <!-- 方法1 包裹父元素,以父元素判断 => 缺点:比预期多了一个div -->
        <div v-if="isLogin">
          <span>欢迎,xxx</span>
          <span>退出登录</span>
        </div>

        <div v-else>
          <a href="">你好请登录</a>
          <a href="">免费注册</a>
        </div>

        <!-- 方法2 用法和1一样,但是template标签,在被vue解析成真实的dom过程中不会渲染到页面中 -->
        <template v-if="isLogin">
          <span>欢迎,xxx</span>
          <span>退出登录</span>
        </template>

        <template v-else>
          <a href="">你好请登录</a>
          <a href="">免费注册</a>
        </template>
      </div>
    </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      isLogin: false,
    },
  })
</script>
```
## 7. v-show条件展示
- v-show 指令用于条件性的展示一段内容,这块内容只会在指令的表达式返回 truthy 值的时候被展示
- v-show='指令值' 指令结果为true => 展示,反之不展示 => 使用的是display:none和display:block
- v-show 无论条件是否成立,都会被渲染到页面上,区别就是元素是否被展示(视觉方面)
```html
<div id="app">
  <div>
  <h2>v-show条件展示</h2>
  <div id="app">
    <div>
      <h2>v-if,v-else,v-else-if条件渲染</h2>
      <button @click="clickHandler">获取随机数</button>

      <p>是否大于50
        <span v-show="num>50">大于</span>
        <span v-show="num<50">不大于</span>
      </p>
      <p>数值等级
        <span v-show="num>95&&num<=100">A++</span>
        <span v-show="num>90&&num<=95">A</span>
        <span v-show="num>80&&num<=90">B</span>
        <span v-show="num>70&&num<=80">C</span>
        <span v-show="num>60&&num<=70">D</span>
        <span v-show="num<60">没有等级</span>
      </p>
    </div>
  </div>
</div>
```
## 8. v-for列表渲染
**注意: 遍历的元素,只能在标签内使用 => 也有一个类似作用域**
**可以使用in或者of都可以,in 和 of 没有区别,只是of更接近与迭代语法**
- 遍历数组
  - 语法: v-for:="(item,index) of list"

    + -> list => 循环的元素
    + -> item => 数组内的元素
    + -> index => 对应元素的下标
- 遍历对象
  - 语法: v-for="(val,key,index) of obj
    + -> val => 对象的键值
    + -> key => 对象的键名
    + -> index => 对象的下标
- 遍历数值
  - 语法: v-for="(n,i) of 100
    + -> n => 会从1开始
    + -> i => 就是下标
    + -> 100 => 是终止值
```html
<body>
  <div id="app">
    <div>
      <h2>v-for列表渲染</h2>
      <ul>
        <h2>遍历数组</h2>
        <li v-for="(item,index) of list">
          {{ item }}---{{index}}
        </li>
        <h2>遍历对象</h2>
        <li v-for="(val,key,index) of obj">
          {{ key }}---{{val}}---{{index}}
        </li>
        <h2>遍历数值</h2>
        <li v-for="(n,i) of 100">
          {{ n }}---{{ i }}
        </li>
      </ul>
    </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      list: [1, 4, 7, 2, 5, 8, 3, 6, 9],
      obj: {
        name: '张三',
        age: 18,
        height: 180,
        width: '70kg'
      }
    },
  })
</script>
```
### 8-2 v-for内的key属性
- 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染
- 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出
- 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute
- 建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升
```html
<ul>
  <li v-for="item,index of list" :key="index">
    {{ item }}
  </li>
</ul>
```
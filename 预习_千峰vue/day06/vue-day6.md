# vue-day6
## 1. 组件的生命周期
### 1-1 初始化阶段
- 示例图
![](./%E7%BB%84%E4%BB%B6%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F-%E5%88%9D%E5%A7%8B%E5%8C%96.png)
- **子组件什么时候会被初始化**
  - 1. 父组件解析template过程中,遇到子组件
  - 2. 触发子组件的初始化渲染
- **根组件/父组件先经过初始化阶段**
  - 1. 进入模版编译阶段
  - 2. 解析template为 虚拟DOM
  - 3. 此时会遇到子组件(自定义标签)
  - 4. 触发子组件的初始化
  - 5. 子组件根据option选项内的template生成虚拟DOM,并解析为真实DOM(父组件还在等待子组件解析)
  - 6. 将解析得到的真实DOM传递给父组件
  - 7. 替换子组件的自定义标签
  - 8. 等所有的子组件解析完毕
  - 9. 父组件再将虚拟DOM解析为真实DOM
### 1-2 更新阶段
- 组件的更新阶段如何触发
  - 子组件自身的数据发生改变 => 就进入更新阶段(只会触发组件自身的更新阶段)
  - 子组件接受了父组件动态传递的数据 => 父组件传入的数据,就是子组件接收的数据
    + -> 父组件数据发生改变 => 触发父组件的更新阶段 => 父组件解析template为虚拟dom => 触发子组件的更新阶段 => 解析子组件的template虚拟dom => 传递给父组件(作为父组件的虚拟dom) => 父组件继续向后解析 => 直到将所有的组件解析完毕 => 通过diff算法更新真实dom
```html
<body>
  <div id="app">
    <p>{{count}}</p>
    <button @click="count++">加</button>
    <comp-a :count.sync="count"></comp-a>
  </div>
</body>
<template id="compA">
  <div class="compA">
    这是组件A:{{count}}
    <button @click="$emit('update:count',count+1)">子组件加</button>
  </div>
</template>
<script>
  Vue.component('compA', {
    props: ['count'],
    data() {
      return {}
    },
    template: "#compA",
    methods: {},
    beforeUpdate() {
      console.log("5 beforeUpdate:子组件", this.count);
    },
    updated() {
      console.log("6 updated:子组件", this.count);
    },
  })
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    beforeUpdate() {
      console.log("5 beforeUpdate:父组件", this.count);
    },
    updated() {
      console.log("6 updated:父组件", this.count);
    },
  })
</script>
```
### 1-3 销毁阶段
- 如何触发销毁阶段
  - 子组件自己调用销毁方法 $destroy (不影响其他组件 -> 一般不会出现)
  - 子组件不再被父组件引用(子组件被卸载) => 在销毁前钩子函数清除绑定的自定义事件已经定时器延时器
```html
<body>
  <div id="app">
    <p>{{count}}</p>
    <button @click="count++">加</button>
    <hr>
    <button @click="isShow=!isShow">子组件是否显示</button>
    <comp-a v-if="isShow" :count.sync="count"></comp-a>
  </div>
</body>
<template id="compA">
  <div class="compA">
    这是组件A:{{count}}
    <button @click="$emit('update:count',count+1)">子组件加</button>
    <button @click="$destroy()">自行销毁</button>
  </div>
</template>
<script>
  Vue.component('compA', {
    props: ['count'],
    data() {
      return {
        timer: null
      }
    },
    template: "#compA",
    methods: {
      testHandler() {
        console.log('test被触发了');
      }
    },
    mounted() {
      console.log("4 子组件挂载完毕");
      // 绑定自定义事件
      this.$on('test', this.testHandler)
      // 绑定定时器
      this.timer = setInterval(() => {
        console.log(1111)
      }, 100)
    },
    beforeDestroy() {
      // 清除自定义事件
      this.$off('test', this.testHandler)
      // 清除计时器
      clearInterval(this.timer)
      console.log('7 beforeDestroy:子组件', this.count);
    },
    destroyed() {
      console.log('8 destroyed:子组件', this.count);
    },
  })
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1,
      isShow: false
    },
    beforeDestroy() {
      console.log('7 beforeDestroy:父组件', this.count);
    },
    destroyed() {
      console.log('8 destroyed:父组件', this.count);
    },
  })
</script>
```
## 2. 初识element UI
- 网站快速成型工具
- Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库(pc端)
- 先引入vue2的js文件再引入组件库的js文件,否则会没有效果
## 3. 插槽
### 3-1 插槽初识-以及插槽基本使用方法
- 为什么会有插槽
  - 组件内的按钮内容是死的 => 想变成活的 => 传入一个属性来定义按钮内容
  - 父组件传入的内容可能是 text html结构 其他组件 => 通过属性接收后期不好解析
- 官方提供了插槽功能 => 在组件内<slot></slot>标签 作为占位符
  - -> 父组件使用子组件时可以在组件的标签对内,传入一些文本 html结构 组件 => 被子组件接收之后 => 会替换子组件原本的插槽标签
- 编译作用域
  - -> 虽然标签对内的内容最终会放到子组件中,但是他是属于父组件给子组件传入的
  - -> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的
- 后备内容(默认值)
  - -> slot标签对中的内容会作为后备内容(默认值)
  - -> 组件被调用时传入内容,就使用传入的,否则就使用后备内容(默认的)
```html
<body>
  <div id="app">
    <!-- 父组件使用子组件时可以在组件的标签对内,传入一些文本 html结构 组件 => 被子组件接收之后 => 会替换子组件原本的插槽标签 -->
    <my-button>
      我的按钮
    </my-button>
    <my-button>
      <i>字体图标 : </i> 按钮
    </my-button>
    <my-button>
      按钮{{count}}
    </my-button>
  </div>
</body>
<template id="demo">
  <div class="my-button">
    <button>
      <!-- 官方提供了插槽功能 => 在组件内<slot></slot>标签 作为占位符 -->
      <slot>默认按钮</slot>
    </button>
  </div>
</template>
<script>
  Vue.component('my-button', {
    props: ['text'],
    data() {
      return {
      }
    },
    template: `#demo`,
  })
  var vm = new Vue({
    el: '#app',
    data: {
      count:1
    }
  })
</script>
```
### 3-2 具名插槽
- 可以在组件内定义多个插槽 分别赋予不同的名字
- 父组件向子组件传递插槽内容时,也要对应名字区分
```html
<body>
  <div id="app">
    <my-article>
      <template v-slot:header>
        <h2>Vue介绍</h2>
      </template>
      <!-- v-slot:default -->
      <template>
        说到这里，大师脸上流露出一丝冷笑，“很多人都认为，蓝银草是废武魂，但经过我多年的研究，蓝银草同样有属于自己的作用。如果不是蓝银草在觉醒时产生的魂力过于弱小，哪怕是成为战魂师，也并不是不可能的。
      </template>
      <template v-slot:footer>
        <h3>作者:xxx</h3>
      </template>
    </my-article>
  </div>
</body>

<template id="compB">
  <div class="article" :style="{color:color}">
    <div class="article-header">
      <slot name="header"></slot>
    </div>
    <div class="article-container">
      <!-- name:default -->
      <slot></slot>
    </div>
    <div class="article-foot">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
  Vue.component('MyArticle', {
    data() {
      return {
        color: '#666666'
      }
    },
    template: "#compB",
  })

  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    }
  })
</script>
```
### 3-3 插槽作用域
- 父组件给子组件传入插槽内容时,可以使用子组件中的部分数据(子组件slot 标签中动态传入的数据)
- 子组件可以通过特殊手段,将组件内的某些数据通过插槽传递到组件外
- 传递的数据会自动整合为一个对象(属性名作为对象的键名)=> {day,hour,min,sec}
- 父组件可以借助v-slot对应插槽名称,用指令值接收数据,可以在template标签中v-slot:name="指令值"
```html
<body>
  <div id="app">
    <my-count-down :times="15 * 60 * 60 * 1000">
      <!-- slotScope 对应接收组件内传出的对象数据 -->
      <template v-slot:default="slotScope">
        <!-- {{slotScope}} -->
        距离秒杀结束还有{{slotScope.day}}天{{slotScope.hour}}时{{slotScope.min}}分{{slotScope.sec}}秒
      </template>
    </my-count-down>

    <!-- 可以对插槽内容进行解构 -->
    <my-count-down :times="15 * 60 * 60 * 1000">
      <template v-slot:default="{day,hour,min,sec}">
        <!-- {{slotScope}} -->
        距离秒杀结束还有{{day}}天{{hour}}时{{min}}分{{sec}}秒
      </template>
    </my-count-down>
  </div>
</body>

<template id="demo">
  <div class="countDown">
    <!-- 
      子组件可以通过特殊手段,将组件内的某些数据通过插槽传递到组件外
      传递的数据会自动整合为一个对象(属性名作为对象的键名) => {day,hour,min,sec}
     -->
    <template>
      <slot name="default" :day="day" :hour="hour" :min="min" :sec="sec">{{hour}}:{{min}}:{{sec}}</slot>
    </template>
  </div>
</template>
<script>
  Vue.component('my-count-down', {
    props: {
      times: {
        type: Number,
        required: true
      },
      format: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        // time: 4 * 60 * 60 * 1000, // 定值 
        time: this.times, // 单位ms 从父组件接收 作为time的初始值
        timer: null
      }
    },
    template: `#demo`,
    methods: {
      beauty(val) {
        return val.toString().padStart(2, '0')
      },
      timeDown() {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.time -= 1000
          if (this.time <= 0) {
            clearInterval(this.timer)
          }
        }, 1000);
      }
    },
    computed: {
      day() {
        return this.beauty(parseInt(this.time / (24 * 60 * 60 * 1000)))
      },
      hour() {
        return this.beauty(parseInt(this.time / (60 * 60 * 1000)) % 24)
      },
      min() {
        return this.beauty(parseInt(this.time / (60 * 1000)) % 60)
      },
      sec() {
        // 总的时间(ms)/1000 => xxx秒(总秒数) % 60  
        return this.beauty(parseInt(this.time / 1000) % 60)
      },
      formatStr() {
        return this.format.replace('DD', this.day).replace('HH', this.hour).replace('mm', this.min).replace('ss', this.sec)
      }
    },
    mounted() {
      this.timeDown()
    },
  })
  var vm = new Vue({
    el: "#app",

  })
</script>
```
### 3-4 插槽简写
- 可以直接把 v-solt 简写成 # 
# vue-day3笔记
## 1. 变更数组和非变更数组
- 更新方法 => Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新 => 影响原数组的方法
  - push()
  - pop()
  - shift()
  - unshift()
  - splice()
  - sort()
  - reverse()
- 非变更方法(替换数组) => 它们不会变更原始数组，而总是返回一个新数组
- 想让他们能在视图上更新,直接对应原属性名赋值给原属性
  - filter()
  - concat()
  - slice()
  - map()
- 无法检测数组更新操作
  - 直接对应下标赋值
    + this.list\[0] = 10
  - 修改数组的length
    + this.list.length--
  - 如果想要在视图上更新有两种办法
    + this.$forceUpdate() => 强制更新视图
    + Vue.set(target,key,val) => 向嵌套的对象/数组添加响应式的property
    + this.$set(target,key,val) => 向嵌套的对象/数组添加响应式的property
```js
this.$forceUpdate()
this.$set(this.list, 0, 100)
```
##  2. $set()方法应用
- 对于已经创建的实例，Vue 不允许动态添加根级别(data)的响应式 property(属性)
- 但是，可以使用 Vue.$set(object, propertyName, value) 方法向嵌套对象添加响应式 property(属性)
- 当被添加的属性发生改变时 => 也会被数据监听捕获到,触发视图更新
```html
<body>
  <div id="app">
    <p>{{a}}</p>
    <p>
      <button @click="a++">add</button>
    </p>
    <p>{{info.b}}</p>
    <p>
      <button @click="info.b++">add</button>
    </p>
  </div>
</body>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      // 初始化渲染过程中,对data中的属性a 绑定了数据监听,当a的值发生变化以后会触发视图更新
      a: 1,
      // b: 2,  提前将数据挂载到data中(可以监听到数据的变化)
      info: {
        // b:2
      }
    },
    // 钩子函数
    mounted() {
      // 但是有的时候希望在某些异步操作结束之后 => 自己定义数据挂载到data上
      // this.b = 20 // 通过实例化对象新增属性b => 等价于对 data.b 进行赋值 => 但是data中没有定义b属性

      // this.$set(this.$data, 'b', 2) // 对于已经创建的实例，Vue 不允许动态添加根级别(data)的响应式 property(属性)

      // 但是，可以使用 Vue.$set(object, propertyName, value) 方法向嵌套对象添加响应式 property(属性)
      // 当被添加的属性发生改变时 => 也会被数据监听捕获到,触发视图更新
      this.$set(this.info, 'b', 2)
    },
  })
</script>
```
## 3. v-for和v-if同时使用
- 当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用
```html
<ul>
  <!-- 先渲染对应list元素个数的li,再对每个li进行v-if条件渲染判断 -->
  <li v-for="(item,index) of list" :key="index"  v-if="item%2==0" >
    {{ item }}
  </li>
</ul>

<!-- 有数据就渲染,否则不渲染 -->
<ul v-if="list.length>0">
  <li v-for="(item,index) of list" :key="index">
    {{ item }}
  </li>
</ul>
```
## 4. 基于vue实现v-model
- v-model 双向数据绑定 => 数据发生改变会更新视图 => 修改视图中的内容,数据也会更新
- 将data中的message数据和input框中的value绑定,数据发生变化,会更新视图
- 监听input框内容改变,当input内容发生改变时,将对应的value值赋值给message => 修改视图中的内容,数据也会更新
```html
<div id="app">
  <p>
    <input type="text" :value="message" @input="message=$event.target.value">
    <!-- <input type="text" :value="message" @input="($event)=>{message=$event.target.value}"> -->
  </p>
  <p>message:{{ message }}</p>
  <p><button @click="message='hello'">修改message</button></p>

  <hr>

  <!-- vue中提供的v-model指令 -->
  <!-- 只有input:text,textarea 会通过v-model将value和数据进行双向绑定-->
  <p>
    <input type="text" v-model="msg">
  </p>
  <p>message:{{ msg }}</p>
  <p><button @click="msg='hello'">修改msg</button></p>
</div>
<script>
  /* 
    v-model 双向数据绑定 => 数据发生改变会更新视图 => 修改视图中的内容,数据也会更新
      1. 将data中的message数据和input框中的value绑定,数据发生变化,会更新视图
      2. 监听input框内容改变,当input内容发生改变时,将对应的value值赋值给message => 修改视图中的内容,数据也会更新
  */
  var vm = new Vue({
    el: '#app',
    data: {
      message: '',
      msg:''
    }
  })
</script>
```
### 4-1 v-model双向数据绑定
- v-model 双向数据绑定 => 数据发生改变会更新视图 => 修改视图中的内容,数据也会更新
- 你可以用 v-model 指令在表单 \<input>、\<textarea> 及 \<select> 元素上创建双向数据绑定
- 但 v-model 本质上不过是语法糖,它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
- v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件
  - **text 和 textarea 元素使用 value property 和 input 事件**
```html
<div>
  <h2>单行文本框</h2>
  <!-- vue中提供的v-model指令 -->
  <!-- 会通过v-model将value和数据进行双向绑定,并在内容改变时修改数据-->
  <p>
    input:<input type="text" v-model="msg">
  </p>
  <p>message:{{ msg }}</p>
  <p><button @click="msg='hello'">修改msg</button></p>
</div>
<div>
  <h2>textarea</h2>
  <!-- vue中提供的v-model指令 -->
  <!-- 会通过v-model将value和数据进行双向绑定,并在内容改变时修改数据-->
  <p>
    textarea:<textarea v-model="content" cols="30" rows="10"></textarea>
  </p>
  <p>content:{{ content }}</p>
  <p><button @click="content='hello'">修改content</button></p>
</div>
```
  - **单个 checkbox 使用 checked property 和 change 事件**
```html
<div>
  <!-- 单个checkbox 使用 checked property 和 change 事件 -->
  <h2>单个复选框</h2>
  <p>
    复选框:<br>
    <input type="checkbox" v-model="isChecked">
  </p>
  <p>isChecked:{{ isChecked }}</p>
  <p><button @click="isChecked=false">修改isChecked</button></p>
</div>
```
  - **多个checkbox 使用 value property 和 change 事件,当v-model对应的数组中包含对应的value,复选框也会被选中,否则取消选中**
```html
<div>
  <!-- 多个checkbox 使用 value property 和 change 事件,当v-model对应的数组中包含对应的value,复选框也会被选中,否则取消选中 -->
  <h2>多个复选框</h2>
  <p>
    爱好:<br>
    <label>
      <input type="checkbox" value="sing" v-model="hobby">唱
    </label>
    <label>
      <input type="checkbox" value="dance" v-model="hobby">跳
    </label>
    <label>
      <input type="checkbox" value="rap" v-model="hobby">rap
    </label>
  </p>
  <p>hobby:{{ hobby }}</p>
  <p><button @click="hobby=['sing']">修改hobby</button></p>
</div>
```
  - **radio 使用 value property 和 change 事件**
```html
<div>
  <!-- radio 使用 value property 和 change 事件 -->
  <h2>单选框</h2>
  <p>
    sex:<br>
    <label>
      <input type="radio" name="sex" v-model="sex" value="man">男
    </label>
    <label>
      <input type="radio" name="sex" v-model="sex" value="woman">女
    </label>
    <label>
      <input type="radio" name="sex" v-model="sex" value="secret">保密
    </label>
  </p>
  <p>sex:{{ sex }}</p>
  <p><button @click="sex='secret'">修改sex</button></p>
</div>
```
  - **select 使用 value property 和 change 事件,当option中有value属性,优先使用value属性,如果下拉框中没有value属性,则使用option标签对中的文本**
```html
<div>
  <h2>下拉框</h2>
  <!-- select 使用 value property 和 change 事件,当option中有value属性,优先使用value属性,如果下拉框中没有value属性,则使用option标签对中的文本 -->
  <select v-model="level">
    <option value="">请选择等级</option>
    <option value="4">A</option>
    <option value="3">B</option>
    <option value="2">C</option>
    <option value="1">D</option>
  </select>
  <p>level:{{ level }}</p>
  <p><button @click="level='2'">修改level</button></p>
</div>
```
### 4-2 v-model值绑定
- 对于单选按钮，复选框及选择框的选项，v-model 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)
- 但是有时我们可能想把值绑定到 Vue 实例的一个动态 property 上，这时可以用 v-bind 实现，并且这个 property 的值可以不是字符串
```html
<body>
  <div id="app">
    <div>
      <!-- 单个checkbox 使用 checked property 和 change 事件 -->
      <h2>单个复选框</h2>
      <p>
        复选框:<br>
        <input type="checkbox" v-model="isChecked">
      </p>
      <p>isChecked:{{ isChecked }}</p>
      <p><button @click="isChecked=false">修改isChecked</button></p>
    </div>

    <div>
      <!-- 单个checkbox  也可以和 value 值绑定 -->
      <h2>单个复选框(值绑定)</h2>
      <p>
        复选框:<br>
        <!-- 静态属性 => 属性值是字符串 -->
        <input type="checkbox" true-value="agree" false-value="disagree" v-model="isagree">
        <!-- 动态属性 => 属性值是true或者false -->
        <!-- <input type="checkbox" :true-value="true" :false-value="false" v-model="isagree"> -->
      </p>
      <p>isagree:{{ isagree }}</p>
      <p v-if="isagree  != null">类型:{{ typeof isagree }}</p>
      <p><button @click="isagree='disagree'">修改isagree</button></p>
    </div>


    <div>
      <h2>下拉框</h2>
      <!-- 内联对象字面量(动态绑定) -->
      <select v-model="obj">
        <option value="">请选择等级</option>
        <option :value="{level:4}">A</option>
        <option :value="{level:3}">B</option>
        <option :value="{level:2}">C</option>
        <option :value="{level:1}">D</option>
      </select>
      <p>obj:{{obj}}</p>
      <p>level:{{ obj.level }}</p>
      <p><button @click="obj.level=4">修改level</button></p>
    </div>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      isChecked: false,
      isagree: null,
      obj: {
        level:4
      }
    }
  })
</script>
```
### 4-3 v-model修饰符
- .lazy修饰符
  - 在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件之后进行同步
- .number修饰符
  - 如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符
  - 这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值
- .trim修饰符
  - 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符
```html
<body>
  <div id="app">
    <div>
      <h2>.lazy修饰符</h2>
      <!-- 默认是input事件,添加了.lazy修饰符后,会将事件改变为onchange事件 -->
      <p>
        oninput:<input type="text" v-model.lazy="msg2">
      </p>
      <p>msg2:{{ msg2 }}</p>
      <p><button @click="msg2='hello'">修改msg2</button></p>
    </div>

    <div>
      <h2>.number修饰符</h2>
      <!-- .number会将输入框内的类型转换为数值类型 -->
      <p>
        oninput:<input type="text" v-model.number="num">
      </p>
      <p>num:{{ num }}</p>
      <p v-if="num!=null">数据类型:{{ typeof num }}</p>
      <p><button @click="num='0'">修改num</button></p>
    </div>

    <div>
      <h2>.trim修饰符</h2>
      <!-- .trim会将输入框内的字符串首尾空格去除-->
      <p>
        oninput:<input type="text" v-model.trim="msg3">
      </p>
      <p>trim:{{ msg3 }}</p>
      <p><button @click="msg3=''">修改msg3</button></p>
    </div>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      msg1: '',
      msg2: '',
      num: null,
      msg3:''
    }
  })
```
## 5. computed 计算属性(派生值 衍生值)
- 是根据data中绑定的数据(一个或多个)得到的数据(派生值 衍生值),计算属性可以依赖data中的一个或者多个数据,并在data绑定完之后默认执行一次对应的函数,将函数的执行结果作为计算属性的属性值,并缓存计算的结果,只有该计算属性依赖的数据发生改变时,绑定的函数才会重新执行,并缓存新的结果
- 计算属性的键名和键值
  - 键名: 计算属性的属性名(如果需要使用此计算属性 通过vue实例获取)
  - 键值: 依赖于函数执行结果(计算属性绑定的函数会在data数据挂载完毕之后默认执行一次,并将函数的执行结果作为计算属性的值,函数中的this指向当前实例)
- **注意点:**
  - 计算属性的初始值会在实例化对象创建之后,Vue的模版编译为虚拟DOM之前先执行一次
  - 基于他们的响应式依赖进行缓存的
  - 不建议在计算属性中使用异步代码(不能执行异步操作)

- 小结: 根据原本的数据得到新数据,新数据依赖原本的数据,如果被依赖的数据发生改变,新数据也会改变,并缓存计算的结果
```html
<body>
  <div id="app">
    <div>
      <h2>计算属性</h2>
      <button @click="sortList">点击排序</button>
      <button @click="addList">点击新增</button>
    </div>
    <ul>
      <li v-for="(item,index) of list" :key="index">
        {{ item }}
      </li>
    </ul>
    <!-- 从数组中筛选出所有的偶数 => 展示偶数数组 => 写起来比较麻烦 -->
    <div>获取偶数集合(普通写法):{{ list.filter(v =>v % 2 == 0) }}</div>
    <!-- 函数版写法没有问题 => 性能上不好 => 每次视图更新都会调用方法 -->
    <div>获取偶数集合(methods方法内):{{ getOu() }}</div>
    <div>获取偶数集合(computed计算属性):{{ getEven }}</div>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      list: [1, 4, 7, 2, 5, 8, 3, 6, 9]
    },
    methods: {
      sortList() {
        this.list.sort((a, b) => a - b)
      },
      addList() {
        var num = Math.round(Math.random() * 100) // 随机一个数
        var index = Math.floor(Math.random() * this.list.length) // 随机一个下标
        this.list.splice(index, 0, num)
      },
      getOu() {
        console.log(1);
        return this.list.filter(v => v % 2 == 0)
      }
    },
    computed: {
      getEven() {
        console.log(2);
        return this.list.filter(v => v % 2 == 0)
      }
    }
  })
</script>
```
### 5-1 计算属性的取值和赋值拦截
- 计算属性默认只有取值,没有赋值
```html
<body>
  <div id="app">
    <p>{{count}}</p>
    <p>{{doubleCount}}</p>
    <button @click="count++">count++</button>
    <button @click="doubleCount+=2">count+2</button>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      count: 1
    },
    computed: {
      // 此写法给计算属性只绑定了一个函数 => 函数默认是取值函数 doubleCount的值依赖于函数的执行结果
      doubleCount() {
        return this.count * 2
      },
      doubleCount: {
        // doubleCount取值时执行的函数
        get() {
          console.log('取值拦截')
          return this.count * 2
        },
        // doubleCount赋值时执行的函数(把val赋值给对应的计算属性是由vue内部操作)
        set(val) {
          console.log('赋值拦截')
          this.count = val / 2
        }
      }
    }
  })

</script>
```
## 6. 数据监听 watch监听属性
- watch监听属性
  - 作用: 对应属性名监听data中某个绑定数据的改变,如果被监听的数据发生改变可以执行一系列副作用操作
    + 可以执行一系列副作用操作 => 如果存在的数据依赖于被监听的属性 => 此时被监听的数据发生改变,依赖此数据的属性也要改变
  - 属性名: 被监听的属性(data中的数据/计算属性)
  - 属性值: 回调函数 => 当被监听的数据发生改变触发,回调函数有两个参数,分别表示新值(newVal)和以前的值(oldVal)
  - **注意: 不适合监听对象属性(监听对象属性需要深度监听)**
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
      count(newVal, oldVal) {
        console.log('触发监听', newVal, oldVal);
        if (newVal >= 0) {
          this.doubleCount = newVal * 2
          this.tripleCount = newVal * 3
        } else {
          this.count = oldVal
        }

      }
    },
  })
</script>
```
## 7. watch(数据监听)和computed(计算属性)的区别
- watch和computed的区别
  - computed: 
    1. 是根据data中绑定的数据(一个或多个)得到的数据(派生值 衍生值),并缓存计算的结果,当被依赖的数据发生改变时,才会重新计算,并缓存结果
    2. 计算属性绑定的函数会在data数据挂载完毕之后默认执行一次,并将函数的执行结果作为计算属性的值
    3. 计算属性不能执行异步操作
  - watch:
    1. 对应属性名监听data中某个绑定数据的改变,如果被监听的数据发生改变可以执行一系列副作用操作
    2. 被watch监听的数据只有在监听的数据发生改变时才会触发对应的回调函数(默认情况下)
    3. watch中可以执行异步操作
## 8. vue请求数据
- 因为vue请求数据需要在vue实例创建完毕之后再发送请求,所以可以使用钩子函数
```html
<body>
  <div id="app">
    <p>{{message}}</p>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: '请求到了吗'
    },
    methods: {
      getRes() {
        // var xhr = new XMLHttpRequest
        // xhr.open('get', '../data/1.txt')
        // xhr.send()
        // xhr.onreadystatechange = () => {
        //   if (xhr.readyState == 4 && xhr.status == 200) {
        //     let res = xhr.responseText
        //     this.message = res
        //   }
        // }

        // 原生js新增 ajax(promise版本)
        fetch('../data/1.json').then(res => {
          console.log(res)
          return res.json()
        }).then(result => {
          console.log(result)
        })
      }
    },
    watch: {
      message(newVal, oldVal) {
        console.log('message发生改变了', newVal, oldVal)
      }
    },
    mounted() {
      this.getRes()
    },
  })
```
## 9. 原生js中新增的ajax(promise版本)
- fetch方法
```js
fetch('../data/1.json').then(res => {
  console.log(res)
  return res.json()
}).then(result => {
  console.log(result)
})
```
## 10. 深入响应式
- 由于 JavaScript 的限制，Vue不能检测数组和对象的变化(对数组和对象的某些操作无法检测)。深入响应式原理中有相关的讨论
- Vue不能检测数组和对象的变化
- Vue封装过程中主要借助 Object.defineProperty() 对data上的属性进行取值拦截和赋值拦截
- 由于数组和对象是引用类型, 此时修改数组中的元素和对象中的数据,数据改变,但是data中对应属性名称引用的内存地址没有改变  -> 不会触发赋值拦截
  - 数组:
    + 变更方法 => 会影响原数组的方法 ,  Vue 将被侦听的数组的变更方法进行了包裹,所以它们也将会触发视图更新
    + 非变更方法(替换数组)  => 不会影响原数组的方法 ,而是返回新数组  =>  直接使用新数组覆盖原数组
  - Vue不能监听数组以下问题
    + this.list\[0] = 1     =>   强制视图更新  Vue.set  this.$set
    + this.list.length--  
  - 对象:
    + 如果要监听的data的属性的属性值也是一个对象, 也对该对象添加Object.defineProperty()拦截 => 如果子对象下的属性改变 => 也会触发视图更新
  - Vue不能监听对象以下问题
    + Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，
  - 解决方法: 
    + 已经创建的实例，Vue 不允许动态添加根级别的响应式 property,可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property  => 不能给data新增数组(但是data下的子对象可以)
```html
<script>
for (let key in data) {
  let initValue = data[key]; // 存储初始值
  Object.defineProperty(data, key, {
    get: function () {  // 对data进行取值时 => 触发此拦截函数
      return initValue;
    },
    set: function (val) {   // 对data进赋值时  => 触发此拦截函数
      console.log("监听到" + key + "发生改变");
      initValue = val;
      render();
    }
  })
}
new Vue({
  el: "#app",
  data: {
      list: [1, 40, 7, 2, 5, 8, 3, 6, 9],
      zhang: { name: "张三", age: 18, height: "177", weight: "70kg" },
  },
  methods: {
    addEle: function () {
      var num = Math.round(Math.random() * 100);
      // this.list.push(num);   // 影响原数组 => 数组的变更方法
      this.list = this.list.concat(num);  // concat方法返回新数组
    },
    editFn: function () {
      // 数组对应下标赋值
      this.list[1] = 40;
      // console.log(this.list);

      // 解决方法1: 
      // this.list.splice(1,1,40);

      // 方法2: 
      var arr = this.list.slice();
      arr[1] = 40;
      this.list = arr;

      // 方法3:
      // Vue.set(obj,key,val)   构造函数Vue的静态方法  => 可以修改Vue中的对象的数据 (可以被vue检测到)
      // vm.$set()   实例化对象上也有此方法 (Vue.prototype.$set)

      Vue.set(this.list,1,40);  
      this.$set(this.list,1,40);  

      // 方法4:
      vm.$forceUpdate()   // 强制更新视图 
      this.list[1] = 40;
      this.$forceUpdate();
    },
    delFn: function () {

      // 方法1:
      this.list.pop();

      // 方法2:
      this.list.length--;
      this.$forceUpdate();
    },
    addProp: function () {
      // this.zhang.sex = "男";
      // console.log(this.zhang);

      // 方法1:
      // Vue.set(obj,key,val) 
      Vue.set(this.zhang, "sex", "男");
      console.log(this.zhang);

      // 方法2
      this.zhang.sex = "男";
      this.$forceUpdate();
    }
  }
})
</script>
```
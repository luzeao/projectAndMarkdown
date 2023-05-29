# vue3 笔记
## 1. proxy代理对象
- Proxy 代理对象 => 根据传入的对象(目标对象)生成代理对象 => 操作目标对象需要通过代理对象完成
```js
var data = {
  name: '张三',
  age: 18,
  height: 178,
  width: 60
}
// new Proxy(data, {})  // 给代理对象设置拦截功能
var obj = new Proxy(data, {
  get(targetObj, key) {  // 取值拦截 => 当对代理对象进行取值
    // return null
    console.log('取值拦截');
    return targetObj[key]
  },
  set(target, key, val) {
    // return false
    target[key] = val
  }
})
obj.name = '李四'
console.log(obj.name);   // 李四
```


## 2. vue3选项式语法
- 在vue3中创建一个应用
```js
const { createApp } = Vue
const app = Vue.createApp(options)
```
- createApp(options) => 根据传入的options对象 创建一个vue实例(应用 每个应用都是一个组件)
1. optinos选项中没有el参数,挂载实例(应用)需要通过,需要通过实例的mount方法
2. createApp() 创建的每一个应用都是一个组件 -> data要写成函数版本
3. Vue实例(应用)中的data methods computed 不会再挂载到实例本身,而是存到一个公共的代理对象(this->代理对象),通过代理对象访问和修改数据
4. 定义组件  混合  指令  依赖注入 => 需要通过app(来定义) => 一般给根应用(定义的就是全局的)

## 3. 组合式语法
- 可以在setup函数中定义数据 方法 计算属性 生命周期钩子函数
- 定义的数据 方法 计算属性 通过return值返回 => 返回的数据和方法和计算属性,就是代理对象接收的
- 如何定义数据
+ ref() => 常用于定义值类型的数据(引用类型也可以)
  - 方法返回一个ref对象 => 对象中存在value属性(取值拦截和赋值拦截)存储传入的数据
  - 监听到value值发生改变,更新视图
  - ref对象 在template和选项式语法中使用时,默认会被解包
    + 取值时会自动获ref对象的value值,存出到porxy对象 => 可以在模版中直接使用
    + 赋值时,将对应的数据存储到ref对象中
    ```html
      <div id="app">
        <p>count: {{count}}</p>
        <p><button @click="count++">addCount</button></p>
        <p><button @click="addCount">addCount</button></p>
      </div>
    ```
    ```js
    const { createApp } = Vue
    const { ref, reactive, readonly } = Vue
    const app = Vue.createApp({
      setup(props) {
        let count = ref(10)
        console.log(count);
        let addCount = () => {
          count.value++  // 在组合式中修改数据要通过ref对象的 .value 语法
        }
        // 原理 -> 闭包
        return {
          count: count,
          addCount: addCount
        }
      },
      // 依旧可以使用选项式
      mounted() {
        console.log('this代理对象', this);
      },
    }).mount('#app')  // 需要使用实例的mount方法来挂载到对应的元素上
    ```
+ reactive() => 常用于定义引用类型的数据
  - 方法返回一个代理对象 -> 所有对代理对象的操作,都会作用于目标对象
  - reactive() 内部封装过程中已经内置了数据监听,对代理对象进行取值和赋值 => 都会触发取值拦截和赋值拦截
    + 如果是赋值,会同步更新视图
  - 注意: 方法返回一个代理对象,没有办法直接覆盖整个目标对象
  ```html
    <div id="app">
      <p>{{zhang.name}}</p>
      <p>{{zhang.age}}</p>
      <p><button @click="zhang.name='李四'">改名</button></p>
      <p><button @click="zhang.age++">年龄++</button></p>
    </div>
  ```
  ```js
  const { createApp } = Vue
  const { ref, reactive, readonly } = Vue
  const app = Vue.createApp({
    setup(props) {
      let zhang = reactive({
        name: '张三',
        age: 18
      })
      console.log('reactive对象', zhang)
      // 原理 -> 闭包
      return {
        zhang
      }
    },
    // 依旧可以使用选项式
    mounted() {
      console.log('this代理对象', this);
    },
  }).mount('#app')  // 需要使用实例的mount方法来挂载到对应的元素上
  ```
+ readonly()
  - 将传入的ref对象和proxy对象变为只读
  ```js
  setup(props) {
    let count = ref(100)
    let addCount = () => {
      count.value++
    }
    let zhang = reactive({
      name: '张三',
      age: 18
    })
    count = readonly(count)
    zhang = readonly(zhang)
    // 原理 -> 闭包
    return {
      zhang,
      count
    }
  },
  ```
## 4. 计算属性
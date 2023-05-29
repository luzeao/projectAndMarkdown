

// 函数的类型 => 对函数的形参和返回值进行类型限制

// 在 JavaScript 中，有两种常见的定义函数的方式——函数声明和函数表达式

// 函数声明 => 命名函数
// function add(a, b) {
//   return a + b
// }

// 函数表达式 => 匿名函数
// let sum = function (a, b) {
//   return a + b
// }


// 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到(形参和返回值)，其中函数声明的类型定义较简单
// 如果没有返回值 就使用void
// function add(a: number, b: number): number {
//   return a + b
// }
// add(1, 2, 3)  // 报错,必须和接收的数量一致


// 函数表达式
// 1. 写法可以 => 匿名函数时赋值式 => 对sum这个变量没有添加修饰
// let sum = function (a: number, b: number): number {
//   return a + b
// }

// 1-1 上面是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 sum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 sum 添加类型，则应该是这样
// let sum: (a: number, b: number) => number = function (a: number, b: number): number {
//   return a + b
// }

// 1-2 先声明再赋值
// let sum: (a: number, b: number) => number
// sum = function (a: number, b: number): number {
//   return a + b
// }


// 2. 用接口定义函数的形状
// interface addFn {
//   (a: number, b: number): number
// };
// let sum: addFn;
// sum = function (a: number, b: number): number {
//   return a + b
// };


// 3. 可选参数 => 必选参数要放在可选参数前面
// 默认情况下,函数被调用时,多的参数或者少的参数是不被允许的 => 可选参数除外
// function add(a: number, b: number, c?: number): number {
//   if (c) return a + b + c
//   return a + b
// }
// add(1, 2, 3)


// 4. 参数默认值 => 如果给该参数添加默认值,该参数会变成可选参数
// function add(a: number, b: number, c: number = 0): number {
//   return a + b + c
// }
// add(1, 2, 3)


// 5. 剩余参数
// 两个参数
// function add(a, b) {
//   return a + b
// }

// 任意n个数之和
// ...list:Array<number>
// function add(...list: number[]) {  // ...list => 1, 2, 3, 4, 5
//   return list.reduce((prev, item) => prev + item, 0)
// }
// add(1, 2, 3, 4, 5)


// 6. 重载 => 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
// 数字或字符串反转 -> 方法期望,传入数字返回数字,传入字符串返回字符串
// function reverse(x: number | string): number | string | void {
//   if (typeof x === 'number') {
//     return Number(x.toString().split('').reverse().join(''));
//   } else if (typeof x === 'string') {
//     return x.split('').reverse().join('');
//   }
// }

// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
// 这时，我们可以使用重载定义多个 reverse 的函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
reverse(123)



export default {

}
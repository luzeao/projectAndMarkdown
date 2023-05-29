

// 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt

let num: number = 100
let str: string = 'hello'
let bool: boolean = true
console.log(num);

let a: null = null
let b: undefined = undefined

// 空值
// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
function fn(a: number, b: number): void {
  console.log(a, b);
}

// 在tsconfig中开启了严格模式  "strict": true,  => 那么 null和undefined将不能复制给number类型
// undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
// let n: number = null

// 添加模块化语法 => 当前ts文件中的变量就是局部的
export default{}
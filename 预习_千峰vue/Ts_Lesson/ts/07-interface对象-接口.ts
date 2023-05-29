

// 对象类型-接口
// 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
// TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述 => 描述一个对象有哪些属性和方法

// interface Preson {
//   name: string,
//   age: number
// }

// // 定义的变量要比接口的少一些是不允许的,多也不行
// // 赋值的时候，变量的形状必须和接口的形状保持一致
// let zhang: Preson = {
//   name: '张三',
//   age: 18,
//   // height:180,  // 报错
// }


// 可选属性
// interface Preson {
//   name: string,
//   age: number,
//   height?: number | string,  // 可选属性 => 可以有也可以没有
//   width?: number | string
// }

// let zhang: Preson = {
//   name: '张三',
//   age:18,
//   width:70,
// }


// 任意属性 => 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
// interface Preson {
//   name: string,
//   age: number,
//   height?: number | string,
//   width?: number | string,
//   // 任意属性的属性名类型如果是字符串,那属性值的类型必须是可选属性和必选属性的联合类型
//   [propName: string]: string | number | undefined
// }

// let zhang: Preson = {
//   name: '张三',
//   age:18,
//   width:70,
//   height:180,
//   sex:'男',
//   say:'chinese'
// }


// 只读属性
interface Preson {
  readonly name: string,  // 在对象定义之后就无法被修改
  age: number,
  [propName: string]: string | number
}

let zhang: Preson = {
  name: '张三',
  age: 18
}
// zhang.name = '李四'





export default {}
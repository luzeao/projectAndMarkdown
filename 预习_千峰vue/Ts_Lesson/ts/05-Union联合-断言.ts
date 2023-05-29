
// 联合类型
// 可以是number类型或者字符串类型
let myFavoriteNumber: string | number = '100'

// myFavoriteNumber = true

// 访问联合类型的属性和方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

// 断言
// 写法1: 值 as 类型
// 写法2: <类型>值
function getLength(con: string | number) {
  // return con.length  // 字符串有,但是数字没有,所以会报错
  // return con.toString()  // 字符串和数字都有这个方法,所以可以访问
  // return (con as string).length  // 把con当做字符串
  return (<string>con).length     // 把con当做字符串
}

export default{}
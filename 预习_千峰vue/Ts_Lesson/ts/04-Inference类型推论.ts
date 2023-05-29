

// 类型推论

// 声明变量赋值了(number),没有添加类型限制 => 推论:num为number类型
// 声明了一个变量没有添加类型限制 => 会将你第一次赋值的类型当做他的类型
let num = 100
// num='1000'  // 报错,推论为number类型

export default{}
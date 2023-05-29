

// 如何定义数组 => 数组一般用于存放相同类型的数据

// 1. 最简单的方法是使用「类型 + 方括号」来表示数组
// let arr: (number | string)[] = [1, 2, 3, 4, '5', '6']

// 2. 数组泛型
// let arr: Array<number> = [1, 2, 3, 4]
// let arr: Array<number | string> = [1, 2, 3, 4, '111']


// 元组 => 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

// let tom: [string, number] = ['tom', 18]  // 变量通过元组直接复制 => 要和类型要求保持一致(可以多,不能少)

// 先声明数据 在通过下标赋值 => 可以避免上述问题 => 严格模式有问题
// let tom: [string, number]
// tom[0] = 'tom'
// tom[1] = 18

// 越界的元素 => 超出元组的限制范围 => 当添加越界的元素时,他的类型会被限制为元组中每个类型的联合类型 => 严格模式有问题
// 越界元素通过push方法添加
let tom: [string, number] = ['tom', 18]
tom.push('1111')
// tom.push(true)  // 会报错












export default {}
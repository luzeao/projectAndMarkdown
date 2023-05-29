


// 泛型 => 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

// 创建长度为length的数组,指定元素填充 => fill()
// function createArray(length: number, value: any): Array<any> {
//   let result = [];
//   for (let i = 0; i < length; i++) {
//     result[i] = value;
//   }
//   return result;
// }
// 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型

// createArray(3, 'x'); // ['x', 'x', 'x']
// createArray(5, true); // [true, true, true,true,true]

// 这时候,泛型就派上用场了 => 可以理解为 封装时偷偷添加了一个参数<T 形参>,调用时传入实际类型<实际类型>
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// 需要在调用时传入实际类型 => 此时指定的为number类型,那么value如果传入字符串类型,就会报错
// createArray<number>(3, '1')
createArray<number>(3, 1)  // [1,1,1]
createArray<boolean>(3, true)  // [true,true,true]



// 多个类型参数

// 基于元组实现的,交换两个数的数据(数据类型定死了)
// function swap(tuple: [string, number]): [number, string] {
//   return [tuple[1], tuple[0]]
// }
// swap(['hello', 100])  // 格式对上就是对的
// swap([100, 'hello']) // 格式不对就报错

// 改为泛型
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap<string, number>(['hello', 100])
swap<number, string>([100, 'hello'])


// 泛型约束

// 只能打印字符串的长度
// function loggingIdentity(arg: string): string {
//   console.log(arg.length);
//   return arg;
// }

// 改为泛型 => 调用时才知道传入的是什么类型的(封装时不知道)
// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length);  // 取T类型数据的长度 => 但是事先不知道T要有length属性
//   return arg;
// }
// loggingIdentity<string>('hrllo')

// 这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束
interface Length {
  length: number
}
// 我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性
function loggingIdentity<T extends Length>(arg: T): T {
  console.log(arg.length);  // 取T类型数据的长度 => 但是事先不知道T要有length属性
  return arg;
}
loggingIdentity<string>('hrllo')







export default {}
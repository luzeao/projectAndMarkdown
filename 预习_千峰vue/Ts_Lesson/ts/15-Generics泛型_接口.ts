

// 泛型 => 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

interface Person<T, U> {  // 接口泛型
  name: T,
  age: U
}
let zhang: Person<string, number> = {
  name: '张三',
  age: 18
}

interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;  // 写在函数前面才是函数泛型(接口定义函数)
}

let createArray: CreateArrayFunc;

createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']






export default {}
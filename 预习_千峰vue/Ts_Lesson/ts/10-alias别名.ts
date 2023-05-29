

// 类型别名

// 基于原有的类型,起了一个新类型
// 类型别名常用于联合类型
type NaS = number | string

// let a:NaS = true


function reverse(x: NaS): NaS | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}



type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
// 形参可以接收字符串或者回调函数(返回字符串)
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}


// 也可以做接口使用
type Human = {
  name: string,
  age: number,
  height?: number
}

let zhang: Human = {
  name: '张三',
  age: 18,
  height: 177
}





export default {}
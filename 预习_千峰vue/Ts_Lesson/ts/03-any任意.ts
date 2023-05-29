

// any 任意值（Any）用来表示允许赋值为任意类型
// let num: any = 100;

//     num = 'hello'
//     num = true

// 只声明变量不赋值,默认也是any类型
// let num;
// num = 100
// num = 'hellow'
// num = true

// 任意值的属性和方法
// 1. 在any上访问任何属性都是允许的,编译时是允许的,代码作为js运行时可能会有问题
// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
let num: any = 100;
num.a().b().c().d().e(); // 语法有问题

export default{
}
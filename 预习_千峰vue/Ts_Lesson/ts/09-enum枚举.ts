

// 枚举(Enum) 类型用于取值被限定在一定范围内的场景
// enum Days { Sun, Mon, Tue, Wen, Thu, Fri, Sta }
// console.log(Days['Wen']);
// console.log(Days[5]);

// 手动赋值
// 1. 未手动赋值的枚举项会接着上一个枚举项递增 
enum Days { Sun = 7, Mon = 1, Tue, Wen, Thu, Fri, Sta } // 7,1,2,3,4,5,6
console.log(Days['Wen']);
console.log(Days[5]);

// 枚举时不要数值重复 => 会有问题
// enum Days { Sun = 3, Mon = 1, Tue, Wen, Thu, Fri, Sta }
// console.log(Days['Wen']);
// console.log(Days[5]);

// 枚举下标也可以是负数或者小数,未手动赋值的枚举项会接着上一个枚举项递增1
// enum Days { Sun = -1.5, Mon, Tue, Wen, Thu, Fri, Sta }
// console.log(Days['Wen']);
// console.log(Days[5]);






export default {}
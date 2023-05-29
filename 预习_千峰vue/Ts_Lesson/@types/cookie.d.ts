


// 创建声明文件
// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能 (有声明直接引入即可,没有声明,需要自己定义 => 手搓)

// 创建声明文件,就是为了让ts放心 => 变量 方法 接口 类型 函数 等是有的 => 可以放心使用

// 声明全局接口
declare interface lzaProp {
  ts(): void
  name: string
  age: number
}

// 声明全局变量
declare let lza: lzaProp

// 声明全局方法
declare function setCookie(key: string, value: string, expiresIn: number, path: string = '/'): void;
declare function getCookie(key: string): string;
declare function deleteCookie(key: string): void;

// 定义全局类型
declare type NAS = number | string

// 定义全局模块
declare module "*.jpg"
declare module "*.css"
declare module "*.scss"

// 命名空间 UserNs
declare namespace UserNs {

  const token: 'string'  // 数据 => UserNs命名空间下的变量
  const say: () => void  // 命名空间下的方法

  interface Info { // 接口:类型限制
    name: string,
    age: number,
    height?: number,
    weight?: number
  }
}


// export default {}
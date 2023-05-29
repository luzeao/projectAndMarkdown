


// 创建声明文件
// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能 (有声明直接引入即可,没有声明,需要自己定义 => 手搓)

// 创建声明文件,就是为了让ts放心 => 变量 方法 接口 类型 函数 等是有的 => 可以放心使用

// 声明局部接口
export declare interface lzaProp {
  ts(): void
  name: string
  age: number
  weight?: number
  height?: number
}

// 声明局部变量
export declare let lza: lzaProp

// 声明局部方法
export declare function setCookie(key: string, value: string, expiresIn: number, path: string = '/'): void;
export declare function getCookie(key: string): string;
export declare function deleteCookie(key: string): void;

// 定义局部类型
export declare type NAS = number | string

// 定义局部模块
export declare module "*.jpg"
export declare module "*.css"
export declare module "*.scss"

// 命名空间 UserNs
export declare namespace UserNs {

  const token: 'string'  // 数据 => UserNs命名空间下的变量
  const say: () => void  // 命名空间下的方法

  interface Info { // 接口:类型限制
    name: string,
    age: number,
    height?: number,
    weight?: number
  }
}



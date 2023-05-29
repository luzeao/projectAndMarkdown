

import { lza } from "@demo";

// 引入的第三方插件 cookie.js (在ts文件中使用第三方模块 => 虽然引入的第三方模块 => 该模块中可能没有内置 ts声明 => 可能需要自己添加ts声明)
// setCookie()
// getCookie()
// deleteCookie()

// 自己写 => 先定义函数类型和返回值 再封装函数 再使用
// let setCookie = (key: string, value: string, expiresIn: number, path: string = '/'):void => {}
// function setCookie(key: string, value: string, expiresIn: number, path: string = '/'): void { }


setCookie('user', 'a123123', 24 * 60 * 60, '/')
getCookie('user')
deleteCookie('user')

lza.name = '鲁泽奥'
lza.age = 24
lza.height = 180
lza.weight = 70


let a: NAS = '100'

console.log(UserNs.token);
console.log(UserNs.say());

let zhang: UserNs.Info = {
  name: '张三',
  age: 18,
  height: 180,
}

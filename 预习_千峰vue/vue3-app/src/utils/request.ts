
import axios from 'axios'

import type { AxiosResponse } from 'axios';

import { useUserStore } from '@/stores/user';

// 自定义实例默认值(实例可以有多个,全局只能有一个)
// 创建实例时配置默认值
const request = axios.create({
  baseURL: 'http://localhost:3000/api'  // 当前实例的默认请求位置
});

// 创建实例后修改默认值
// request.defaults.headers.common['Authorization'] = AUTH_TOKEN;
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  // post传参,默认携带数据的类型


// 添加请求拦截器 => 请求准备发送前进行拦截(可以获取请求相关的信息)
request.interceptors.request.use(function (config) {  //config 请求相关配置{methods url headers}
  // 在发送请求之前做些什么
  // 很多接口在接受前端请求时,要求携带token(用户身份标识)
  const user = useUserStore()  // 获取localstorage中的数据

  if (user.token) {  // 如果有才会携带
    config.headers.token = user.token
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



// 添加响应拦截器 => 在服务端返回响应结束,数据返回之前 => axios的then()方法接收数据之前进行拦截(函数中返回的数据,就是后续then方法接收的数据)
request.interceptors.response.use(function (response: AxiosResponse) {
  // response => axios响应的数据对象(config headers data request status)
  // 2xx 范围内的状态码都会触发该函数 (响应成功 -> 后端接收数据返回结果)
  // 对响应数据做点什么

  // console.log('响应拦截', response)

  // 可以自己定义要返回的数据
  const res: AxiosResponse['data'] = response.data // 在响应成功的前提下获取响应数据

  const { code, message } = res

  const isSuccess: boolean = code == 200 // 响应成功,操作也成功
  const isTokenBreak: boolean = code == 10119  // 响应成功 token过期

  if (isSuccess) {  // 响应成功 -> 操作也是成功的(登录 -> 登陆成功)

    return res

  } else if (isTokenBreak) {  // 响应成功,但是token过期,重新登陆(登陆成功,返回原位)


    // router.replace({ path: '/login', query: { ReturnUrl: router.currentRoute.fullPath } })

    const error = new Error(message)
    return Promise.reject(error);

  } else if (code == 10020) {  // 购物车没有数据
    return res
  } else {  // 10003  10005  100xx  响应成功 -> 操作失败 -> 登录失败/密码错误,用户未注册
    const error = new Error(message)
    return Promise.reject(error);
  }

  // return response;  // 成功就正常返回response对象
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数(1xx 3xx 4xx 5xx) => 响应失败
  // 对响应错误做点什么
  return Promise.reject(error);  // 失败返回已失败状态的promise实例
});


export default request
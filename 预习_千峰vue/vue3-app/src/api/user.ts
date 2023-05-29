

import request from "@/utils/request";
import type { AxiosPromise } from "axios";

interface Phone {
  tel: number
}

interface TelCode {
  telcode: string
}

interface Pwd {
  password: string
}



interface TelAndCod extends Phone, TelCode { }

interface RegMsg extends Phone, Pwd { }

export interface LoginParams extends Pwd {
  loginname: string
}

// 验证手机号是否注册过
export const doCheckPhoneAPI = (params: Phone): AxiosPromise => request.post('/user/docheckphone', params)
// 发送短信验证码接口
export const doSendMsgCodeAPI = (params: Phone): AxiosPromise => request.post('/user/dosendmsgcode', params)
// 验证短信验证码
export const doCheckCodeAPI = (params: TelAndCod): AxiosPromise => request.post('/user/docheckcode', params)
// 注册
export const doFinishRegisterAPI = (params: RegMsg): AxiosPromise => request.post('/user/dofinishregister', params)
// 登录
export const doLoginAPI = (params: LoginParams): AxiosPromise => request.post('/user/login', params)

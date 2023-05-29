


import request from "@/utils/request";
import type { AxiosPromise } from "axios";

export interface AddCart {
  userid: string,
  proid: any,
  num: string | number
}
export interface DelOne {
  cartid: string
}
export interface DelAll {
  userid: string
}
export interface CarList {
  userid: string
}
// 加入购物车
export const addCartAPI = (params: AddCart): AxiosPromise => request.post('/cart/add', params)
// 删除单条
export const delCartByIdAPI = (params: DelOne): AxiosPromise => request.post("/cart/remove", params);
// 全删
export const clearCartAPI = (params: DelAll): AxiosPromise => request.post("/cart/removeall", params);
// 更新所有选中状态
export const updateCartAllCheckedStatusAPI = (params: any): AxiosPromise => request.post("/cart/selectall", params);
// 更新一条选中状态
export const updateCartOneCheckedStatusAPI = (params: any): AxiosPromise => request.post("/cart/selectone", params);
// 查看购物车
export const getCartListAPI = (params: CarList): AxiosPromise => request.post("/cart/list", params);
// 更新数量
export const updateCartNumAPI = (params: any): AxiosPromise => request.post("/cart/updatenum", params);
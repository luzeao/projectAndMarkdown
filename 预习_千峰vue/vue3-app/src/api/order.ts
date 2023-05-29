

import request from "../utils/request.js"
import type { AxiosPromise } from "axios";

// 添加订单
export const addOrderAPI = (params: any): AxiosPromise => request.post("/order/addOrder", params);

// 修改订单地址
export const updateOrderAddressAPI = (params: any): AxiosPromise => request.post("/order/updateOrderAddress", params);

// 获取订单的确认信息
export const confirmOrderAPI = (params: any): AxiosPromise => request.get("/order/confirmOrder", { params });

// 获取所有订单
export const orderlistAPI = (params: any): AxiosPromise => request.post("/user/orderlist", params);
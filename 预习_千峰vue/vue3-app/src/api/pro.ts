

import request from "@/utils/request";
import type { AxiosPromise } from "axios";

// http://localhost:3000/api/banner/list


export interface pageParams {
  count: number
  limitNum: number
}




// 获取商品列表
export const getProListAPI = (params: pageParams): AxiosPromise => request.get('/pro/list', { params })

// 获取详情页

export const getProDetailAPI = (params: any): AxiosPromise => request.get("/pro/detail/" + params.proid);

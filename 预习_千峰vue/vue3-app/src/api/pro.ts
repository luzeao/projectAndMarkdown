

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

// 获取商品分类列表
export const getProCategoryAPI = (): AxiosPromise => request.get('/pro/categorylist')

// 获取商品分类下的子类
export const getCategoryBrandlistAPI = (params: any): AxiosPromise => request.get('/pro/categorybrandlist', { params })

// 搜索列表展示
export const getSearchList = (params: any): AxiosPromise => request.get('/pro/search', { params })
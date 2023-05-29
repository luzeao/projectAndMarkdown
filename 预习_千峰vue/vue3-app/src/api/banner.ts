

import request from "@/utils/request";
import type { AxiosPromise } from "axios";

// http://localhost:3000/api/banner/list

export interface BannerItem {
  img: string,
  alt: string,
  link: string,
  bannerid: string,
  flag: boolean
}

// 获取轮播图
export const getBannerListAPI = (): AxiosPromise => request.get('/banner/list')


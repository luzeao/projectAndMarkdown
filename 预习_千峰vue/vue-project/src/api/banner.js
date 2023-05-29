
import request from "@/utils/request";

// 轮播图列表
export const getBannerListAPI = params => request.get('/banner/list', { params: params, })

// 新增轮播
export const bannerAddAPI = params => request.post('/banner/add', params)

// 更新轮播状态
export const updateBnannerAPI = params => request.post('/banner/updateFlag', params)

// 删除轮播
export const deleteBannerAPI = params => request.get('/banner/delete', { params: params, })
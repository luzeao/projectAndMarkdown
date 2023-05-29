

import request from "@/utils/request";

// 获取商品列表
export const getGoodsListAPI = params => request.get('/pro/list', { params: params, })

// 更新商品秒杀状态
export const updateIsseckillAPI = params => request.post('/pro/updateFlag', Object.assign({ type: 'isseckill' }, params))

// 更新商品推荐状态
export const updateIsrecommendAPI = params => request.post('/pro/updateFlag', {
  type: 'isrecommend',
  ...params
})

// 获取商品分类
export const getCategoryAPI = params => request.get('/pro/getCategory', { params: params, })

// 筛选商品
export const searchProAPI = params => request.post('/pro/searchPro', params)

// 获取商品详情
export const getProDetailAPI = params => request.get('/pro/detail', { params: params, })
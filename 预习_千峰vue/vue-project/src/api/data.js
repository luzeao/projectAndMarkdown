
import request from "@/utils/request";

// 获取商品总数
export const getStatisticProAPI = params => request.get('/statistic/product', { params: params, })

// 获取用户总数
export const getStatisticUserAPI = params => request.get('/statistic/user', { params: params, })
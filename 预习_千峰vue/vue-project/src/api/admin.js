
import request from "@/utils/request";

// 管理员登录
export const adminLoginAPI = params => request.post('/admin/login', params)

// 管理员新增
export const adminAddAPI = params => request.post('/admin/add', params)

// 管理员删除
export const adminDelAPI = params => request.post('/admin/delete', params)

// 管理员更新
export const adminUpdateAPI = params => request.post('/admin/update', params)

// 管理员列表
export const adminListAPI = () => request.get('/admin/list')

// 获取管理员详情
export const adminDetailAPI = () => request.get('/admin/detail')
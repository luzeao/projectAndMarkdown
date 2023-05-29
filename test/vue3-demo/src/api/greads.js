import request from '@/utils/request.js'


// 获取列表
export const getGreadListAPI = (params) => request.get('/searchGradeOrderLimit.php', { params })
// 删除接口
export const delGreadAPI = (params) => request.get('/deleteGradeById.php', { params })
// 新增接口
export const addGreadAPI = (params) => request.get('/addGrade.php', { params })
// 编辑接口
export const undateGreadAPI = (params) => request.post('/updateGradeById.php', params)
// 查询接口
export const searchGreadAPI = (params) => request.get('/searchGradeOrderLimit.php', { params })
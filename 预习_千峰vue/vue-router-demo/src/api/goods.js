

import request from '@/utils/request'   // request => axios



// 用函数进行包裹 => 调用函数时才会执行 => (params要求传入对象)
// function getAllGoods(params) {
//   return request.get('/searchAllGoods.php', {
//     params: params
//   }).then(res => {
//     return res.data
//   })
// }

// function login(params) {
//   return request.post('/login.php', params).then(res => {
//     // console.log('res', res);
//     return res.data
//   })
// }


export const searchAllGoodsAPI = params => request.get('/searchAllGoods.php', { params: params }).then(res => res.data)



export const searchGoodsByGoodsIdAPI = params => request.get('/searchGoodsByGoodsId.php', { params: params }).then(res => res.data)
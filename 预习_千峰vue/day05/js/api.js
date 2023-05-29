// 将项目的接口整合到一起 => 方便管理


// axios.get(url[, config])
// axios.post(url[, data[, config]])

// 全局 axios 默认值   => 指定默认配置，它将作用于每个请求。
axios.defaults.baseURL = 'http://121.43.116.41/demo';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;   //携带token的
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  // post默认传递数据的方式


// get
// export function searchGradeOrderLimit(params){ // params => 放到配置对象中params属性中
//     return axios.get("/php/searchGradeOrderLimit.php",{ // config
//         params:params
//     }).then(response=>{
//         return response.data;
//     })
// }

// post
// export function updateGradeById(data){  // data -> 作为第二参数传入
//     return axios.post("/php/updateGradeById.php",data,{}).then(response=>{
//         return response.data;
//     })
// }

export const searchGradeOrderLimit = (params) => axios.get("/php/searchGradeOrderLimit.php",{
    params:params
}).then(response=>{
    return response.data;
})

export const addGrade = (params) => axios.get("/php/addGrade.php",{
    params:params
}).then(response=>{
    return response.data;
})

export const deleteGradeById = (params) => axios.get("/php/deleteGradeById.php",{params}).then(response=>{
    return response.data;
})

// export const updateGradeById = (data) => axios.get("/php/updateGradeById.php",data).then(response=>{
//     return response.data;
// })
export const updateGradeById = (params) => axios.post("/php/updateGradeById.php",params).then(response=>{
    return response.data;
})




import request from "../utils/request.js"

// 获取地址列表
export const getAddressListAPI = (params:any) => request.get("/address/list", { params });
// 添加地址
export const addAddressAPI = (data:any) => request.post("/address/add", data);
// 删除地址
export const delAddressAPI = (data:any) => request.post("/address/delete", data);
// 更新地址
export const updateAddressAPI = (data:any) => request.post("/address/update", data);
// 查询默认地址
export const getDefaultAddressAPI = (data:any) => request.post("/address/defaultAddress", data);

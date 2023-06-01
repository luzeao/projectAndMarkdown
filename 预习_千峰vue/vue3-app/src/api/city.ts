
import request from "../utils/request.js"
import type { AxiosPromise } from "axios";


// 获取订单的确认信息
export const cityApi = (): AxiosPromise => request.get("/city/sortCity");
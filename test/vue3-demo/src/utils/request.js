
import axios from 'axios'

axios.defaults.baseURL = 'http://121.43.116.41/demo/php';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数
  // 对响应数据做点什么
  const res = response.data
  const { status } = res
  if (status) {
    return res
  } else {
    let err = new Error('获取失败')
    return Promise.reject(err);
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});




export default axios
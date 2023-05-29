


import axios from "axios";

// 全局配置axios


// 项目开发过程中
// 开发地址 xxx.xxx.xx.xxx
// 上线地址 xxx.xxx.xxx.xxx
// 备用地址 xxx.xxx.xxx.xxx

// 默认baseURL
axios.defaults.baseURL = 'http://121.43.116.41/demo/php';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 默认post请求header中的content-type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios
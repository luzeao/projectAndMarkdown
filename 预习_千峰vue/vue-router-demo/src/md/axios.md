

项目中使用axios

1. 安装axios
cnpm i axios -S    => 生产依赖

2. axios请求 get / post

axios({
  methods:'',
  url:'',
  params:{},  // get
  data:{},  // post
}).then(res=>{
  res对象 => axios相关配置 (config,data,request,status,statusText)
  return res.data
})

axios.get(url,config)
axios.get(url,{})

axios.post(url,{},header:{
  "Content-Type":"application/json"  (官方默认)
  "Content-Type":"application/x-www-form-urlencoded"
})
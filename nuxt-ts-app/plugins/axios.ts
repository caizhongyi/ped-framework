import axios from 'axios'
import qs from "qs";

// axios 配置
//axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

/*
if(  process.env.__ENV != 'development' ){
  //axios.defaults.baseURL = 'http://180.106.148.81:18082/testapms/';
  axios.defaults.baseURL = 'http://180.106.148.81:28083/"';
}
*/

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 返回状态判断
axios.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  return Promise.reject(error)
})

export default axios;




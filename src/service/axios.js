import axios from 'axios'
import Cookies from 'js-cookie'
import { Loading, Message, MessageBox } from 'element-ui'
// import router from '../router';
// 创建axios实例
let hostname = window.location.hostname
console.log(hostname)
const service = axios.create({
  baseURL: hostname == 'localhost' || hostname == 'merchant.ecard' ? 'http://api.ecard' : 'https://api.ecard.life', // api的base_url
  //baseURL: 'http://api.ecard.life', // api的base_url
  timeout: 10000, // 请求超时时间
  //withCredentials:true
  showLoading: true,//是否显示loading
  loadingContainer:'body', //显示loading的容器
  session:false //是否在请求头中带session
});
let loading
// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (config.showLoading) {
    loading = Loading.service({
      target: document.querySelector(config.loadingContainer)
    })
  }
  if (config.session && Cookies.get('user_info')) {
    config.headers.s = JSON.parse(Cookies.get('user_info')).session
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (loading) {
      loading.close()
    }
    if (response.data.code == 410) {
      MessageBox.alert('登录状态已失效，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          Cookies.remove('user_info')
          window.location.reload()
        }
      });
      //return false
    }
    return response.data
  },error => {
    console.log('err' + error); // for debug
    if (loading) {
      loading.close()
    }
    Message({
      showClose: true,
      message: 'Failed to get data, please refresh to try again',
      type: 'error'
    })
    return Promise.reject(error);
  }
)

export default service;

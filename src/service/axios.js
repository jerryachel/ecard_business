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
  showLoading: true,
  loadingContainer:'body'
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
    if (response.data.errorCode == -999) {
      /*MessageBox.alert('登录状态已失效，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          Cookies.remove('user_info')
          window.location.reload()
        }
      });*/
      //return false
    }
    return response
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject(error);
  //     } else {
  //       return response.data;
  //     }
  error => {
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

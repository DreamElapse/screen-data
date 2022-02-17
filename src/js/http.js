/*
 *  axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import utils from './Utils'
import Vue from 'vue'
import router from '@/router/router.js'

import qs from 'qs'
let md5 = require('blueimp-md5')
/*
 *   环境的切换
 */
//axios.defaults.baseURL = process.env.VUE_APP_CHAT_URL + '/' + process.env.VUE_APP_VERSION + '/'
axios.defaults.timeout = 1000 * 30 // 请求超时5秒
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8' // 设置post请求是的header信息
axios.defaults.withCredentials = false // 如果你要用到session验证码功能，让请求携带cookie
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if(config.url.indexOf("http")==-1){
      config.url = process.env.VUE_APP_CHAT_URL +config.url 
    }
    if (sessionStorage.getItem("Token")) {
      config.headers.token = sessionStorage.getItem("Token");
    }
    let data = {}
    let link =  config.url.split('?')
    let url = link[0]

    if(link[1]){
     Object.assign(data,qs.parse(link[1]),config.params)
    }else {
      Object.assign(data,config.params)
    }
    
    let resultData = {}
    let keyArr = []
    let newData = JSON.parse(JSON.stringify(data))
    let time = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-').replace(/\b\d\b/g, '0$&')
    newData.timestamp = time
    for(let key in newData) {
      keyArr.push(key)
    }
    keyArr.sort()
    keyArr.forEach(item => {
      resultData[item] = newData[item]
    })
    data = JSON.parse(JSON.stringify(resultData))
    resultData.key = '4b9c0e24dda4d4683963e126919a7a0c'
    let dataString = ''
    for (let key in resultData) {
      dataString = dataString+ '&' + key+'='+resultData[key]
    }
    dataString = dataString.slice(1)
    // console.log(dataString, 111)
    dataString = md5(dataString).toUpperCase()
    data.sign = dataString
   if(config.url.indexOf('gaolvzongheng')==-1){
    config.url = url  +'?'+qs.stringify(data)

   }
    return config;
  },

  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 301009) {
        sessionStorage.setItem("Token","");
        router.push({name:"login"})

        // if (utils.getUserEnv() === 'app') {
        //   JSBridge.callAppLogin({
        //     code: 301009
        //   })
        // }
        // Vue.prototype.$store.commit('LOGOUT');
      }
    }
    return response.data;
  },

  err => {
    return Promise.reject(err)
  }
);


const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        //debugger
        // if (res.status !== 200) {
        //   Toast('网络有点小问题，请稍后再试');
        //   reject();
        //   return;
        // }
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  })
}
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        // if (res.status !== 200) {
        //   Toast('网络有点小问题，请稍后再试');
        //   reject()
        //   return;
        // }
        
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export { axios, post, get }

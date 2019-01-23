import axios from 'axios'
import router from '../../router'

import {
  Message
} from 'element-ui'

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
      
    // 这里可以自定义一些config 配置

    return config
  },
  error => {
    //  这里处理一些请求出错的情况

    console.log(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑
    if(res.code == 200){
      return res
    }else if(res.code == 403){
      // token过期
      Message.error('登录过期，请重新登录')
      // 跳转页面
      // router.push('/about');
    }else if(res.code == 500){
      Message.error('服务器错误')
    }
    
  },
  error => {
    // 这里处理一些response 出错时的逻辑
    // 上传报错，超时重新请求或者提示错误信息
    //  1.判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.error('请求超时，请刷新页面重试')
    }
  }
)

export default service

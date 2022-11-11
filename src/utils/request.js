import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

export const baseUrl = 'http://www.cxaou.com:8080'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: baseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const {token} = store.state.user.userInfo
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.token = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 1) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 500 || res.code === 501) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


// export default service

// 创建一个新的 axios 实例对象
// 2. 请求拦截器，如果有 token 进行头部携带
// 3. 相应拦截器，1.剥离无效数据，2. 处理 token 失效
// 4. 导出一个函数，调用当前的 axios 实例发请求，返回值 promise

// import axios from 'axios'
// import store from '@/store'
// import router from '@/router'

// // 导出基本地址
// // https://apipc-xiaotuxian-front.itheima.net
// export const baseURL = 'http://www.cxaou.com:8080'

// const instance = axios.create({
//   baseURL,
//   timeout: 5000
// })

// // 请求拦截器
// instance.interceptors.request.use(config => {
//   // 拦截业务逻辑
//   // 进行请求配置的修改
//   // 如果本地有 token 就在 头部携带
//   // 1. 获取用户信息对象
//   // const {
//   //   profile
//   // } = store.state.user
//   // if (profile.token) {
//   //   config.headers.token = profile.token
//   // }
//   return config
// }, err => {
//   return Promise.reject(err)
// })

// // 响应拦截器
// instance.interceptors.response.use(
//   // 1.剥离无效数据
//   res => res.data,
//   err => {
//     // 401 状态码，进入该函数

//     if (err.response && err.response.status === 401) {
//       // 1. 清空本地无效用户信息
//       // 跳转到登录页面，
//       // 3. 跳转需要携带当前路由地址
//       store.commit('user/setUser', {})
//       // 当前路由地址
//       // 当前路由地址
//       // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
//       // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
//       const fuLlPath = encodeURIComponent(router.currentRoute.value.fullPath)
//       router.push(('/login?redirectUrl=' + fuLlPath))
//     }
//     return Promise.reject(err)
//   }
// )

const request = function (url, method, submitData) {
  // 负责发请求  请求地址，请求方式，请求数据
  return service({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method === 'get' ? 'params' : 'data']: submitData
  })
}

export default request


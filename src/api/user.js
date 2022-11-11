import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


/**
 * 获取验证码
 * @param {String} phone  手机号 
 */
export function getCode(data) {
  request('/user/sendMsg','post',data)
}

/**
 * 注册的api 函数
 * @param {参数对象} data  包括，验证码，手机好，用户名， 密码
 * @returns 
 */
export function register (data) {
  return request('/user/signIn','post',data)
} 

/**
 * 登录的接口
 * @param {用户对象} data 
 * @returns 
 */
export function login (data) {
  return request('/user/login','post',data)
}
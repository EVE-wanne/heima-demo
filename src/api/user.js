import request from '@/utils/request'

/**
 * 这是发送验证码的接口
 */

export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *
 * @param {mobile,code} param0
 * 登录jiekou
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

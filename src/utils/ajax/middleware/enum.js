// 基于约定，随意配置
const error = {
  SERVER: 1, // 服务错误
  REQUEST: 2, // 请求错误
  LOGOUT: 3, // 登录错误
  LOGINERROR: 4, // 登录超时
  AUTH: 5, // 权限错误
  FORMAT: 6, // 格式错误
  LOGINFAIL: 7, // 用户名密码错误
  AUTHCODE: 8 // 验证码错误
}
const code = {
  SUCCESS: 200, // 成功
  SUCMIN: 210,
  SUCMAX: 220,
  UPDATE: 201, // 系统升级
  LOGINFAIL: 202, // 用户名密码错误
  AUTHCODE: 203, // 验证码错误
  ERROR: 500 // 服务器内部错误
}
export {
  error,
  code
}

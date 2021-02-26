import Ajv from 'ajv'
import {
  error,
  code
} from './enum'
import responseSchema from './schema'

const ajv = new Ajv() // 数据格式校验

/**
 * 数据格式校验
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function formatIntercepter(response, next) {
  const valid = ajv.validate(responseSchema, response)

  if (!valid) {
    // 格式校验失败，接口数据格式错误
    return error.FORMAT
  }
  return next()
}

/**
 * 业务状态码校验
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function codeIntercepter(response, next) {
  const codeState = response.data.code

  // 如果接口返回不成功
  if (codeState !== code.SUCCESS && (codeState < code.SUCMIN || codeState > code.SUCMAX)) {
    return error.SERVER
  }
  return next()
}

/**
 * 操作状态校验
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function statusIntercepter(response, next) {
  const res = response.data

  if (!res) {
    // 接口错误
    return error.REQUEST
  }
  return next()
}

export {
  formatIntercepter,
  codeIntercepter,
  statusIntercepter
}

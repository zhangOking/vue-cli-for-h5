// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import config from '@/utils/env/index'
import {
  formatIntercepter,
  codeIntercepter,
  statusIntercepter
} from './middleware/interceptor'

// const vue = new Vue()

// 自定义拦截器
const interceptors = [
  formatIntercepter,
  codeIntercepter,
  statusIntercepter
]

// 自定义axios实例
const http = axios.create({

  baseURL: config.baseApi,

  // ms
  timeout: 150000,

  // 只适用'POST'、'PUT'、'PATCH'，序列化参数
  transformRequest: [
    function(data) {
      return JSON.stringify(data)
    }
  ],

  // GET请求，序列化参数，只有在有参数的情况先才会执行
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
})

function extendData(data) {
  return {
    ...data
  }
}

/**
 * 请求拦截器
 * @return {[type]}          [description]
 */
http.interceptors.request.use(function(request) {
  const {
    method,
    data,
    params
  } = request

  if (method.toLowerCase() === 'get') {
    request.params = extendData(params)
  } else {
    if (data instanceof FormData) {
      request.data = data
    } else {
      request.data = extendData(data)
    }
  }
  return request
})

/**
 * 扩展响应
 * @return {[type]}           [description]
 */
http.interceptors.response.use(function(response) {
  response.I = 0
  response.next = function() {
    // 所有的接口数据都要经过数据筛选, 符合规范才能通行
    if (response.I < interceptors.length) {
      return interceptors[response.I + 1](response, response.next)
    }
  }
  return response
})

/**
 * 响应拦截器
 * @return {[type]}                 [description]
 */
http.interceptors.response.use(function(response) {
  const { config, data } = response

  if (config.method.toLowerCase() !== 'get') {
    // loading && loading.close()
  }

  return data
}, function(error) {
  // loading && loading.close()
  console.log(error)
  return Promise.reject(error)
})

/**
 * http工具函数
 * @param  {...[type]} config [description]
 * @return {[type]}         [description]
 */
const ajax = function(config) {
  return http(config)
}

/**
 * ajax消息提示
 * @param  {[type]}  message            [description]
 * @param  {String}  options.type      [description]
 * @param  {Boolean} options.showClose [description]
 * @param  {[type]}  options.duration  [description]
 * @return {[type]}                    [description]
 */
ajax.message = function(message, {
  type = 'error',
  showClose = false,
  duration = 3000
} = {}) {
  // vue.$message({
  //     message,
  //     type,
  //     showClose,
  //     duration
  // })
}

/**
 * GET操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.get = function(...args) {
  const [url, data, options] = args

  return http({
    url,
    params: data,
    method: 'get',
    ...options
  })
}

/**
 * POST操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.post = function(...args) {
  const [url, data, options] = args

  return http({
    url,
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    ...options
  })
}

/**
 * PUT操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.put = function(...args) {
  const [url, data, options] = args

  return http({
    url,
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'put',
    ...options
  })
}

/**
 * 删除操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.delete = function(...args) {
  const [url, data, options] = args

  return http({
    url,
    data: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'delete',
    ...options
  })
}

/**
 * POSTJSON操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.postJSON = function(...args) {
  const [url, data, options] = args

  return http({
    url,
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    ...options
  })
}

/**
 * 上传文件
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.upload = function(...args) {
  const [url, data, options] = args
  if (!(data instanceof FormData)) {
    throw TypeError('数据格式错误')
  }

  return http({
    url,
    data,
    transformRequest: [(data) => data],
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    ...options
  })
}

export default ajax

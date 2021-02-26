// 本地环境配置
module.exports = {
  name: 'development',
  port: 5566,
  baseUrl: 'http://localhost:5566', // 项目地址
  baseApi: 'https://test.xxx.com/api', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  $cdn: 'https://www.xxx.cn/static',
  proxy: {}
}

// 根据环境引入不同配置 process.env.VUE_APP_ENV
let config

switch (process.env.NODE_ENV) {
  case 'development':
    config = require('./env.development')
    break
  case 'staging':
    config = require('./env.staging')
    break
  default:
    config = require('./env.production')
    break
}

module.exports = config

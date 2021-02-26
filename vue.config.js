const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const ENV = require('./src/utils/env/index')
const IS_DEVELOPMENT = ENV.name === 'development'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // 署应用包时的基本 URL。 vue-router hash 模式使用
  publicPath: './',

  outputDir: 'dist',

  //  outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: 'static',
  lintOnSave: IS_DEVELOPMENT,

  devServer: {
    port: ENV.port, // 端口
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
    // proxy: {
    //   //配置代理
    //   '/api': {
    //       target: "https://test.xxx.com",
    //       // ws:true,
    //       changOrigin:true,
    //       pathRewrite:{
    //           '^/api':'/'
    //       }
    //   }
    // }
  },

  css: {
    extract: !IS_DEVELOPMENT, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false,
    loaderOptions: {}
  },

  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },

  chainWebpack: (config) => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // config.performance: {
    //   // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    //   hints: "warning",
    //     // 开发环境设置较大防止警告
    //     // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    //     maxEntrypointSize: 5000000,
    //       // 最大单个资源体积，默认250000 (bytes)
    //       maxAssetSize: 3000000
    // }

    // 配置别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /**
     * 设置保留空格
     */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    /**
     * 打包分析
     */
    if (IS_DEVELOPMENT) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(IS_DEVELOPMENT, config => config.devtool('cheap-source-map'))

    config.when(!IS_DEVELOPMENT, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 这个是绝对路径,不能使用 alias中配置的别名路径，如@表示的src
        path.resolve(__dirname, './src/assets/css/index.less')
      ]
    }
  }
}

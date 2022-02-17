const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ["js", "css"]
let isDev = process.argv.some(val => val === 'dev')
module.exports = {
  chainWebpack: config => {
    // config.module.rules.delete('eslint');
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_lifecycle_event === 'analyze') {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
    }
    if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_BUILD_FOR !== 'development') { // 正式包
      config.optimization
        .minimizer('terser')
        .tap(args => {
          Object.assign(args[0].terserOptions.compress, { // 生产模式 console.log 去除
            drop_console: true
          })
          return args
        })
      config.devtool(false)
    } else { // 测试包
      config.devtool('source-map')
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: [
            {
              loader: 'worker-loader',
              options: { inline: true, name: 'workerName.[hash].js' },
            },
            { loader: 'babel-loader' }// 增加es6 转换语法
          ]
        }
      ]
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/global.scss";
        `
      }
    }
  },
  productionSourceMap: isDev,
  devServer: {
    port: 3000
  },
  outputDir: process.env.VUE_APP_BUILD_FOR !== 'development' ? 'dist' : 'dist-dev',
  publicPath: './',
  assetsDir: './static/'
}
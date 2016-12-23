
var path = require('path')

module.exports = {
  prod: {
    env: require('./prod.env'),
    // index: path.resolve(__dirname, './dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/prod'),
    assetsSubDirectory: 'prod',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    assetsRoot: path.resolve(__dirname, '../dist/dev'),
    assetsSubDirectory: 'dev',
    assetsPublicPath: '/',
    cssSourceMap: false
  },
  hot: {
    env: require('./hot.env'),
    port: 8080,
    assetsRoot: path.resolve(__dirname, '../dist/hot'),
    assetsSubDirectory: 'hot',
    assetsPublicPath: '/',
    cssSourceMap: false
  }
}
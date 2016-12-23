
require('shelljs/global');
const webpack = require('webpack');
const config = require('../config');

const env = process.env.NODE_ENV = config.prod.env.NODE_ENV;

const merge = require('webpack-merge');
const validate = require('webpack-validator'); 	//检查导出对象
const webpackBaseConf = require('./webpack.base.conf.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const ora = require('ora');
var spinner = ora('building for production...');

spinner.start();

var webpackConfig = merge(webpackBaseConf, {
    output: {
        path: config.prod.assetsRoot,
        // publicPath: '../dist/prod',
        filename: './js/[name].[chunkhash:8].min.js'
    },
    plugins: [
        // new ExtractTextPlugin('./css/[name].' + env === "hot" ? 'css' : (env === "development" ? './css/[name].[chunkhash:8].css' : './css/[name].[chunkhash:8].min.css')),
        // new ExtractTextPlugin(env === "development" ? './css/[name].[chunkhash:8].css' : './css/[name].[chunkhash:8].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })   //对js和css文件压缩
    ]
})

var assetsPath = path.join(__dirname, '../dist/prod');
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
// console.log(assetsPath);
// cp('-R', )



webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if(err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});
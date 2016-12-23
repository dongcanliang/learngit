
require('shelljs/global');
const webpack = require('webpack');
const config = require('../config');

const env = process.env.NODE_ENV = config.dev.env.NODE_ENV;

// console.log(env + ' ' + config.dev.env.NODE_ENV);

const merge = require('webpack-merge');
const validate = require('webpack-validator'); 	//检查导出对象
const webpackBaseConf = require('./webpack.base.conf.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const ora = require('ora');
var spinner = ora('building for development...');

spinner.start();

var webpackConfig = merge(webpackBaseConf, {
    devtool: '#eval-source-map',
    output: {
        path: config.dev.assetsRoot,
        // publicPath: '../dist/dev',
        filename: './js/[name]-[chunkhash:8].js'
    },
    plugins: [
        // new ExtractTextPlugin(env === "development" ? './css/[name].[chunkhash:8].css' : './css/[name].[chunkhash:8].min.css'),
    ]
})

var assetsPath = path.join(__dirname, '../dist/dev');
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
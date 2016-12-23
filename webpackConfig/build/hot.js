
const path = require('path');
const webpack = require('webpack');
const config = require('../config');

const env = process.env.NODE_ENV = config.hot.env.NODE_ENV;

const merge = require('webpack-merge');
const validate = require('webpack-validator'); 	//检查导出对象
const baseWebpackConfig = require('./webpack.base.conf');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = validate(merge(baseWebpackConfig, {
        // entry: {
        //     main: './src/js/main.js'
        // },
        output: {
            path: config.hot.assetsRoot,
            // publicPath: path.join(__dirname,'../hot'),
            filename: './js/[name].js'
            // filename: env == 'hot' ? 'js/[name].js' : 'js/[name]-[hash:5].js'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({multiStep: true}),
            new OpenBrowserPlugin({ url: 'http://localhost:8080' })
        ],
        devServer: {
            contentBase: './hot',
            host: 'localhost',
            port: '8080',
            hot: true,
            stats: 'errors-only',
            inline: true,
            // colors: true,
            historyApiFallback: true
        }
}))



    

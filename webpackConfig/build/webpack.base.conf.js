const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV
// console.log(env + ' -haha');
module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    // output: {
    //     path: config.prod.assetsRoot,
    //     publicPath: '../dist',
    //     filename: env == 'hot' ? 'js/[name].js' : 'js/[name]-[hash:5].js'
    // },
    resolve: {
        extensions: ['', '.js', '.css', '.scss', '.png', '.jpg'],
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        // preloaders: [
        //     {
        //         test: /\.js$/,
        //         loader: 'eslint',
        //         include: path.resolve(__dirname, '../src/js'),
        //         exclude: path.resolve(__dirname, '../node_modules')
        //     }
        // ],
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: './img/[name].' + env === "hot" ? '[ext]' : (env === "development" ? '[chunkhash:8].[ext]' : '[chunkhash:8].min.[ext]')
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: './font/[name].' + env === "hot" ? '[ext]' : (env === "development" ? '[chunkhash:8].[ext]' : '[chunkhash:8].min.[ext]')
                }
            }
        ]
    },
    eslint: {
        configFile: path.resolve(__dirname, '../.eslintrc'), // 指定eslint的配置文件在哪里
        failOnWarning: true, // eslint报warning了就终止webpack编译
        failOnError: true, // eslint报error了就终止webpack编译
        // cache: true, // 开启eslint的cache，cache存在node_modules/.cache目录里
    },
    plugins: [
        new webpack.DefinePlugin({
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Swiper: 'swiper'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),  //分析使用最多的模块 分配小的ID
        new ExtractTextPlugin('./css/[name].' + env === "hot" ? 'css' : (env === "development" ? './css/[name].[chunkhash:8].css' : './css/[name].[chunkhash:8].min.css')),
        new webpack.NoErrorsPlugin()
    ]
}
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.config.js');
const merge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = merge(base,{
    devtool:'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.HotModuleReplacementPlugin(), // 热加载(全局刷新)
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: '/',
        host:'127.0.0.1',
        port: 9000,
        historyApiFallback: true,
        hot: true // 激活服务器的HMR
    }
})
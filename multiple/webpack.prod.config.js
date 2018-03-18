const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
    devtool:'cheap-module-source-map',
    output: {
        filename: 'js/[name].[chunkhash:10].js'
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('css/[name].[contenthash:10].css'),
        new UglifyJSPlugin()
    ]
})
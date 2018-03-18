const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash'); //单独处理manifest.js
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entryConfig = require('./config/entry.config.js');
const util = require('./config/util.js')
const config = {
    entry: Object.assign({
        vendor: ['jquery'],
        underscore:['underscore']
    }, entryConfig.entryObj()),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    // resolve: {
    //     alias: {
    //         'handlebars': 'handlebars/dist/handlebars.min.js'
    //     }
    // },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
            },
            // {
            //     test: /\.(handlebars|hbs)$/,
            //     use: [{
            //         loader: 'handlebars-template-loader'
            //     }]
            // },
            {
                test: /\.(html|htm)$/,
                exclude:/index\.html/,
                use: ['underscore-template-loader',]
            },
            {
                test: /index.(html|htm)$/,
                use: ['html-loader',]
            },
            {
                test: /\.tpl$/,
                use: ['raw-loader',]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader:'css-loader',
                        options:{
                            minimize:true
                        }
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
                            },
                        },
                        { loader: 'less-loader' }
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit: 10000,
                        name: 'img/[name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new WebpackMd5Hash(),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     _: "jquery",
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common","underscore","vendor",'runtime'],
            minChunks: 2
        }),
        new webpack.HashedModuleIdsPlugin(),
        ...util.newHtml(entryConfig.entryArray()),
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './src/static/*'),
                to: path.join(__dirname, 'dist/static'),
                flatten: true
            },
            {
                from: path.resolve(__dirname, './src/events/favicon.ico'),
                to: path.join(__dirname, 'dist'),
                flatten: true
            }
        ])
    ]
}

module.exports = config;
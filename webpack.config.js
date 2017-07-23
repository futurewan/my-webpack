var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // devtool: 'eval-source-map',
    entry: "./src/app/main.js", // 唯一入口文件 __dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

    output: { //打包后文件
        path: path.join(__dirname, "dist"), // 存放的地方
        filename: "assets/js/[hash].js", // 文件名
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title: 'webpack hello',
            minify: {
                removeComments: true,
                // collapseWhitespace: true
            }
        })
    ],



    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.join(__dirname, "src"),
                exclude: path.join(__dirname, "node_modules"),
                query: {
                    presets: ["latest"]
                }

            },
            {
                test:/\.html$/,
                loader:"html-loader"
            },
            {
                test:/\.tpl$/,
                loader:"ejs-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('postcss-import')(),
                            require('autoprefixer')()
                        ]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loaders:[
                    "url-loader?limit=1000&name=assets/images/[name]-[hash:5].[ext]",
                    "image-webpack-loader"
                ]
            }
        ]
    },
    devServer: {
        hot: true, // 告诉 dev-server 我们在使用 HMR
        contentBase: path.resolve(__dirname, 'src'),
        publicPath: '/'
    }
    // --devtool eval：为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
    // --progress：显示合并代码进度
    // --colors -- hot：命令行中显示颜色
    // --content-base 指向设置的输出目录
}
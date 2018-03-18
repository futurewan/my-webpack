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
        // new WebPlugin({
        //  // html模版文件路径（相对于webpack.config.js的完整路径）
        //          template: './h5/events/store/index.html',
        //          // 输出的html文件名称或路径，必填，注意不要重名，重名会覆盖相互文件
        //          filename: 'store.html',
        //          //该html文件依赖的entry，必须是一个数组。依赖的资源的注入顺序按照数组的顺序
        //          // requires:['store']
        //    }),
        // new HtmlWebpackPlugin({
        //  filename:'./store.html', //打包后文件
        //  template:path.join(__dirname,'h5/events/store/index.html') //模版文件
        //  inject: true, // js插入的位置，true/'head'/'body'/false
        //     hash: true, // 为静态资源生成hash值
        //     chunks: ['vendors', 'about'], // 需要引入的chunk，不配置就会引入所有页面的资源
        //     minify: { // 压缩HTML文件
        //       removeComments: true, // 移除HTML中的注释
        //       collapseWhitespace: false // 删除空白符与换行符
        //     }
        // })
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
var path = require('path');
const webpack = require('webpack');

module.exports = {
    // devtool: 'eval-source-map',
    entry: path.resolve(__dirname, "src/app/main.js"), // 唯一入口文件 __dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 启用 HMR
    ],


    output: { //打包后文件
        path: path.resolve(__dirname, "dist"), // 存放的地方
        filename: "bundle.js" // 文件名
    },

    module: {
        loaders: [{
            test: /\.json$/,
            loader: "json-loader"
        }]
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
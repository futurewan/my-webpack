module.exports = {
    entry: __dirname + "/app/main.js", // 唯一入口文件 __dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    output: { //打包后文件
        path: __dirname + "/public", // 存放的地方
        filename: "bundle.js" // 文件名
    }
}
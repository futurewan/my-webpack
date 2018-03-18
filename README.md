## webpack构建流程
从启动webpack构建到输出结果经历了一系列过程，它们是：
1. 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
2. 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
3. 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
4. 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
5. 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
6. 输出所有chunk到文件系统。


## 入口(entry)
> 指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始

### 对象语法
- 分离 应用程序(app) 和 第三方库(vendor) 入口
```
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
```
这告诉我们 webpack 从 app.js 和 vendors.js 开始创建依赖图(dependency graph)。这些依赖图是彼此完全分离、互相独立的


## 出口(output)
> 告诉 webpack 在哪里输出它所创建的 bundles




## loader
> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
module.loaders 改为 module.rules
链式loader
webpack1语法
```
module: {
    loaders: [{
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
    })
}
```
webpack2、3语法
```
module: {
    rules: [{
        test: /\.less$/,
        use: [
            "style-loader",
            "css-loader",
            "less-loader"
        ]
    }]
}
```

### 文件
#### raw-loader 加载文件原始内容，比如txt
#### file-loader 将文件发送到打包后文件夹中
#### url-loader 功能类似file-loader可以设置小图片转换base64图片
```
{
    test: /\.(png|jpg|gif)$/,
        use: [
        {
            loader: 'file-loader',
            options: {}
        }
    ]
}
```

### style-loader css代码放入js代码里再加入到html里
### css-loader 读取css文件
### postcss
后处理css文件，对css文件做语法分析，真正的核心操作，依赖于postcss庞大的插件群体
[postcss]:https://github.com/postcss/postcss/blob/master/docs/plugins.md
> 比如css的语法验证，压缩，支持变量和混入语法

#### autoprefixer 补全浏览器前缀
#### postcss-import
css文件中使用@import引入其他样式文件，但是使用autoprefixer发现，import进来的样式没有处理
```
postcss: function(webpack) {
  return [
    postcssImport({
      addDependencyTo: webpack
    }),
    autoprefixer
  ]
}
```
### less-loader sass-loader 编译为css文件



## 插件
> loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量

### html-webpack-plugin 生成html文件
- 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
- 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口



### extract-text-webpack-plugin
webpack 把所有的资源都当成了一个模块, CSS,Image, JS 字体文件资源, 都打包到一个 bundle.js 文件中
webpack单独打包css
配置：
```
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader", //编译后用什么loader来提取css文件
          use: "css-loader" //需要什么样的loader去编译文件
        })
      }
    ]
  }
```
publicfile //用来覆盖项目路径,生成该css文件的文件路径

`new ExtractTextPlugin([id: string], filename: string, [options])`
1.id该插件实例的唯一标志，一般是不会传的，其自己会生成。
2.filename文件名。可以是[name]、[id]、[contenthash]
	[name]：将会和entry中的chunk的名字一致
	[id]：将会和entry中的chunk的id一致
	[contenthash]：根据内容生成hash值
3.options
	allchunk： 是否将所有额外的chunk都压缩成一个文件
	disable：禁止使用插件

### CopyWebpackPlugin 拷贝资源插件
```
CopyWebpackPlugin([
        {
            context: 'global/img',
            from: '**/*',
            to:'img/common'
        },
        {
            from: 'img',
            to:'img'
        },
        {
            from :'global/lib/es5-shim-sham.js'
        }
])
```
from 定义要拷贝的源目录.   
to 定义要拷盘的目标目录.   
context 上下文.   
flatten 只拷贝文件不管文件夹 默认是false.   
ignore 忽略拷贝指定的文件 可以用模糊匹配.   
force 强制覆盖先前的插件 可选 默认false.   


### cross-env
在不同系统环境下设置变量


### webpack-dev-server
* 开发环境用于调试报错信息等,生成一个开发用的服务器，在文件有变化的时候自动给我们打包，然后刷新页面
* 它还有个模块热替换的功能 .. 就是它可以只替换有变化的地方 .. 不需要刷新整个页面 ... 


### webpack自带插件
#### UglifyJsPlugin 压缩js css文件
```
new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
```
`Unexpected token: operator (>) from UglifyJs`问题可以使用 uglifyjs-webpack-plugin插件


#### CommonsChunkPlugin 提取 chunks 之间共享的通用模块
webpack将多个模块打包之后的代码集合称为chunk
webpack打包的代码都是以chunk的形式存储的
- 是一个可选的用于建立一个独立文件(又称作 chunk)的功能
- 通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用
- 语法：
new webpack.optimize.CommonsChunkPlugin(options)
- 配置
1. 决定生成chunk的参数: name, names, async
- name: string: 公共chunk的名字
- names: string[]: 和name一样，不过传入的是一个数组
- async: boolean|string: 把公共代码提取到一个懒加载的chunk，在被使用到时才进行下载
2. 决定被提取的chunk: chunks, children, deepChildren
3. 决定提取条件: minChunks
- minChunks: number|infinity|function(module,count)->boolean: 如果传入数字或infinity(默认值为3)，就是告诉webpack，只有当模块重复的次数大于等于该数字时，这个模块才会被提取出来。当传入为函数时，所有符合条件的chunk中的模块都会被传入该函数做计算，返回true的模块会被提取到目标chunk


### HotModuleReplacementPlugin 热模块替换
```
new webpack.HotModuleReplacementPlugin()
```

```
devServer: {
    hot: true // 激活服务器的HMR
}
```





#### DefinePlugin 允许在编译时(compile time)配置的全局常量


*******
## 优化
### 优化输出
#### 压缩css
`css-loader?minimize`去除css文件里有很多空格和tab
#### tree-shaking
借助es6 `import export`语法静态性的特点来删掉export但是没有import过的东西
- 配置babel让它在编译转化es6代码时不把import export转换为cmd的module.export，配置如下：
```
"presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ]
]
```

#### 优化 UglifyJsPlugin
```
new UglifyJsPlugin({
    // 最紧凑的输出
    beautify: false,
    // 删除所有的注释
    comments: false,
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告  
      warnings: false,
      // 删除所有的 `console` 语句
      // 还可以兼容ie浏览器
      drop_console: true,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    }
})
```
#### 用`imagemin-webpack-plugin`压缩图片

### 更快的构建
#### 缩小文件搜索范围
- 配置模块库.   
在js里出现import 'redux'这样不是相对也不是绝对路径的写法时会去node_modules目录下找。但是默认的配置会采用向上递归搜索的方式去寻找node_modules，但通常项目目录里只有一个node_modules在项目根目录 
```
module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')]
    }
};
```
- 配置loader
```
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: path.resolve(__dirname, 'src')
}
```

#### 开启 babel-loader 缓存
babel编译过程很耗时，好在babel-loader提供缓存编译结果选项，在重启webpack时不需要创新编译而是复用缓存结果减少编译流程。babel-loader缓存机制默认是关闭的，打开的配置如下：   
```
{
test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
}
```
#### 使用 alias
resolve.alias 配置路径映射。
发布到npm的库大多数都包含两个目录，一个是放着cmd模块化的lib目录，一个是把所有文件合成一个文件的dist目录，多数的入口文件是指向lib里面下的。   
默认情况下webpack会去读lib目录下的入口文件再去递归加载其它依赖的文件这个过程很耗时，alias配置可以让webpack直接使用dist目录的整体文件减少文件递归解析。配置如下：
```
module.exports = {
  resolve: {
    alias: {
      'moment': 'moment/min/moment.min.js',
      'react': 'react/dist/react.js',
      'react-dom': 'react-dom/dist/react-dom.js'
    }
  }
};
```
#### 使用 noParse
`module.noParse` 配置哪些文件可以脱离webpack的解析。
有些库是自成一体不依赖其他库的没有使用模块化的，比如jquey、momentjs、chart.js，要使用它们必须整体全部引入。   
webpack是模块化打包工具完全没有必要去解析这些文件的依赖，因为它们都不依赖其它文件体积也很庞大，要忽略它们配置如下：
```
module.exports = {
  module: {
    noParse: /node_modules\/(jquey|moment|chart\.js)/
  }
};
```
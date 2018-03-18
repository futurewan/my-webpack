## 运行环境
本项目依赖于webpack3，node6.9及以上版本。
- 首先确保node运行环境>= 6.9
- `npm install`

## 项目运行
本项目为多页面应用，html页面是events的子目录名，且必须有一个index入口文件。
- 比如evens下有store目录名，打包后会在dist目录下生成store.html文件
- index.js默认模版文件时events/index.html，如果需要自定义的html模版，需要在文件夹里新增index.html文件，注意必须要和index.js同目录下
- 当然也可以有静态页面，所有静态页面必须存放于static目录下，存放所有静态文件，打包后会在dist下生成static目录


### 开发环境
- 执行`npm start`，项目运行在`http://127.0.0.1:8000/`
- 基于项目运行规则，访问页面地址方式：    
> 动态页面：`http://127.0.0.1:8000/demo.html`   
> 静态页面：`http://127.0.0.1:8000/static/demo.html`   

### 生产环境
- `npm run build`打包目录dist
- 访问页面地址同开发环境


## 其他
- events目录下common.js和style.css是所有页面（除静态页面）都会引入的资源
- assets目录用于存放项目中的公共资源
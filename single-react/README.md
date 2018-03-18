## 运行环境
- 首先确保node运行环境>= 6.9
### 前端运行环境
本项目依赖于webpack3，react-router4.0及以上版本，使用react、redux、antd-mobile等
- `npm install`
### node后端运行环境
依赖于express4及以上版本
- `npm install`


## 项目运行
本项目为前端用react，服务端用express，使用需要先开启服务


### 开发环境
- 终端1 cd server && npm start 服务端运行在9005端口
- 终端2 回到根目录 npm start 并打开项目`http://127.0.0.1:9006`  


### 生产环境
- 根目录`npm run build`资源打包进server的public目录下
- cd server && npm start
- 访问页面地址`http://127.0.0.1:9005`可直接访问服务端口


## 主要目录结构
```
.
├── .vscode                  # node开发环境配置文件
├── server                   # 后台服务
│   ├── bin                  # 程序启动和渲染
│   ├── database             # 存放页面所需要的json数据
│   ├── public               # 前端静态资源存放位置
│   ├── util                 # 工具库方法
│   ├── routes               # 路由于请求接口管理
│   ├── views                # 前端模板存放位置
│   ├── app.js               # 后台服务入口
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── app.js               # 程序根组件
│   ├── store.js             # Redux管理
│   ├── components           # 全局组件
│   ├── lib                  # 全局方法
│   ├── pages                # 项目页面结构
│   ├── assets               # 静态文件
│   └── routes               # 前端路由管理
└
```
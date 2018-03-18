const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
//检测文件或者文件夹存在 nodeJS
const fsExistsSync = function(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
const newHtml = function(entryArray){
	let htmlArray = [];
	entryArray.forEach(pathname => {
	    let htmlPath = path.join(__dirname, '../src/events', pathname, 'index.html');
	    const isHas = fsExistsSync(htmlPath);
	    if (!isHas) {
	        htmlPath = path.join(__dirname, '../src/events/index.html');
	    }
	    const cks = ['runtime','vendor','underscore','common', pathname];
	    let conf = {
	        filename: pathname + '.html',
	        template: htmlPath,
	        chunks: cks,
	        chunksSortMode:function (chunk1, chunk2) {
			    let order = cks;
			    let order1 = order.indexOf(chunk1.names[0]);
			    let order2 = order.indexOf(chunk2.names[0]);
			    return order1 - order2;  
			}
	    }
	    htmlArray.push(new htmlWebpackPlugin(conf))
	})
	return htmlArray;
}

module.exports = {
	fsExistsSync:fsExistsSync,
	newHtml:newHtml
}

// const { AutoWebPlugin } = require('web-webpack-plugin');

// const autoWebPlugin = new AutoWebPlugin('./src/events/', {
//     template: './src/events/index.html', // HTML 模版文件所在的文件路径
//     // 在所有入口页面的entry前插入
//     // preEntrys:[],
//     postEntrys: ['./src/events/style.css'], // 所有页面都依赖这份通用文件
//     //被忽略的页面名称列表，被忽略的页面将不会被AutoWebPlugin处理产生对于的html文件，类型是元素为字符串的数组
//     // ignorePages:['static'],
//     // 提取出所有页面公共的代码
//     commonsChunk: {
//         name: 'vendor', // 提取出公共代码 Chunk 的名称
//     },
// });
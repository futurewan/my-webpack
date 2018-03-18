const path = require('path');
const glob = require('glob');

const entryArray = function() {
    let globPath = 'src/events/**/index.js'
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    let files = glob.sync(globPath);
    let dirname, entries = []
    let reg = new RegExp('^src[\/|\\\\]events[\/|\\\\](.+)');
    for (let i = 0; i < files.length; i++) {
        dirname = path.dirname(files[i])
        if (!!reg.test(dirname)) {
            entries.push(dirname.match(reg)[1])
        }
    }
    return entries
}
const entryObj = function() {
    let entryObj = {}
    entryArray().forEach(item => {
        entryObj[item] = path.join(__dirname, '../src/events/', item, 'index.js')
    })
    return entryObj
}

module.exports = {
    entryArray: entryArray,
    entryObj: entryObj
};
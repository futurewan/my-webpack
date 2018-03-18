import $ from 'jquery';
import storage from '../assets/js/storage.js';
import core from '../assets/js/core.js';

const common = {
    api:api,
    core:core,
    storage:storage,
}
var  mytoken = core.getUrlParam("mytoken") || 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiI0NCIsImV4cCI6MTgzMzUwNzU3OH0.tS44bYwLe7f1W6aC9qBW_K8z1qE97XVYcYrMvIrHuSSIcaIvA2ngY3fKqLWJqWfOWNBBFHBo-WZzWWepA0-WIA'; //从url中取传来的token值
storage.setSS('mytoken', mytoken);//保存token

$.ajaxSetup({
    dataType: "json",
    contentType: "application/json",
    accept: "application/json",
    headers: {
        "auth-token": storage.getSS('mytoken') || '',
        "client-type": '3'
    }
});

(function() {
    let w = document.documentElement.clientWidth || document.body.clientWidth;
    if (w > 980) {
        w = 980
    }
    w = w / 7.5;
    document.getElementsByTagName('html')[0].style.fontSize = w + 'px';
})();

export default common;


import axios from 'axios';

export const axiosAjax = function(opts) {
    let defaults = {
        method: "get",
        url: "",
        //baseURL`将被添加到`url`前面，除非`url`是绝对的
        baseURL: "http://127.0.0.1:9005/",
        //与请求一起发送的URL参数
        params: {},
        //请求主体发送的数据,仅适用于请求方法“PUT”，“POST”和“PATCH”
        data: {},
        responseType: "json", // default
        //允许在请求数据发送到服务器之前对其进行更改
        // transformRequest: [
        //     function(data) {
        //         // 做任何你想要的数据转换
        //         return data;
        //     }
        // ],
        // `transformResponse`允许在 then / catch之前对响应数据进行更改
        // transformResponse: [
        //     function(data) {
        //         // Do whatever you want to transform the data
        //         return data;
        //     }
        // ]
    };
    const options = Object.assign({}, defaults, opts);
    console.log(options)
    return axios(options);
};



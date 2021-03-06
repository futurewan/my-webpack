import $ from "jquery";
import axios from "axios";
import _ from "underscore";
import templateDemo from "./demo.tpl";
import "./demo.css";

const img_appointment = require('../../assets/images/course/appointment-icon.png');



const viewData = {
	resultList: [
	  {
		productId: 8183,
		productName: "存管专用测试-hp2",
		productNo: "CCSH2018011002-001",
		rateYear: 0.06,
		baseRate: 0.06
	  },
	  {
		productId: 8183,
		productName: "存管专用测试-hp2",
		productNo: "CCSH2018011002-001",
		rateYear: 0.06,
		baseRate: 0.06
	  }
	],
	img:{
		appointment:img_appointment
	}
  };
  $("#app").html(_.template(templateDemo)(viewData));
  $("h1").on("click", function() {
	alert("事件");
  });


// axios.defaults.headers.client = 5;
// axios.defaults.headers['auth-token'] = '';

// async function pro(){
// 	await ajaxpro().then((data)=>{
// 		console.log('ajaxhoumian',data)
// 	});
// 	console.log('end')
// }
// pro()
// function ajaxpro() {
//   return new Promise((resolve, reject) => {
//     ajax({
//       url: "product/index",
//       params: {
//         iPage: 1,
//         pageSize: 3
//       }
//     }).then(data => {
//       const mydata = data.data;
//       if (mydata.resCode === "0000") {
//         $("#app").html(_.template(templateDemo)(mydata));
//       }
//       console.log("ajax");
//       resolve(mydata);
//     });
//   });
// }
// function ajax(opts) {
//   let defaults = {
//     method: "get",
//     url: "",
//     //baseURL`将被添加到`url`前面，除非`url`是绝对的
//     baseURL: "http://10.52.2.203:8012/v270/api/",
//     //与请求一起发送的URL参数
//     params: {},
//     //请求主体发送的数据,仅适用于请求方法“PUT”，“POST”和“PATCH”
//     data: {},
//     responseType: "json", // default
//     //允许在请求数据发送到服务器之前对其进行更改
//     transformRequest: [
//       function(data) {
//         // 做任何你想要的数据转换
//         return data;
//       }
//     ],
//     // `transformResponse`允许在 then / catch之前对响应数据进行更改
//     transformResponse: [
//       function(data) {
//         // Do whatever you want to transform the data
//         return data;
//       }
//     ]
//   };
//   const options = Object.assign({}, defaults, opts);

//   return axios(options);
// }
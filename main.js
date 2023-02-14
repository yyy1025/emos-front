import App from './App'

// #ifndef VUE3
import Vue from 'vue'
let baseUrl="http://127.0.0.1:8080/ans-wx-api/user";
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// let url={
// 	register:baseUrl+"/user/register"
// };
Vue.prototype.url={
	register:baseUrl+"/register",
	login:baseUrl+"/login"
};
Vue.prototype.ajax=function(url,method,data,func){
	uni.request({
		"url": url,
		"method": 'POST',
		// "header":uni.getStorageSync('token'),
		"data": data,
		success: res => {
			if(res.statusCode==401){
				//没有注册或者登录
				uni.redirectTo({
					url: '/pages/login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}else if(res.statusCode==200&&res.data.code==200){
				//HTTP状态码为200，业务状态码也是200，保存token
				let data=res.data;
				if(data.hasOwnProperty("token")){
					uni.setStorageSync("token",data.token);
				}
				func(res);
			}else{
				uni.showToast({
					icon:"none",
				    title: res.data,
				    // duration: 2000
				});

			}
		},
		fail: () => {},
		complete: () => {}
	});
}
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
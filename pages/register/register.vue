<template>
	<view>
		<image class="register-logo" src="../../static/logo-2.png" mode="widthFixed"></image>
		<!-- 输入框输入邀请码 -->
		<view class="invite-code">
			<input class="invite-inputer" type="text" placeholder="请输入邀请码" maxlength="6" v-model="registerCode"/>
			<view class="shuoming">管理员创建员工账号后，你可以从你的个人邮箱中获取注册邀请码</view>
		</view>
		<button class="register-button" open-type="getUserInfo" @tap="doRegister()">注册账号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerCode:""
				
			}
		},
		methods: {
			
			
			//获取临时授权和微信账号的基本信息
			//success回调函数里面就包含临时授权字符串
			doRegister:function(){
				//邀请码验证，不能为空，必须是6位数字格式
				let that=this;
				if(that.registerCode==null||that.registerCode.length==0){
					uni.showToast({
						icon:"none",
						title: '邀请码不能为空'
					});
					return;
				}else if(/^[0-9]{6}$/.test(that.registerCode)==false){
					uni.showToast({
						icon:"none",
						title: '邀请码必须为6位数字'
					});
					return;
				}
				//登录注册
				uni.login({
					provider: 'weixin',
					success: res => {
						//在这个回调函数得到授权字符串
						let code=res.code;
						// console.log(res.code);
						console.log("1");
						//获取微信的基本信息
						//后端获取openid还是前端获取openid呢
						// let appId="wx5c5b558c385e2461";
						// let secret="def5cdf5a5df6979bac1eae9b149174e";
						// let grant_type="authorization_code";
						// let url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=${grant_type}`;
						// uni.request({
						// 	url: url,
						// 	method: 'GET',
						// 	data: {},
						// 	success: res => {
						// 		console.log(res);
						// 	},
						// 	fail: () => {},
						// 	complete: () => {}
						// });
						uni.getUserInfo({
							provider:"weixin",
							success:res=>{
								// 获取昵称、头像
								let nickName=res.userInfo.nickName;
								let avatarUrl=res.userInfo.avatarUrl;
								// console.log(nickName);
								// console.log(avatarUrl);
								console.log("2");
								let data={
									code:code,
									nickName:nickName,
									photo:avatarUrl,
									registerCode:that.registerCode
								};
								let url=that.url;
								// console.log(url);
								// console.log(that.ajax);
								let ajax=function(url,method,data,func){
									uni.request({
										"url": url,
										"method": 'POST',
										"header":uni.getStorageSync('token'),
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
								};
								ajax(that.url.register,"post",data,function(res){
									console.log(res);
									//缓存permissions
									let permissions=res.data.permissions;
									uni.setStorageSync("permissions",permissions);
								})
						}
						});
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");

</style>

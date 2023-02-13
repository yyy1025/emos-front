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
				
			}
		},
		methods: {
			//获取临时授权和微信账号的基本信息
			//success回调函数里面就包含临时授权字符串
			doRegister:function(){
				uni.login({
					provider: 'weixin',
					success: res => {
						//在这个回调函数得到授权字符串
						let code=res.code;
						// console.log(res.code);
						//获取微信的基本信息
						uni.getUserInfo({
							provider:"weixin",
							success:res=>{
								//获取昵称、头像
								let nickName=res.userInfo.nickName;
								let avatarUrl=res.userInfo.avatarUrl;
								console.log(nickName);
								console.log(avatarUrl);
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

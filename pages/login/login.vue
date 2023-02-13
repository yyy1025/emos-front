<template>
	<view>
		<!-- 编写login登录页面 -->
		
		<!-- 静态显示 -->
			<!-- 设置mode=“widthFixed”保证图像不失真 -->
		<image class="login-logo" src="../../static/logo-1.png" mode="widthFixed"></image>
		<view class="logo-title">线上答疑系统</view>
		<view class="release-title">v-20</view>
		<!-- 登录按钮 -->
		<button class="login-button" open-type="getUserInfo" @tap="doLogin()">登录</button>
		<!-- 超链接到注册页面 -->
		<view class="register-container">
			没有账号？
			<text class="register-link" @tap="goRegiater()">点击登录</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goRegiater:function(){
				uni.navigateTo({
					url: '/pages/register/register',
				});
			}
			
		}
	}
</script>

<style lang="less">
	@import url("login.less");

</style>

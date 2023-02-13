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
			
		}
	}
</script>

<style lang="less">
	@import url("register.less");

</style>

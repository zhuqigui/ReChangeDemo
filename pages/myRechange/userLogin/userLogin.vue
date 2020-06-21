<template>
	<view>
		<!--手机号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">手机号:</view>
			<!--:value="phone"-->
			<input class="uni-input" maxlength="13" type="number" placeholder="请输入手机号" @input="onPhoneInput" v-model="phone" />
		</view>
		<!--密码-->
		<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;">
			<view class="head">密 码:</view>
			<!--:value="password"-->
			<input class="uni-input" maxlength="20" password type="number" @input="onPasswordInput" style="margin-left: 28upx;" v-model="password" placeholder="请输入密码" />
		</view>
		<!--登录按钮-->
		<view>
			<button class="btn_commit" @click="login">登 录</button>
		</view>
		<!--最下面注册账号+忘记密码按钮-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<!-- <view class="head" @click="gotoForgetPwd()" style="color: #007AFF;">忘记密码</view> -->
			<view class="head head_right" @click="gotoRegister()" style="color: #007AFF;">注册账号</view>
		</view>
	</view>
</template>

<script>
	const duration = 1000
	export default {
		data() {
			return {
				loading: false,
				res: '',
				phone: '',
				password: ''
			}
		},
		methods: {
			 login: function() {
				 
				 	const {
				 		phone,
				 		password
				 	} = this
				 	if (!phone) {
				 		uni.showModal({
				 			content: '请输入手机号码',
				 			showCancel: false
				 		})
				 		return
				 	}
				 	if (!password) {
				 		uni.showModal({
				 			content: '请输入密码',
				 			showCancel: false
				 		})
				 		return
				 	}
				 	uni.showLoading({
				 		title: '登录中...'
				 	})
					console.log("phone=="+phone+",password=="+password);
				 	uniCloud.callFunction({
				 		name: 'rechangedemo_login',
				 		data: {
				 			phone,
				 			password,
				 		}
				 	}).then(res => {
				 		uni.hideLoading()
						if (res.result.code==0) {
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
							uni.setStorageSync('phone', phone)
							console.log("uni.redirectTo rechange phone=="+phone);
							this.gotoRechange();
						}
							//this.gotoRechange();
				 		// if (res.result.token) {
				 		// 	uni.showToast({
				 		// 		title: '登录成功',
				 		// 		icon: 'none'
				 		// 	})
				 		// 	uni.setStorageSync('token', res.result.token)
				 		// 	uni.setStorageSync('phone', res.result.phone)
				 		// 	uni.switchTab({
				 		// 		url: '/pages/tabbar/member'
				 		// 	})
				 		// } else {
				 		// 	return Promise.reject(new Error(res.result.msg))
				 		// }
				 	}).catch(err => {
				 		uni.hideLoading()
				 		uni.showModal({
				 			content: err.message || '登录失败',
				 			showCancel: false
				 		});
						// this.phone='';
						// this.password='';
				 	})
				 
			// 	console.log("this.phonenumber==" + this.phonenumber + ",this.password==" + this.password);
			// 	uni.request({
			// 		url: 'http://39.106.217.14:8000/api/user/login/',
			// 		dataType: 'text',
			// 		data: {
			// 			//noncestr: Date.now()
			// 			'phone': this.phonenumber,
			// 			'password': this.password
			// 		},
			// 		method: 'POST',
			// 	}).then(res => {
			// 		console.log('request success', res[1]);
			// 		// uni.showToast({
			// 		//   title: '登录成功',
			// 		//   icon: 'success',
			// 		//   mask: true,
			// 		//   duration: duration
			// 		// });
			// 		//this.res =JSON.stringify(res[1]);
			// 		this.loading = false;
			// 		//保存手机号、token和城市
			// 		// var phone=JSON.stringify(res[1])[]
			// 		var data = JSON.parse(res[1].data);
			// 		var code = data.code;
			// 		console.log("code==" + code);
			// 		//if(statusCode==500)
			// 		if (code == 1001 || code == 1002 ||
			// 			code == 1003 || code == 1004 ||
			// 			code == 1012
			// 		) {
			// 			var errorMsg = data.data['errmsg'];
			// 			console.log("errorMsg==" + errorMsg);
			// 			uni.showModal({
			// 				title: '登录失败',
			// 				content:errorMsg,
			// 				showCancel:false,
			// 				success: function(res) {}
			// 			});
			// 			this.phonenumber = "";
			// 			this.password = "";
			// 			return;
			// 		} else if (code == 400 || code == null) {
			// 			uni.showModal({
			// 				title: '登录失败',
			// 				content:"手机号和密码不能为空",
			// 				showCancel:false,
			// 				success: function(res) {}
			// 			});
			// 			return;
			// 		}
			// 		console.log("city==" + data.data['city']);
			// 		console.log("phone==" + data.data['phone']);
			// 		console.log("token==" + data.data['token']);
			// 		uni.setStorageSync("phone", data.data['phone']);
			// 		uni.setStorageSync("city", data.data['city']);
			// 		uni.setStorageSync("token", data.data['token']);
			// 		this.gotoRechange();
			// 		//this.$destroy();
			// 	}).catch(err => {
			// 		console.log('request fail', err);
			// 		uni.showModal({
			// 			content: err.errMsg,
			// 			showCancel: false
			// 		});
			// 		this.loading = false;
			 	//});
			 },
			onPhoneInput: function(event) {
				this.phonenumber = event.target.value
			},
			onPasswordInput: function(event) {
				this.password = event.target.value
			},
			gotoRechange: function() {
				uni.switchTab({
					url: "/pages/rechange/rechange"
				})
			},
			gotoForgetPwd: function() {
				uni.navigateTo({
					url: "/pages/myRechange/forgetPassword/forgetPassword"
				})
			},
			gotoRegister: function() {
				uni.navigateTo({
					url: "/pages/myRechange/userRegister/userRegister"
				})
			}
		},
		onLoad() {
			console.log("onLoad...");
			uni.hideTabBar({
				success() {
					console.log("success...");
				},
				fail(res) {
					console.log("fail..."+res.msg);
				}
			})
		}
	}
</script>

<style>
	.head {
		margin: 15upx 10upx;
		padding: 0 20upx;
		/* background-color: #ebebeb; */
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 30upx;
	}

	.head_right {
		right: 15upx;
		margin-right: 15upx;
		font-size: 30upx;
	}

	.btn_commit {
		background: #09BB07;
		width: 100%;
		height: 100upx;
	}

	.uni-input {
		right: 15upx;
		margin-right: 15upx;
		width: 70%;
	}
</style>

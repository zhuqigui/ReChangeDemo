<template>
	<view>
		<!--手机号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">手机号:</view>
			<input class="uni-input" maxlength="13" type="number" placeholder="请输入手机号" @input="onPhoneInput" :value="phone" />
		</view>
		<!--密码-->
		<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;">
			<view class="head">密 码:</view>
			<input class="uni-input" maxlength="20" password type="number" @input="onPasswordInput" style="margin-left: 28upx;"
			 placeholder="请输入密码" :value="password" />
		</view>
		<!--注册按钮-->
		<view>
			<button class="btn_commit" @click="login">注 册</button>
		</view>
	</view>
</template>

<script>
	const duration = 2000
	export default {
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		methods: {
			login: function() {
				console.log("this.phone==" + this.phone + ",this.password==" + this.password+",token=="+uni.getStorageSync('token'));
				// uni.request({
				// 	url: 'http://39.106.217.14:8000/api/user/register/',
				// 	dataType: 'text',
				// 	data: {
				// 		//noncestr: Date.now()
				// 		'phone': this.phone,
				// 		'password': this.password
				// 	},
				// 	method: 'POST',
				// }).then(res => {
				// 	console.log('request success', res[1]);

				// 	//this.res =JSON.stringify(res[1]);
				// 	this.loading = false;
				// 	var data = JSON.parse(res[1].data)
				// 	var code = data.code;
				// 	console.log("code==" + code);
				// 	//if(statusCode==500)
				// 	if (code == 1001 || code == 1002 ||
				// 		code == 1003 || code == 1004 ||
				// 		code == 1012
				// 	) {
				// 		var errorMsg = data.data['errmsg'];
				// 		console.log("errorMsg==" + errorMsg);
				// 		uni.showModal({
				// 			title: '注册失败',
				// 			content: errorMsg,
				// 			showCancel:false,
				// 			success: function(res) {}
				// 		});
				// 		this.phone = "";
				// 		this.password = "";
				// 		return;
				// 	} else if (code == 400 || code == null) {
				// 		uni.showModal({
				// 			title: '注册失败',
				// 			content: "手机号和密码不能为空",
				// 			showCancel:false,
				// 			success: function(res) {}
				// 		});
				// 		return;
				// 	}
				// 	uni.showToast({
				// 		title: '注册成功',
				// 		icon: 'success',
				// 		mask: true,
				// 		duration: duration
				// 	});
				// 	uni.navigateTo({
				// 		url: '../userLogin/userLogin',
				// 		success: res => {},
				// 		fail: () => {},
				// 		complete: () => {}
				// 	});
				// }).catch(err => {
				// 	console.log('request fail', err);
				// 	uni.showModal({
				// 		content: err.errMsg,
				// 		showCancel: false
				// 	});
				// 	this.loading = false;
				// });
				//let formData = e.detail.value;
				// let flag = this.validation(formData);
				// if (!flag) {
				// 	return false;
				// }
				uni.showLoading({
					title: '处理中...'
				})
				var data = {
					phone: this.phone,//formData.username,
					password: this.password,
					//token: uni.getStorageSync('token')
				}
				
				uniCloud.callFunction({
					name: 'rechangedemo_register',
					data
				}).then((res) => {
					uni.hideLoading()
					console.log("res=="+res);
					if (res.result.code === 0) {
						uni.showModal({
							content: '新建账户成功',
							showCancel: false,
							success() {
								console.log("register success to userLogin page...");
								// uni.redirectTo({
								// 	url: '../myRechange/userLogin/userLogin'
								// });
								uni.navigateTo({
									url: "/pages/myRechange/userLogin/userLogin"
								})
							}
						})
					} else {
						return Promise.reject(new Error(res.result.msg))
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: err.message || '新建账户失败',
						showCancel: false
					})
				})
			},
			onPhoneInput: function(event) {
				this.phone = event.target.value
			},
			onPasswordInput: function(event) {
				this.password = event.target.value
			},
		}
	}
</script>

<style>

</style>

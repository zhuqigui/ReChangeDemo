<template>
	<view>
		<!--手机号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">手机号:</view>
			<input class="uni-input" maxlength="13" type="number" placeholder="请输入手机号" @input="onPhoneInput" :value="phonenumber" />
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
				phonenumber: '',
				password: ''
			}
		},
		methods: {
			login: function() {
				console.log("this.phonenumber==" + this.phonenumber + ",this.password==" + this.password);
				uni.request({
					url: 'http://39.106.217.14:8000/api/user/register/',
					dataType: 'text',
					data: {
						//noncestr: Date.now()
						'phone': this.phonenumber,
						'password': this.password
					},
					method: 'POST',
				}).then(res => {
					console.log('request success', res[1]);

					//this.res =JSON.stringify(res[1]);
					this.loading = false;
					var data = JSON.parse(res[1].data)
					var code = data.code;
					console.log("code==" + code);
					//if(statusCode==500)
					if (code == 1001 || code == 1002 ||
						code == 1003 || code == 1004 ||
						code == 1012
					) {
						var errorMsg = data.data['errmsg'];
						console.log("errorMsg==" + errorMsg);
						uni.showModal({
							title: '注册失败',
							content: errorMsg,
							showCancel:false,
							success: function(res) {}
						});
						this.phonenumber = "";
						this.password = "";
						return;
					} else if (code == 400 || code == null) {
						uni.showModal({
							title: '注册失败',
							content: "手机号和密码不能为空",
							showCancel:false,
							success: function(res) {}
						});
						return;
					}
					uni.showToast({
						title: '注册成功',
						icon: 'success',
						mask: true,
						duration: duration
					});
					uni.navigateTo({
						url: '../userLogin/userLogin',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}).catch(err => {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
					this.loading = false;
				});
			},
			onPhoneInput: function(event) {
				this.phonenumber = event.target.value
			},
			onPasswordInput: function(event) {
				this.password = event.target.value
			},
		}
	}
</script>

<style>

</style>

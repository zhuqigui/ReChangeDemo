<template>
		<view>
		<!--手机号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">手机号:</view>
			<input class="uni-input" maxlength="13" type="number" placeholder="请输入手机号" @input="onPhoneInput" />
		</view>
		<!--密码-->
		<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;">
			<view class="head">密    码:</view>
			<input class="uni-input" maxlength="20" password type="number" @input="onPasswordInput" style="margin-left: 28upx;" placeholder="请输入密码" />
		</view>
		<!--注册按钮-->
		<view>
			<button class="btn_commit"  @click="login">注  册</button>
		</view>
	</view>
</template>

<script>
	const duration = 2000
	export default {
		data() {
			return {
				phonenumber:'',
				password:''
			}
		},
		methods: {
			login:function(){
				console.log("this.phonenumber=="+this.phonenumber+",this.password=="+this.password);
				uni.request({
					 url: 'http://192.168.1.111:8000/api/user/register/',
					 dataType: 'text',
					 data: {
					  //noncestr: Date.now()
					  'phone':this.phonenumber,
					  'password':this.password
					},
					method:'POST',
				}).then(res => {
				 console.log('request success', res[1]);
				 uni.showToast({
					  title: '注册成功',
					  icon: 'success',
					  mask: true,
					  duration: duration
				 });
				 //this.res =JSON.stringify(res[1]);
				 this.loading = false;
				 //保存手机号、token和城市
				 // var phone=JSON.stringify(res[1])[]
				 var data=JSON.parse(res[1].data)
				 // console.log("city=="+data.data['city']);
				 // console.log("phone=="+data.data['phone']);
				 // console.log("token=="+data.data['token']);
				 // uni.setStorageSync("phone",data.data['phone']);
				 // uni.setStorageSync("city",data.data['city']);
				 // uni.setStorageSync("token",data.data['token']);
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

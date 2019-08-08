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
		<!--登录按钮-->
		<view>
			<button class="btn_commit"  @click="login">登 录</button>
		</view>
		<!--最下面注册账号+忘记密码按钮-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head" @click="gotoForgetPwd()" style="color: #007AFF;">忘记密码</view>
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
				phonenumber:'',
				password:''
			}
		},
		methods: {
			login:function(){
				console.log("this.phonenumber=="+this.phonenumber+",this.password=="+this.password);
				uni.request({
					 url: 'http://192.168.1.111:8000/api/user/login/',
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
					  title: '登录成功',
					  icon: 'success',
					  mask: true,
					  duration: duration
				 });
				 //this.res =JSON.stringify(res[1]);
				 this.loading = false;
				 //保存手机号、token和城市
				 // var phone=JSON.stringify(res[1])[]
				 var data=JSON.parse(res[1].data);
				 var code=data.code;
				 console.log("code=="+code);
				 if(code==1004){
					 uni.showToast({
					 	title: '用户或密码错误,请重新登录',
					 	icon: 'success',
					 	mask: true,
					 	duration: duration
					 });
					 this.phonenumber="";
					 this.password="";
					 return;
				 }else if(code==1003){
					 uni.showToast({
					 	title: ' 用户不存在,请重新登录',
					 	icon: 'success',
					 	mask: true,
					 	duration: duration
					 });
					 this.phonenumber="";
					 this.password="";
					 return;
				 }
				 console.log("city=="+data.data['city']);
				 console.log("phone=="+data.data['phone']);
				 console.log("token=="+data.data['token']);
				 uni.setStorageSync("phone",data.data['phone']);
				 uni.setStorageSync("city",data.data['city']);
				 uni.setStorageSync("token",data.data['token']);
				 this.gotoRechange();
				 //this.$destroy();
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
			gotoRechange:function(){
				uni.switchTab({
					url:"/pages/rechange/rechange"
				})
			},
			gotoForgetPwd:function(){
				uni.navigateTo({
					url:"/pages/myRechange/forgetPassword/forgetPassword"
				})
			},
			gotoRegister:function(){
				uni.navigateTo({
					url:"/pages/myRechange/userRegister/userRegister"
				})
			}
		}
	}
</script>

<style>
.head{
		margin:15upx 10upx;
		padding: 0 20upx;
		/* background-color: #ebebeb; */
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 30upx;
	}
.head_right{
	right: 15upx;
	margin-right:15upx;
	font-size: 30upx;
}
.btn_commit{
	background: #09BB07;
	width:100%;
	height:100upx;
}
.uni-input{
	right: 15upx;
	margin-right:15upx;
	width:70%;
}
</style>

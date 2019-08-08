<template>
	<view>
		<!--老密码-->
		<view class="uni-flex uni-row " style="justify-content: space-between;">
			<view class="head">老密码</view>
			<input class="head head_right" @input="onKeyInput"  type="text" maxlength="20" password="true"></input>
		</view>
		<!--新密码-->
		<view class="uni-flex uni-row " style="justify-content: space-between;">
			<view class="head">新密码</view>
			<input class="head head_right" @input="newPwdInput" placeholder="请输入6-20数字或字母组合" type="text" maxlength="20" password="true"></input>
		</view>
		<!--确定按钮-->
		<view>
			<button class="btn_commit"  @click="btnCommit">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'修改密码',
				oldPwd:'',
				newPwd:''
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.oldPwd = event.target.value
			},
			newPwdInput:function(event){
				this.newPwd = event.target.value
			},
			btnCommit:function(e){
				//判断老密码是否正确
				// var oldPassword=uni.getStorageSync("password");
				// if(this.inputValue==oldPassword){
				// 	console.log("存储新密码password..."+this.password);
				// 	uni.setStorageSync("password",this.password);
				// }else{
				// 	uni.showModal({
				// 		title:"老密码输入错误"
				// 	})
				// }
				this.phonenumber = uni.getStorageSync("phone");
				this.token = uni.getStorageSync("token");
				console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
				uni.request({
					url: 'http://192.168.1.111:8000/api/user/change_password/',
					dataType: 'text',
					header: {
						'Authorization': this.token //把token提交到请求头
					},
					data: {
						//noncestr: Date.now()
						phone: this.phonenumber,
						oldpwd:this.oldPwd,
						newpwd:this.newPwd
					},
					method: 'POST',
				}).then(res => {
					console.log('request success', res[1]);
					uni.showToast({
						title: '修改密码成功',
						icon: 'success',
						mask: true,
						duration: 2000
					});
					this.loading = false;
					//清空Phone和token,
					uni.clearStorageSync();
					// uni.setStorageSync("phone",'');
					// uni.setStorageSync("token",'');
					//跳转到登录界面
					uni.navigateTo({
						url:'../userLogin/userLogin'
					});
				}).catch(err => {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
					this.loading = false;
				});
			}	
		},
		onLoad() {
			// this.password=uni.getStorageSync("password");
			// console.log("onLoad password=="+this.password);
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
		width:70%;
		right: 15upx;
		margin-right:15upx;
		font-size: 30upx;
	}
	.btn_commit{
		margin-top: 30upx;
		background: #09BB07;
		width:90%;
		height:100upx;
	}
</style>

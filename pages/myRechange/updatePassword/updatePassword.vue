<template>
	<view>
		<!--老密码-->
		<view class="uni-flex uni-row " style="justify-content: space-between;">
			<view class="head">老密码</view>
			<input class="head head_right" type="text" maxlength="20" password="true"></input>
		</view>
		<!--新密码-->
		<view class="uni-flex uni-row " style="justify-content: space-between;">
			<view class="head">新密码</view>
			<input class="head head_right" placeholder="请输入6-20数字或字母组合" type="text" maxlength="20" password="true"></input>
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
				password:''
			}
		},
		methods: {
			btnCommit:function(e){
				console.log("存储新密码password..."+this.password);
				uni.setStorageSync("password",this.password);
			}
		},
		onLoad() {
			this.password=uni.getStorageSync("password");
			console.log("onLoad password=="+this.password);
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

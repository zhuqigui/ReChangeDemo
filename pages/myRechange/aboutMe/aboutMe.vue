<template>
	<view>
		<view class="text" style="flex-direction: column;flex: 1;height: 400upx;display: flex; justify-content: center;align-items: center;">
			<image src="../../../static/logo.png" style="width: 200upx;height: 200upx;"></image>
			<text style="font-size: 40upx;">小绿人充电v1.1.0</text>
		</view>
		<view class="uni-list">
			<!--使用说明-->
			<view class="uni-flex uni-row " style="justify-content: space-between;" @click="gotoUseNote">
				<view class="head">使用说明</view>
				<view class="head head_right">></view>
			</view>
			<!--客服-->
			<view class="uni-flex uni-row" style="justify-content: space-between;">
				<view class="head">客服</view>
				<view class="head head_right">
					<text style="color: #007AFF;" @click="callCampany">0755-2222696998</text>
				</view>
			</view>
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
			callCampany:function(){
				console.log("callCampany phone number....");
				uni.makePhoneCall({
					phoneNumber:'2222696998'
				})
			},
			gotoUseNote:function(){
				uni.navigateTo({
					url:'/pages/myRechange/userDocs/userDocs',
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
</style>

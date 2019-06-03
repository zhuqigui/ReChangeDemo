<template>
	<view>
		<!--头像及登录的账号-->
		<view class="uni-flex uni-row uni-list-cell head" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoUserinfo">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="head-image" src="../../static/logo.png" style="border-radius: 50%;"></image>
				<text class="head-phone-number">15889426542</text>
			</view>
			<view>></view>
		</view>
		<!--我的钱包-->
		<view class="uni-flex uni-row uni-list-cell body-moneybox" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/logo.png"></image>
				<text class="body-moneybox-title">我的钱包</text>
			</view>
			<view>></view>
		</view>
		<!--优惠券-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/logo.png"></image>
				<text class="body-moneybox-title">优惠券</text>
			</view>
			<view>></view>
		</view>
		<!--设置-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoSettings">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/logo.png"></image>
				<text class="body-moneybox-title">设置</text>
			</view>
			<view>></view>
		</view>
		<!--意见反馈-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/logo.png"></image>
				<text class="body-moneybox-title">意见反馈</text>
			</view>
			<view>></view>
		</view>
		<!--关于小绿人-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/logo.png"></image>
				<text class="body-moneybox-title">关于小绿人</text>
			</view>
			<view>></view>
		</view>
		<!--附近站点-->
		<view class="uni-flex uni-row uni-list-cell body-moneybox" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/logo.png"></image>
				<text class="body-moneybox-title">附近站点</text>
			</view>
			<view>></view>
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
			gotoUserinfo:function(){
				uni.navigateTo({
					url:"/pages/userinfo/userinfo?phonenumber=12345678987&cityname=深圳"
				})
			},
			gotoSettings:function(){
				uni.navigateTo({
					url:"/pages/myRechange/settings/settings"
				})
			},
			
		},
		onHide() {
			console.log("onHide setNavigationBarTitle to null...");
			uni.setNavigationBarTitle({
				title:''
			})
		}
	}
</script>

<style>
	.head{
		width:100%;
		heigth:150upx;
		text-align: center;
	}
	.head-image{
		width:150upx;
		height:150upx;
	}
	.head-phone-number{
		font-size: 40upx;
		margin-bottom:30upx;
/* 		margin-left: -50upx; */
	}
	.body-moneybox{
		width:100%;
		heigth:150upx;
		margin-bottom: 50upx;
		margin-top: 50upx;
	}
	.body-moneybox-image{
		width: 100upx;
		height: 100upx;
	}
	.body-cell{
		width: 100%;
		height: 100upx;
	}
</style>

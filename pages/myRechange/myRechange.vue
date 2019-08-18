<template>
	<view>
		<!--头像及登录的账号-->
		<view class="uni-flex uni-row uni-list-cell head" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoUserinfo">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="head-image" src="../../static/my.jpg" style="border-radius: 50%;"></image>
				<text class="head-phone-number">{{phone}}</text>
			</view>
			<view>></view>
		</view>
		<!--我的钱包-->
		<view class="uni-flex uni-row uni-list-cell body-moneybox" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoMyMoneyBox">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/mymoneybox.png"></image>
				<text class="body-moneybox-title">我的钱包</text>
			</view>
			<view>></view>
		</view>
		<!--优惠券-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoDiscountCoupon">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/discount_ponun.png"></image>
				<text class="body-moneybox-title">优惠券</text>
			</view>
			<view>></view>
		</view>
		<!--设置-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoSettings">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/settings.png"></image>
				<text class="body-moneybox-title">设置</text>
			</view>
			<view>></view>
		</view>
		<!--意见反馈-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoFeedback">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/my-advice.png"></image>
				<text class="body-moneybox-title">意见反馈</text>
			</view>
			<view>></view>
		</view>
		<!--关于小绿人-->
		<view class="uni-flex uni-row uni-list-cell body-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoAboutMe">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/about.png"></image>
				<text class="body-moneybox-title">关于小绿人</text>
			</view>
			<view>></view>
		</view>
		<!--附近站点-->
		<view class="uni-flex uni-row uni-list-cell body-moneybox" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoNearSite">
			<view style="text-align: center;" class="uni-flex uni-row uni-list-cell">
				<image class="body-moneybox-image" src="../../static/navi.png"></image>
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
				username:'',
				phone:''
			}
		},
		methods: {
			gotoUserinfo:function(){
				uni.navigateTo({
					url:"/pages/myRechange/userinfo/userinfo?phonenumber=12345678987&cityname=深圳"
				})
			},
			gotoSettings:function(){
				uni.navigateTo({
					url:"/pages/myRechange/settings/settings"
				})
			},
			gotoMyMoneyBox:function(){
				uni.navigateTo({
					url:"/pages/myRechange/myMoneyBox/myMoneyBox"
				})
			},
			gotoDiscountCoupon:function(){
				uni.navigateTo({
					url:"/pages/myRechange/discountCoupon/discountCoupon"
				})
			},
			gotoFeedback:function(){
				uni.navigateTo({
					url:"/pages/myRechange/feedback/feedback"
				})
			},
			gotoAboutMe:function(){
				uni.navigateTo({
					url:"/pages/myRechange/aboutMe/aboutMe"
				})
			},
			gotoNearSite:function(){
				uni.navigateTo({
					url:"/pages/myRechange/nearSite/nearSite"
				})
			}
		},
		onHide() {
			console.log("onHide setNavigationBarTitle to null...");
			uni.setNavigationBarTitle({
				title:''
			})
		},
		onLoad() {
			//this.username=uni.getStorageSync("username");
			this.phone=uni.getStorageSync("phone");
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
		margin-left: 20upx;
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

<template>
	<view>
		<!--手机号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">手机</view>
			<view class="head head_right">{{phonenumber}}</view>
		</view>
		<!--城市-->
		<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoCityList">
			<view class="head">城市</view>
			<view class="head head_right">{{cityname}}></view>
		</view>
		<!--退出登录按钮-->
		<view>
			<button class="btn_commit"  @click="btnCommit">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '个人信息',
				phonenumber:'',
				cityname:''
			}
		},
		methods: {
			gotoCityList(){
				uni.navigateTo({
					url:"/pages/myRechange/userinfoSwitchCity/userinfoSwitchCity?cityname="+this.cityname
				})
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:this.title
			})
			if(e.phonenumber || e.cityname){
				this.phonenumber = e.phonenumber;
				this.cityname=e.cityname;
				console.log("onLoad this.phonenumber=="+this.phonenumber+",,this.cityname=="+this.cityname);
			}
		}
		
	}
</script>

<style>
view {
		font-size: 28upx;
		line-height: inherit;
}
.btn_commit{
	margin-top: 30upx;
	background: #09BB07;
	width:90%;
	height:100upx;
}
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

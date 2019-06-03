<template>
	<view class="uni-list">
		<!--修改密码-->
		<view class="uni-flex uni-row " style="justify-content: space-between;" @click="gotoUpdatePassword">
			<view class="head">修改密码</view>
			<view class="head head_right">></view>
		</view>
		<!--充电结束提醒-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">充电结束提醒</view>
			<view class="head head_right">
				<switch v-bind:checked="changeOverisOpen" @change="switchChange" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'设置',
				changeOverisOpen:false
			}
		},
		methods: {
			switchChange: function (e) {
				console.log('充电结束提醒开关状态为：', e.target.value);
				var isOpen=e.target.value;
				uni.setStorageSync("changeOverSwitch",isOpen);
				console.log('存入数据：',uni.getStorageSync("changeOverSwitch"));
			},
			gotoUpdatePassword:function(){
				uni.navigateTo({
					url:"/pages/myRechange/updatePassword/updatePassword"
				})
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:"设置"
			})
			this.changeOverisOpen=uni.getStorageSync("changeOverSwitch");
			console.log("onLoad this.changeOverisOpen=="+this.changeOverisOpen);
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

<template>
	<view>
		<!--我的余额-->
		<!-- <view class="uni-flex uni-row head" style="justify-content: space-between;">
			<view class="head-left">我的余额</view>
			<view class="head-middle">0</view>
			<view class="head_right">
				<a href="">钱包明细</a>
			</view>
		</view> -->
		<view class="uni-flex uni-row" style="background-color: #0A98D5;">
			<view class="text" style="flex: 1;height: 400upx;display: flex; justify-content: center;align-items: flex-start;">
				<text>我的余额:</text>
			</view>
			<view class="text" style="flex: 1;height: 400upx;display: flex; justify-content: center;align-items: center;">
				<text style="font-size: 150upx;">{{totalMoney}}</text>
			</view>
			<view class="text" style="flex: 1;height: 400upx;display: flex; justify-content: center;align-items: flex-end;">
				<text>钱包明细</text>
			</view>
		</view>
		<!--微信充值按钮-->
		<view>
			<button class="btn_commit" @click="btnCommit">微信充值</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonenumber: '',
				token: '',
				totalMoney: 0
			}
		},
		methods: {

		},
		onLoad() {
			this.phonenumber = uni.getStorageSync("phone");
			this.token = uni.getStorageSync("token");
			console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
			uni.request({
				url: 'http://39.106.217.14:8000/api/user/wallet/',
				dataType: 'text',
				header: {
					'Authorization': this.token //把token提交到请求头
				},
				data: {
					//noncestr: Date.now()
					phone: this.phonenumber,
					//token: this.token
				},
				method: 'GET',
			}).then(res => {
				console.log('request success', res[1]);
				uni.showToast({
					title: '获取成功',
					icon: 'success',
					mask: true,
					duration: 2000
				});
				//this.res =JSON.stringify(res[1]);
				this.loading = false;
				var data = JSON.parse(res[1].data)
				this.totalMoney=data.data['money'];
				console.log("totalMoney==" + data.data['money']);
			}).catch(err => {
				console.log('request fail', err);
				uni.showModal({
					content: err.errMsg,
					showCancel: false
				});
				this.loading = false;
			});
		}
	}
</script>

<style>
	.head {
		width: 100%;
		height: 300upx;
		background: #008000;
	}

	.head-left {
		margin: 15upx 10upx;
		padding: 0 20upx;
		/* background-color: #ebebeb; */
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 30upx;
	}

	.head-middle {
		width: 100%;
		height: 200upx;
		right: 15upx;
		margin-right: 15upx;
		font-size: 100upx;
	}

	.head_right {
		right: 15upx;
		margin-right: 15upx;
		font-size: 30upx;
	}

	.btn_commit {
		margin-top: 30upx;
		background: #09BB07;
		width: 90%;
		height: 100upx;
	}
</style>

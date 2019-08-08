<template>
	<view>
		<!-- <view>
			<image src="../../static/c1.png"></image>
			<text>近无充电记录</text>
		</view> -->
		<view class="text" style="flex-direction: column;flex: 1;height: 400upx;display: flex; justify-content: center;align-items: center;">
			<image src="../../static/logo.png" style="width: 200upx;height: 200upx;"></image>
			<text style="font-size: 40upx;">近无充电记录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonenumber: '',
				token: '',
			}
		},
		methods: {
			
		},
		onLoad() {
			this.phonenumber = uni.getStorageSync("phone");
			this.token = uni.getStorageSync("token");
			console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
			uni.request({
				url: 'http://192.168.1.111:8000/api/chargerecord/',
				dataType: 'text',
				header: {
					'Authorization': this.token //把token提交到请求头
				},
				data: {
					//noncestr: Date.now()
					phone: this.phonenumber,
					// oldPwd:this.oldPwd,
					// newPwd:this.newPwd
				},
				method: 'GET',
			}).then(res => {
				console.log('request success', res[1]);
				uni.showToast({
					title: '获取充电订单记录成功',
					icon: 'success',
					mask: true,
					duration: 2000
				});
				//this.res =JSON.stringify(res[1]);
				this.loading = false;
				var data = JSON.parse(res[1].data)
				// this.totalMoney=data.data['money'];
				// console.log("totalMoney==" + data.data['money']);
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

</style>

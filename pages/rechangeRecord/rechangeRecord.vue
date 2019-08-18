<template>
	<view>
		<view v-if="changeRecordList.length>0">
			<uni-list v-for="(item, index) in changeRecordList" :key="index" class="change_record_list_class">
				<uni-list-item title="" note="" class="change_record_list_item_class">{{item.id}}</uni-list-item>
				<uni-list-item title="" note="" class="change_record_list_item_class">{{item.batteryType}}</uni-list-item>
				<uni-list-item title="" note="" class="change_record_list_item_class">{{item.price}}</uni-list-item>
			</uni-list>
		</view>
		<view v-if="changeRecordList.length===0">
			<view class="text" style="flex-direction: column;flex: 1;height: 400upx;display: flex; justify-content: center;align-items: center;">
				<image src="../../static/logo.png" style="width: 200upx;height: 200upx;"></image>
				<text style="font-size: 40upx;">近无充电记录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//changeRecordList:[{id:1,batteryType:"haha",price:2.3},{id:1,batteryType:"haha",price:2.3},{id:1,batteryType:"haha",price:2.3}],//充电记录列表id,batteryType,price
				changeRecordList:[],
				phonenumber: '',
				token: '',
			}
		},
		methods: {
			
		},
		onLoad() {
			
		},
		onShow() {
			this.changeRecordList=uni.getStorageSync("changeRecordList");
			console.log("onShow init this.changeRecordList.length..."+this.changeRecordList.length);
			for (var i = 0; i < this.changeRecordList.length; i++) {
				console.log("this.changeRecordList[i].id=="+this.changeRecordList[i].id);
				console.log("this.changeRecordList[i].batteryType=="+this.changeRecordList[i].batteryType);
				console.log("this.changeRecordList[i].price=="+this.changeRecordList[i].price);
			}
			this.phonenumber = uni.getStorageSync("phone");
			this.token = uni.getStorageSync("token");
			console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
			uni.request({
				url: 'http://39.106.217.14:8000/api/chargerecord/',
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
.change_record_list_class{
	display: flex;
	flex-direction:row;
	flex-wrap: nowrap;
	align-items: center;
	margin-bottom: 15upx;
	width: 100%;
	height:100%;
	box-sizing: border-box;
	text-align: center;
	font-size: 32upx;
}
.change_record_list_item_class  {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 50upx;
		width: 33%;
		margin-left: 30upx;
		text-align: justify;
		type:primary;
		plain:false;
		class:mini-btn;
		box-sizing: border-box;
		font-size: 36upx;
	}
</style>

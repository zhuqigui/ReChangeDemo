<template>
	<view>
		<!--当前登录号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<!-- <input class="uni-input" type="number" placeholder="请输入手机号" @focus="onFocus" @blur="onBlur" /> -->
			<view>{{phone}}</view>
			<view>当前登录号码</view>
		</view>
		<!--充值金额-->
		<view>
			<view class="bottom_warning">充值金额</view>
			<view class="bottom-content-box">
				<button class="mini-btn" v-bind:type="isFivePrimary?'primary':'default'" plain="true" v-on:click="selectFiveYuan">5元</button>
				<button class="mini-btn" v-bind:type="isTwentyPrimary?'primary':'default'" v-on:click="selectTwentyYuan"  plain="true">20元</button>
				<button class="mini-btn" v-bind:type="isFiftyPrimary?'primary':'default'" v-on:click="selectFiftyYuan()" plain="true">50元</button>
			</view>
			<view class="bottom-content-box">
				<button class="mini-btn" v-bind:type="isOneHundredPrimary?'primary':'default'" v-on:click="selectOneHundredYuan()" plain="true">100元</button>
				<button class="mini-btn" v-bind:type="isTwoHundredPrimary?'primary':'default'" v-on:click="selectTwoHundredYuan()" plain="true">200元</button>
				<!--style="font-size: 28upx;" class="uni-input"-->
				<button class="mini-btn" v-bind:type="isOtherPrimary?'primary':'default'" plain="true">
					<input style="height: 120upx;font-size: 36upx;" type="number" @input="selectOtherMoney" placeholder="其他金额" />
				</button>
			</view>
		</view>
		<!--微信充值按钮-->
		<view>
			<button class="btn_commit" @click="btnCommit">微信充值</button>
			<text class="bottom_warning">暂不支持余额取现，请合理设置充值额度</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCurrentNumber: true,
				isFivePrimary:false,
				isTwentyPrimary:false,
				isFiftyPrimary:false,
				isOneHundredPrimary:false,
				isTwoHundredPrimary:false,
				isOtherPrimary:false,
				pushMoney:0,
				phonenumber: '',
				token: '',
			}
		},
		methods: {
			onFocus() {
				this.showCurrentNumber=false;
				// this.$mp.page.$getAppWebview().setStyle({
				// 	softinputNavBar: 'none'
				// })
			},
			onBlur() {
				this.showCurrentNumber=true;
				// this.$mp.page.$getAppWebview().setStyle({
				// 	softinputNavBar: 'auto'
				// })
			},
			selectFiveYuan:function(){
				this.pushMoney=5;
				//动态设置点击的按钮的类型变为primary
				//this.$emit().
				if(this.isFivePrimary){
					this.isFivePrimary=false;
				}else{
					this.isFivePrimary=true;
					//设置其他按钮为未选中状态
					this.isTwentyPrimary=false,
					this.isFiftyPrimary=false,
					this.isOneHundredPrimary=false,
					this.isTwoHundredPrimary=false,
					this.isOtherPrimary=false
				}
			},
			selectTwentyYuan:function(){
				this.pushMoney=20;
				//动态设置点击的按钮的类型变为primary
				//this.$emit().
				if(this.isTwentyPrimary){
					this.isTwentyPrimary=false;
				}else{
					this.isTwentyPrimary=true;
					//设置其他按钮为未选中状态
					this.isFivePrimary=false;
					this.isFiftyPrimary=false,
					this.isOneHundredPrimary=false,
					this.isTwoHundredPrimary=false,
					this.isOtherPrimary=false
				}
			},
			selectFiftyYuan:function(){
				this.pushMoney=50;
				//动态设置点击的按钮的类型变为primary
				//this.$emit().
				if(this.isFiftyPrimary){
					this.isFiftyPrimary=false;
				}else{
					this.isFiftyPrimary=true;
					//设置其他按钮为未选中状态
					this.isFivePrimary=false;
					this.isTwentyPrimary=false,
					this.isOneHundredPrimary=false,
					this.isTwoHundredPrimary=false,
					this.isOtherPrimary=false
				}
			},
			selectOneHundredYuan:function(){
				this.pushMoney=100;
				//动态设置点击的按钮的类型变为primary
				//this.$emit().
				if(this.isOneHundredPrimary){
					this.isOneHundredPrimary=false;
				}else{
					this.isOneHundredPrimary=true;
					//设置其他按钮为未选中状态
					this.isFivePrimary=false;
					this.isTwentyPrimary=false,
					this.isFiftyPrimary=false,
					this.isTwoHundredPrimary=false,
					this.isOtherPrimary=false
				}
			},
			selectTwoHundredYuan:function(){
				this.pushMoney=200;
				//动态设置点击的按钮的类型变为primary
				//this.$emit().
				if(this.isTwoHundredPrimary){
					this.isTwoHundredPrimary=false;
				}else{
					this.isTwoHundredPrimary=true;
					//设置其他按钮为未选中状态
					this.isFivePrimary=false;
					this.isTwentyPrimary=false;
					this.isFiftyPrimary=false,
					this.isOneHundredPrimary=false,
					this.isOtherPrimary=false
				}
			},
			selectOtherMoney:function(event){
				this.pushMoney= event.target.value;
				console.log("selectOtherMoney this.pushMoney=="+this.pushMoney);
				//动态设置点击的按钮的类型变为primary
				//this.$emit().
				if(this.isOtherPrimary){
					this.isOtherPrimary=false;
				}else{
					this.isOtherPrimary=true;
					//设置其他按钮为未选中状态
					this.isFivePrimary=false;
					this.isTwentyPrimary=false;
					this.isFiftyPrimary=false,
					this.isOneHundredPrimary=false,
					this.isTwoHundredPrimary=false
				}
			},
			btnCommit:function(){
				//先不调用微信充值（需要企业客户），只是更新模拟数据
				// uni.requestPayment({
				// 	provider: '',
				// 	orderInfo: '',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				this.phonenumber = uni.getStorageSync("phone");
				this.token = uni.getStorageSync("token");
				//console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
				uni.request({
					url: 'http://39.106.217.14:8000/api/quickcharge/pushmoney/',
					dataType: 'text',
					header: {
						'Authorization': this.token //把token提交到请求头
					},
					data: {
						//noncestr: Date.now()
						phone: this.phonenumber,
						money:this.pushMoney
					},
					method: 'POST',
				}).then(res => {
					console.log('request success', res[1]);
					uni.showToast({
						title: '充值成功',
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
				this.pushMoney='';//充值完成后清空充值金额
			}
			
		},
		onLoad() {
			this.phone=uni.getStorageSync("phone");
		}
	}
</script>

<style>
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #fff;
			margin:15upx 15upx;
			padding: 0 20upx;
		}
	.bottom-content-box {
			display: flex;
			flex-direction:row;
			align-items: center;
			margin-bottom: 35upx;
			margin-top: 35upx;
	/* 		margin-right: 15upx; */
			width: 100%;
			height:100upx;
			box-sizing: border-box;
		}
		/* font-size: 14upx; margin-left: 10upx;*/
		.mini-btn {
			width:30%;
			margin-right: 15upx;
		}
		.primary{
			
		}
		.btn_commit{
			margin-top: 30upx;
			background: #09BB07;
			width:100%;
			height:100upx;
		}
		.bottom_warning{
			margin-top: 30upx;
			font-size: 26upx;
		}
</style>

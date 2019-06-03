<template>
	<view>
		<!--当前登录号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<input class="uni-input" type="number" placeholder="请输入手机号" @focus="onFocus" @blur="onBlur" />
			<view v-if="showCurrentNumber">当前登录号码</view>
		</view>
		<!--充值金额-->
		<view>
			<view class="bottom_warning">充值金额</view>
			<view class="bottom-content-box">
				<button class="mini-btn" type="primary" plain="true">5元</button>
				<button class="mini-btn" type="primary" plain="true">20元</button>
				<button class="mini-btn" type="primary" plain="true">50元</button>
			</view>
			<view class="bottom-content-box">
				<button class="mini-btn" type="primary" plain="true">100元</button>
				<button class="mini-btn" type="primary" plain="true">200元</button>
				<!--style="font-size: 28upx;" class="uni-input"-->
				<button class="mini-btn" type="primary" plain="true">
					<input style="height: 120upx;font-size: 36upx;" type="number" placeholder="其他金额" />
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
				showCurrentNumber: true
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
			}
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

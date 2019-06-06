<template>
	<view>
		<view class="text" style="flex-direction: column;flex: 1;height: 400upx;display: flex; justify-content: center;align-items: center; background-color: #576B95;">
			<image src="../../../static/logo.png" style="width: 100upx;height: 100upx;"></image>
			<text style="font-size: 40upx;">暂无可用优惠券，下拉刷新</text>
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
			 onPullDownRefresh() {
			    console.log('refresh');
			    setTimeout(function () {
			        uni.stopPullDownRefresh();
			    }, 1000);
			}
		},
		onLoad: function (options) {
			setTimeout(function () {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
   
	}
</script>

<style>

</style>

<template>
	<view>
		<view>
			<!--最上面设备编号+切换扫码按钮-->
			<view class="uni-flex uni-row" style="justify-content: space-between;">
				<view class="head">设备编号</view>
				<view class="head head_right" @click="qrcode">切换扫码</view>
			</view>
			<!--显示编号-->
			<view>
				<text style="background-color: red;">扫码结果{{result}}</text>
			</view>
			<!--6个充电口状态-->
			<view class="page">
				<view class="example">
					<uni-grid :options="data3" :show-out-border="false" />
				</view>
			</view>
			<!--电池类型-->
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="goDetailPage(list.url)">
						电池类型
					</view>
				</view>
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="goDetailPage(list.url)">
						收费标准
					</view>
				</view>
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="goDetailPage(list.url)">
						充电时长
					</view>
				</view>
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="goDetailPage(list.url)">
						账户余额
					</view>
				</view>
			</view>
			<view>
				<button class="btn_commit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				swiperGridHeight: '0px',
				swiperGridWidth: '100%',
				title: 'rechange',
				result: '',
				data3: [{
						image: '/static/c1.png',
						text: '空闲'
					},
					{
						image: '/static/c2.png',
						text: '空闲'
					},
					{
						image: '/static/c3.png',
						text: '空闲'
					},
					{
						image: '/static/c4.png',
						text: '空闲'
					},
					{
						image: '/static/c5.png',
						text: '空闲'
					},
					{
						image: '/static/c6.png',
						text: '空闲'
					}
				]
			}
		},
		methods: {
			qrcode:function(){
				console.log("uni.scanCode....");
				uni.scanCode({
					success: (res) => {
						this.result = res.result
					}
				});
			}
		}
	}
</script>

<style>
page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}
view {
		font-size: 28upx;
		line-height: inherit
}
.example {
		padding: 0 30upx 30upx
	}
.btn_commit{
	background: #09BB07;
	width:100%;
	height:100upx;
}
.head{
		margin:15upx 10upx;
		padding: 0 20upx;
		/* background-color: #ebebeb; */
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #007AFF;
		font-size: 26upx;
	}
.head_right{
	color: #007AFF;
}
</style>

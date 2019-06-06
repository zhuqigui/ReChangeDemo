<template>
	<view>
		<view class="uni-flex uni-row" style="background: #008000; width:100%;height:100upx;font-size: 30upx;">
			<view class="flex-item" style="color: #F5F5F5;">小绿人充电v1.1.0</view>
		</view>
		<view v-for="(item,index) in docslist" :key="index">
			<view style="font-size: 36upx; margin-bottom: 30upx; margin-top: 30upx;">{{item.listtitle}}</view>
			<view>
				{{item.listmessage}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const docslist=[
				{
					listtitle:'1.用户手册',
					listmessage:"请使用手机号码进行用户注册，便于后续充值等操作进行身份识别，小绿人承诺不泄露用户数据"
				},
				{
					listtitle:'2.账户充值',
					listmessage:"用户注册后，小绿人App自动给您开设了内部储值账户便于支付充电相关费用，可通过微信支付向该账户充值，当前不支持储值账户中的余额提现，请合理设置充值金额，如确实需要提现、退款的，将扣除总提现、退款金额3%手续费。"
				},
				{
					listtitle:'3.充电流程',
					listmessage:"选择和您电池型号相同的空闲充电器(或已充满的)和电动车连接，微信扫面设备上的二维码，进入充电页面，点击已连接的充电器，提交后开始充电，充完拔掉充电器即可离开，系统自动计费。"
				},
				{
					listtitle:'4.公众号',
					listmessage:"关注'小绿人'公众号，可以随时查询充电状态、账户余额等信息"
				},
				{
					listtitle:'5.收费标准',
					listmessage:"请在充电页面输入充电柜编号后，查看相应资费，开始充电后系统会预扣一定金额，结束是根据实际费用多退少补。"
				}
			];
			return {
				docslist:docslist
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:"使用说明"
			})
		}
	}
</script>

<style>
.flex-item {
		width: 28%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
	}
</style>

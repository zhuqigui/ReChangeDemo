<template>
	<view>
		<view>
			<!--最上面设备编号+切换扫码按钮-->
			<view class="uni-flex uni-row" style="justify-content: space-between;">
				<view class="head">设备编号</view>
				<view class="head head_right" @click="qrcode" style="color: #007AFF;">切换扫码</view>
			</view>
			<!--显示编号-->
			<view>
				<text class="scan_result">扫  码  结  果{{result}}</text>
			</view>
			<!--6个充电口状态-->
			<view class="page">
				<view class="example">
					<uni-grid :options="data3" :show-out-border="false" />
				</view>
			</view>
			<!--电池类型-->
			<view class="uni-list">
				<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
					<view class="head">电池类型</view>
					<view class="head head_right">></view>
				</view>
				<view class="uni-flex uni-row uni-list-cell " style="justify-content: space-between;" hover-class="uni-list-cell-hover">
					<view class="head">收费标准</view>
					<view class="head head_right">-/-</view>
				</view>
				<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-time')">
					<view class="head">充电时长</view>
					<view class="head head_right">{{charge_time_value}}</view>
				</view>
				<view class="uni-flex uni-row" style="justify-content: space-between;">
					<view class="head">账户余额</view>
					<view class="head head_right">￥0</view>
				</view>
			</view>
			<view>
				<button class="btn_commit" :style="{background:showSelected ? 'green' : 'red'}" @click="btnCommit">提交</button>
			</view>
		</view>
		<uni-popup :show="popupType === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
			<view class="bottom-title">请选择电池类型</view>
			<!--弹出来的电池类型提示-->
			<view class="uni-flex uni-row" style="justify-content: space-between;">
				<view class="head">请选择与电池型号一致的充电器，以及损伤电池</view>
				<view class="head head_right" @click="moreType">更多类型</view>
			</view>
			<view class="bottom-content">
				<view v-for="(item, index) in bottomData" :key="index" class="bottom-content-box">
					<!-- <view :class="item.name" class="bottom-content-image">
						<text class="icon">{{ item.icon }}</text>
					</view>
					* v-if="this.selectBatteryType=='selected' : background"
					<view class="bottom-content-text">{{ item.text }}</view> -->
					<button class="primary" @click="selectBattery('selected')">{{ item.text }}</button>
				</view>
			</view>
			<view class="bottom-btn" @click="togglePopup('')">如何识别电池类型</view>
		</uni-popup>
		<uni-popup :show="popupType === 'bottom-time'" position="bottom" @hidePopup="hidechangeTimePopup" >
			<view class="uni-flex uni-row" style="max-height: 60upx;">
				<view class="uni-flex uni-column" style="flex: 1;">
					<text style="flex: 1;display: flex; justify-content: center;align-items: center;font-size: 30upx;">请指定充电时长</text>
					<text style="flex: 1;display: flex; justify-content: center;align-items: center;font-size: 30upx;">(0时0分表示充满即止不限时)</text>
				</view>
				<text @click="togglePopup('')" class="charge_time_confirm" >确定</text>
			</view>
			<picker-view  :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
				</picker-view-column>
				<view class="charge_time_hour">时</view>
				<picker-view-column>
					<view class="item" v-for="(minute,index) in minutes" :key="index">{{minute}}</view>
				</picker-view-column>
				<view class="charge_time_hour">分</view>
			</picker-view>
		</uni-popup>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniGrid,
			uniPopup
		},
		data() {
			const hours=[]
			const hour=0
			const mintue=0
			const minutes=[]
			//const charge_time_value='>'
			// for (let i = 1990; i <= date.getFullYear(); i++) {
			//     years.push(i)
			// }
			
			for (let i = 0; i <= 6; i++) {
			    hours.push(i)
			}
			
			// for (let i = 1; i <= 31; i++) {
			//     minutes.push(i)
			// }
			return {
				swiperGridHeight: '0px',
				swiperGridWidth: '100%',
				title: 'rechange',
				result: '',
				username:'',
				hidechangeTimePopup:false,//隐藏充电时长弹出菜单
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
				],
				popupType: '',
				selectBatteryType:'',
				showSelected:false,
				bottomData: [{
						text: '铅酸36V',
						// icon: '\ue6a4',
						// name: 'wx'
					},
					{
						text: '铅酸48V',
						// icon: '\ue646',
						// name: 'wx'
					},
					{
						text: '铅酸60V',
						// icon: '\ue66b',
						// name: 'qq'
					},
					{
						text: '铅酸72V',
						// icon: '\ue600',
						// name: 'sina'
					},
					{
						text: '锂电36V',
						// icon: '\ue632',
						// name: 'copy'
					},
					{
						text: '锂电48V',
						// icon: '\ue618',
						// name: 'more'
					},
					{
						text: '锂电60V',
						// icon: '\ue618',
						// name: 'more'
					},
					{
						text: '锂电72V',
						// icon: '\ue618',
						// name: 'more'
					}
				],
				// years,
				// year,
				// months,
				// month,
				// days,
				// day,
				// value: [9999, month - 1, day - 1],
				
				hours,
				hour,
				minutes:[0,30],
				mintue,
				value: [hour,mintue],
				charge_time_value:'>',
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: false,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
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
			},
			btnCommit:function(){
				console.log("btnCommit....");
				this.showSelected=true;
			},
			selectItem:function(){
				let tabBarOptions = {
					index: 1,
					background:green
					// text: '接口',
					// iconPath: '/static/api.png',
					// selectedIconPath: '/static/apiHL.png'
				}
				if (this.hasCustomedItem) {
					uni.setTabBarItem(tabBarOptions)
				} else {
					tabBarOptions.text = 'API'
					uni.setTabBarItem(tabBarOptions)
				}
				this.hasCustomedItem = !this.hasCustomedItem
			},
			togglePopup:function(type){
				console.log("togglePopup type.."+type);
				if(type==''){
					
				}
				this.popupType = type;
				if(this.popupType==="bottom-share"){
					
				}else if(this.popupType==="bottom-time"){
					console.log("popupType==bottom-time");
					if(this.hour==0 && this.mintue==0){
						this.charge_time_value="充满即止不限时";
					}else{
						this.charge_time_value=this.hour+'时'+this.mintue+'分>';
					}
					console.log("this.charge_time_value=="+this.charge_time_value);
					//隐藏弹出框
					//this.togglePopup('');
				}
			},
			confirmRechangeTime:function(){
				this.hidechangeTimePopup=true;
			},
			selectBattery:function(type){
				this.selectBatteryType=type
			},
			toggleTime:function(){
				this.visible=true;
				console.log("this.visible==="+this.visible);
			},
			bindChange (e) {
			    const val = e.detail.value
			    this.hour = this.hours[val[0]]
			    this.mintue = this.minutes[val[1]]
				console.log("this.hour=="+this.hour+",this.mintue=="+this.mintue);
				if(this.hour==0 && this.mintue==0){
					this.charge_time_value="充满即止不限时";
				}else{
					this.charge_time_value=this.hour+'时'+this.mintue+'分>';
				}
				console.log("this.charge_time_value=="+this.charge_time_value);
			    // this.day = this.days[val[2]]
			},
			oauth() {//value
			    uni.login({
			        provider: 'weixin',//value'',
			        success: (res) => {
			            uni.getUserInfo({
			                provider: 'weixin',//value,
			                success: (infoRes) => {
			                    /**
			                     * 实际开发中，获取用户信息后，需要将信息上报至服务端。
			                     * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
			                     */
			                    this.toMain(infoRes.userInfo.nickName);
								//this.username=infoRes.userInfo.nickName;
								uni.setStorageSync("username",infoRes.userInfo.nickName);
								 console.log('微信授权登录成功：' +infoRes.userInfo.nickName);
			                }
			            });
			        },
			        fail: (err) => {
			            console.error('授权登录失败：' + JSON.stringify(err));
			        }
			    });
			},
			toMain(userName) {
			    //this.login(userName);
			    /**
			     * 强制登录时使用reLaunch方式跳转过来
			     * 返回首页也使用reLaunch方式
			     */
			    if (this.forcedLogin) {
			        uni.navigateTo({
			            url: '/pages/myRechange/userinfoSwitchCity/userinfoSwitchCity?'+this.username, 
			        });
			    } else {
			        uni.navigateBack();
			    }
			
			}
		},
		onLoad() {
			this.username=uni.getStorageSync("username");
			console.log("onLoad username..."+this.username);
			if(this.username==''){
				console.log("onLoad username is null to oauth...");
				this.oauth();
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
	}
view {
		font-size: 28upx;
		line-height: inherit;
}
.scan_result{
	font-size: 62upx;
	margin-bottom: 10upx;
	padding: 10upx 0;
	display: flex;
	min-height: 10upx;
	width: 100%;
	background-color: #FFFFFF;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #353535;
	line-height: 1.8;
}
.example {
		padding: 0 10upx 10upx;
/* 		height:400upx; */
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
		font-size: 30upx;
	}
.head_right{
	right: 15upx;
	margin-right:15upx;
	font-size: 30upx;
}
.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}

	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}

	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
/* 		margin-right: 15upx; */
		width: 25%;
		height:100upx;
		box-sizing: border-box;
		font-size: 26upx;
	}

	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		background: #007aff;
		border-radius: 10upx;
	}

	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}
	.bottom-content-btn {
		font-size: 26upx;
		width:50upx;
		height: 45upx;
		border-top: 1px #f5f5f5 solid;
	}
	.bottom-btn {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
	}
	.charge_time_confirm{
		font-size: 36upx;
		color: #09BB07;
		margin-right: 30upx;
		width: 100upx;
	}
	.charge_time_hour{
		margin-top: 100upx;
		font-size: 36upx;
	}
	picker-view {
	    width: 100%;
	    height: 300upx;
	    margin-top:20upx;
	}
	
	.item {
	    line-height: 100upx;
	    text-align: center;
	}
</style>

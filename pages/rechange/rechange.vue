<template>
	<view>
		<view>
			<!--最上面设备编号+切换扫码按钮-->
			<view class="uni-flex uni-row" style="justify-content: space-between;">
				<view class="head">设备编号</view>
				<view class="head head_right" @click="qrcode" style="color: #007AFF;">切换扫码</view>
			</view>
			<!--显示编号-->
			<view class="scan_result">
				<view class="scan_result-item" :key="index" v-for="(item,index) in result">
					{{item}}
				</view>
			</view>
			<!--6个充电口状态-->
			<view class="page">
				<view class="example">
					<!-- <uni-grid :options="data3" :show-out-border="false" @change="selectChangeNum" /> -->
					<view class="uni-flex uni-row">
						<view class="flex-item">
							<text class="uni-grid-item-text">1</text>
							<text class="uni-grid-item-text">slots1</text>
						</view>
						<view class="flex-item">
							<text class="uni-grid-item-text">1</text>
							<text class="uni-grid-item-text">slots1</text>
						</view>
						<view class="flex-item">
							<text class="uni-grid-item-text">1</text>
							<text class="uni-grid-item-text">slots1</text>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="flex-item uni-column">
							<text class="uni-grid-item-text">1</text>
							<text class="uni-grid-item-text">slots1</text>
						</view>
						<view class="flex-item uni-column">
							<text class="uni-grid-item-text">1</text>
							<text class="uni-grid-item-text">slots1</text>
						</view>
						<view class="flex-item">
							<text class="uni-grid-item-text">1</text>
							<text class="uni-grid-item-text">slots1</text>
						</view>
					</view>
				</view>
			</view>
			<!--电池类型-->
			<view class="uni-list">
				<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-share')">
					<view class="head">电池类型</view>
					<view class="head head_right">{{battery_type_value}}</view>
				</view>
				<view class="uni-flex uni-row uni-list-cell " style="justify-content: space-between;" hover-class="uni-list-cell-hover">
					<view class="head">收费标准</view>
					<view class="head head_right">{{battery_type_price}}元/小时</view>
				</view>
				<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="togglePopup('bottom-time')">
					<view class="head">充电时长</view>
					<view class="head head_right">{{charge_time_value}}</view>
				</view>
				<view class="uni-flex uni-row" style="justify-content: space-between;">
					<view class="head">账户余额</view>
					<view class="head head_right">{{totalMoney}}</view>
				</view>
			</view>
			<view>
				<button class="btn_commit" @click="btnCommit">提交</button>
			</view>
		</view>
		<uni-popup :show="popupType === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
			<view class="bottom-title">请选择电池类型</view>
			<!--弹出来的电池类型提示-->
			<view class="uni-flex uni-row" style="justify-content: space-between;">
				<view class="battery_type_dialog_head">请选择与电池型号一致的充电器，以及损伤电池</view>
				<view class="battery_type_dialog_head_right" v-show="false" @click="moreType">更多类型</view>
			</view>
			<view class="bottom-content">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view v-for="(item, index) in batteryTypeList" :key="index" class="bottom-content-box scroll-view-item_H" 
					 v-on:click="addClass(index)" v-bind:class="{battery_type_ischeck:index==batteryTypecurrent}">
						<button class="battery_type_default" v-bind:class="{battery_type_ischeck:index==batteryTypecurrent}" @click="selectBattery(item.name,item.price_policy)">{{ item.name }}</button>
					</view>
					<!-- <view>
						<button class="battery_type_default scroll-view-item_H" v-on:click="addClass(9)" v-bind:class="{battery_type_ischeck:batteryTypecurrent==9}" @click="selectBattery('磷酸铁锂60V')">磷酸铁锂60V</button>
					</view> -->
				</scroll-view>
			</view>
			<view class="bottom-btn" @click="showHowtoKnowBatteryType()">如何识别电池类型</view>
			<!--如何识别电池类型页面-->
			<view>
				 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y how_to_know_battery_type" @scrolltoupper="upper" @scrolltolower="lower"
                @scroll="scroll" v-show="isShowHowtoKnowBatteryType">
					<image src="../../static/how_to_know_battery_type1.png"></image>
					<image src="../../static/how_to_know_battery_type2.png" style="margin-top: -40upx;"></image>
					<image src="../../static/how_to_know_battery_type3.png" class="how_to_know_battery_type-image"></image>
				</scroll-view>
			</view>
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
				result: '111111',
				username:'',
				hidechangeTimePopup:false,//隐藏充电时长弹出菜单
				isShowHowtoKnowBatteryType:false,//默认隐藏如何知道电池类型
				charge_list_ports:[],
				//data: "{"code":200,"data":{"id":4,"slots1":"空闲","slots2":"空闲","slots3":"空闲","slots4":"空闲","slots5":"空闲","slots6":"空闲","facility_num":222222
				data3: [{
						// image: '/static/c1.png',
						//num:'1',
						slots1: '空闲'
					},
					{
						// image: '/static/c2.png',
						//num:'2',
						slots2: '充电中'
					},
					{
						// image: '/static/c3.png',
						//num:'3',
						slots3: '空闲'
					},
					{
						// image: '/static/c4.png',
						//num:'4',
						slots4: '空闲'
					},
					{
						// image: '/static/c5.png',
						//num:'5',
						slots5: '空闲'
					},
					{
						// image: '/static/c6.png',
						//num:'6',
						slots6: '空闲'
					}
				],
				popupType: '',
				selectBatteryType:'',
				showSelected:false,
				batteryTypecurrent:0,
				bottomData: [{
						text: '铅酸36V',
						price:1,
						// icon: '\ue6a4',
						// name: 'wx'
					},
					{
						text: '铅酸48V',
						price:1.1,
						// icon: '\ue646',
						// name: 'wx'
					},
					{
						text: '铅酸60V',
						price:1.2,
						// icon: '\ue66b',
						// name: 'qq'
					},
					{
						text: '铅酸72V',
						price:1.3,
						// icon: '\ue600',
						// name: 'sina'
					},
					{
						text: '锂电36V',
						price:1.4,
						// icon: '\ue632',
						// name: 'copy'
					},
					{
						text: '锂电48V',
						price:1.5,
						// icon: '\ue618',
						// name: 'more'
					},
					{
						text: '锂电60V',
						price:1.6,
						// icon: '\ue618',
						// name: 'more'
					},
					{
						text: '锂电72V',
						price:1.7,
						// icon: '\ue618',
						// name: 'more'
					}
					 ,
					 {
					 	text: '磷酸铁锂60V',
						price:1.8,
					 	// icon: '\ue618',
					 	// name: 'more'
					 }
				],
				totalMoney:0,
				batteryTypeList:[],
				// batteryTypeList: [{
				// 		text: '铅酸36V',
				// 		// icon: '\ue6a4',
				// 		// name: 'wx'
				// 	},
				// 	{
				// 		text: '铅酸48V',
				// 		// icon: '\ue646',
				// 		// name: 'wx'
				// 	},
				// 	{
				// 		text: '铅酸60V',
				// 		// icon: '\ue66b',
				// 		// name: 'qq'
				// 	},
				// 	{
				// 		text: '铅酸72V',
				// 		// icon: '\ue600',
				// 		// name: 'sina'
				// 	},
				// 	{
				// 		text: '锂电36V',
				// 		// icon: '\ue632',
				// 		// name: 'copy'
				// 	},
				// 	{
				// 		text: '锂电48V',
				// 		// icon: '\ue618',
				// 		// name: 'more'
				// 	},
				// 	{
				// 		text: '锂电60V',
				// 		// icon: '\ue618',
				// 		// name: 'more'
				// 	},
				// 	{
				// 		text: '锂电72V',
				// 		// icon: '\ue618',
				// 		// name: 'more'
				// 	}
				// 	 ,
				// 	 {
				// 	 	text: '磷酸铁锂60V',
				// 	 	// icon: '\ue618',
				// 	 	// name: 'more'
				// 	 }
				//],
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
				battery_type_price:0,//电池类型对应的价格
				balance:100,//总余额
				charge_time:0,//充电时间
				spendMoney:0,//花费的金额
				nextTodoId:1,//充电记录ID
				changeRecordList:[],//充电记录列表id,batteryType,price
				battery_type_value:'>',
				charge_time_value:'>',
				change_time:0,
				currentSlot:1,//选中的充电口
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: false,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			qrcode:function(){
				console.log("uni.scanCode....");
				uni.scanCode({
					success: (res) => {
						//首先用字符串的split方法将字符串变成数组 在用数组的join方法将数组变成字符串中
						this.result = res.result;//.split("").join("  ");
						console.log("this.result=="+this.result);
						//console.log(result.split("").join(" "));
						//向服务器请求充电闲置忙碌状态
						this.phonenumber = uni.getStorageSync("phone");
						this.token = uni.getStorageSync("token");
						console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
						uni.request({
							url: 'http://39.106.217.14:8000/api/charge/facility/',
							dataType: 'text',
							data: {
								facility_id:this.result
							},
							method: 'GET',
						}).then(res => {
							console.log('request success', res[1]);
							this.loading = false;
							var data = JSON.parse(res[1].data)
							//获取充电口的列表状态
							this.charge_list_ports=data.data;
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
				});
			},
			btnCommit:function(){
				if(this.result==null || this.result==''){
					uni.showModal({
						title:'充电提示',
						content:'请先扫码选择充电口!',
						showCancel:false,
					})
					return;
				}
				uni.request({
					url: 'http://39.106.217.14:8000/api/charge/facility/order_submit/',
					dataType: 'text',
					header: {
						'Authorization': this.token //把token提交到请求头
					},
					data: {
						facility_id:this.result,//
						hole_id:this.currentSlot,
						phone:this.phonenumber,
						money:this.spendMoney,
						second:this.charge_time*3600
					},
					method: 'POST',
				}).then(res => {
					console.log('request success', res[1]);
					//this.res =JSON.stringify(res[1]);
					this.loading = false;
					var data = JSON.parse(res[1].data)
					this.batteryTypeList=data.data;
					var code=data['code'];
					console.log("code=="+code);
					if(code==1009){
						var errorMsg = data.data['errmsg'];
						console.log("errorMsg==" + errorMsg);
						uni.showModal({
							title: '提交订单失败',
							content:errorMsg,
							showCancel:false,
							success: function(res) {}
						});
						return;
					}
					// this.totalMoney=data.data['money'];
					// console.log("data==" + data);
					// for (var val in data.data) {
					// 	console.log("data.data[val]['name']==" +data.data[val]['name']+",val=="+val);
					// }
				}).catch(err => {
					console.log('request fail', err);
					this.loading = false;
				});
				console.log("btnCommit....");
				this.showSelected=true;
				//计算应该花费的金额
				this.totalMoney=this.totalMoney-this.charge_time*this.battery_type_price;
				console.log("btnCommit this.spendMoney.."+this.spendMoney+",this.charge_time="+this.charge_time
				+",this.battery_type_price=="+this.battery_type_price+",这次花费金额为=="+this.charge_time*this.battery_type_price);
				//插入充电记录
				// this.changeRecordList.push({
				// 	id:this.nextTodoId++,
				// 	batteryType:this.battery_type_value,
				// 	price:this.charge_time*this.battery_type_price,
				// });
				// uni.setStorageSync("changeRecordList",this.changeRecordList);
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
						this.charge_time=8;
					}else{
						this.charge_time_value=this.hour+'时'+this.mintue+'分>';
						if(this.mintue==30){
							this.change_time=this.hour+0.5;
						}else{
							this.change_time=this.hour;
						}
							
					}
					console.log("this.charge_time_value=="+this.charge_time_value+",this.charge_time=="+this.charge_time);
					//隐藏弹出框
					//this.togglePopup('');
				}
			},
			confirmRechangeTime:function(){
				this.hidechangeTimePopup=true;
			},
			selectBattery:function(value,price){
				this.battery_type_value=value+">";
				this.battery_type_price=price;
				this.togglePopup('');
				
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
				if(this.hour==0){
					if(this.mintue==0){
						this.charge_time_value="充满即止不限时";
						this.charge_time=8;
					}else if(this.mintue==30){
						this.charge_time_value=this.hour+'时'+this.mintue+'分';
						this.charge_time=this.hour+0.5;
					}
				}else{
					if(this.mintue==0){
						this.charge_time_value=this.hour+'时';
						this.charge_time=this.hour;
					}else if(this.mintue==30){
						this.charge_time_value=this.hour+'时'+this.mintue+'分';
						this.charge_time=this.hour+0.5;
					}
				}
				console.log("this.charge_time_value=="+this.charge_time_value+",this.charge_time=="+this.charge_time);
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
			
			},
			selectChangeNum(e){
				const val = e.detail.value
				console.log("selectChangeNum val="+val);
			},
			addClass:function(index){
				this.batteryTypecurrent=index
				console.log("addClass batteryTypecurrent="+this.batteryTypecurrent);
			},
			showHowtoKnowBatteryType:function(){
				if(this.isShowHowtoKnowBatteryType){
					this.isShowHowtoKnowBatteryType=false;
				}else{
					this.isShowHowtoKnowBatteryType=true;
				}
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			gotoUserLogin:function(){
				uni.navigateTo({
					url:'../myRechange/userLogin/userLogin'
				})
			}
		},
		onShow() {
			// uni.request({
			// 	url: 'http://39.106.217.14:8000/api/charge/battery_type/',
			// 	dataType: 'text',
			// 	data: {
			// 		facility_id:this.result
			// 	},
			// 	method: 'GET',
			// }).then(res => {
			// 	console.log('request success', res[1]);
			// 	this.loading = false;
			// 	var data = JSON.parse(res[1].data)
			// 	this.batteryTypeList=data.data;
			// }).catch(err => {
			// 	console.log('request fail', err);
			// 	this.loading = false;
			// });
		},
		onLoad(){
			this.phonenumber=uni.getStorageSync("phone");
			console.log("onLoad phonenumber..."+this.phonenumber);
			if(this.phonenumber==''){
				console.log("onLoad phonenumber is null to oauth...");
				this.gotoUserLogin();
				return;
				//this.oauth();
			}
			//向服务器请求充电闲置忙碌状态
			this.phonenumber = uni.getStorageSync("phone");
			this.token = uni.getStorageSync("token");
			console.log("this.phonenumber==" + this.phonenumber + ",this.token==" + this.token);
			//向服务器请求余额状
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
				// uni.showToast({
				// 	title: '获取成功',
				// 	icon: 'success',
				// 	mask: true,
				// 	duration: 2000
				// });
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
	position: relative;
	display: flex;
	flex-direction: row
}
.scan_result-item{
	font-size: 62upx;
	margin-bottom: 10upx;
	padding: 10upx 0;
	display: flex;
	min-height: 10upx;
	width: 16%;
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
.battery_type_dialog_head{
		margin:15upx 10upx;
		padding: 0 20upx;
		/* background-color: #ebebeb; */
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 25upx;
	}
.battery_type_dialog_head_right{
	right: 15upx;
	margin-right:15upx;
	font-size: 25upx;
	color: #09BB07;
}
.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}

	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15upx;
	}

	.bottom-content-box {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		margin-bottom: 15upx;
		width: 180upx;
		height:100upx;
		box-sizing: border-box;
		text-align: center;
		font-size: 20upx;
	}
	.battery_type_default  {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 100upx;
		width: 170upx;
		margin-left: 10upx;
		text-align: justify;
		type:primary;
		plain:false;
		class:mini-btn;
		box-sizing: border-box;
		font-size: 28upx;
	}
	.battery_type_ischeck  {
		display: flex;
		flex-wrap: nowrap;
		background-color: green;
		align-items: center;
		height: 100upx;
		width: 170upx;
		margin-left: 10upx;
		text-align: center;
		type:primary;
		plain:false;
		class:mini-btn;
		box-sizing: border-box;
		font-size: 28upx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 200upx;
	}
	.scroll-view-item_H {
		display: inline-block;
/* 		width: 100%;
		height: 100upx;
		line-height: 100upx; */
		text-align: center;
		font-size: 36upx;
	}
	.how_to_know_battery_type{
		width: 100%;
		height: 300upx;
	}
	.how_to_know_battery_type-image{
		width: 100%;
		height: 100upx;
		margin-top: -40upx;
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
		color: #007AFF;
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
	.flex-item {
		width: 33.3%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
		flex-direction: column;
	}
	
	.flex-item-V {
		width: 100%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
	}
</style>

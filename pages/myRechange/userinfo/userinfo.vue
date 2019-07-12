<template>
	<view>
		<!--手机号码-->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="head">用户名</view>
			<view class="head head_right">{{username}}</view>
		</view>
		<!--城市-->
		<view class="uni-flex uni-row uni-list-cell" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="gotoCityList">
			<view class="head">城市</view>
			<view class="head head_right">{{cityname}}></view>
		</view>
		<!--退出登录按钮-->
		<view v-if="username!=''" v-show="showExitlogin">
			<button class="btn_commit"  @click="exitLogin">退出登录</button>
		</view>
		<view v-elseif="username==''" v-show="showlogin">
			<button class="btn_commit"  @click="login">登 录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '个人信息',
				username:'游客',
				showlogin:false,
				showExitlogin:false,
				cityname:''
			}
		},
		methods: {
			gotoCityList(){
				uni.navigateTo({
					url:"/pages/myRechange/userinfoSwitchCity/userinfoSwitchCity"
				})
			},
			exitLogin:function(){
				this.username='游客';
				uni.setStorageSync("username",'');
				this.showlogin=true;
				this.showExitlogin=false;
				console.log("exitLogin showlogin=="+this.showlogin+",,this.showExitlogin=="+this.showExitlogin);
			},
			login:function () {
				    uni.login({
				        provider: 'weixin',//value'',
				        success: (res) => {
							this.showlogin=false;
							this.showExitlogin=true;
				            uni.getUserInfo({
				                provider: 'weixin',//value,
				                success: (infoRes) => {
				                    /**
				                     * 实际开发中，获取用户信息后，需要将信息上报至服务端。
				                     * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
				                     */
									//console.log('微信登录信息'+inforRes.userInfo);
				                    //this.toMain(infoRes.userInfo.nickName);
									//this.username=infoRes.userInfo.nickName;
									uni.setStorageSync("username",infoRes.userInfo.nickName);
									console.log('微信授权登录成功：' +infoRes.userInfo.nickName);
									this.username=infoRes.userInfo.nickName;
									this.showExitlogin=false;
									this.showlogin=true;
				                }
				            });
				        },
				        fail: (err) => {
				            console.error('授权登录失败：' + JSON.stringify(err));
				        }
				    });
				},
			},
		//},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.username=uni.getStorageSync("username");
			if(this.username==''){
				this.showExitlogin=true;
				this.showlogin=false;
			}else{
				this.showExitlogin=false;
				this.showlogin=true;
			}
			this.cityname=uni.getStorageSync("cityname");
			console.log("userinfo page onLoad this.phonenumber=="+this.phonenumber+",,this.cityname=="+this.cityname);
			// if(e.cityname){
			// 	//this.phonenumber = e.phonenumber;
			// 	this.cityname=e.cityname;
			// 	console.log("onLoad this.phonenumber=="+this.phonenumber+",,this.cityname=="+this.cityname);
			// }
		},
		onShow() {
			this.cityname=uni.getStorageSync("cityname");
			console.log("userinfo page onShow this.cityname..."+this.cityname);
		}
	}
</script>

<style>
view {
		font-size: 28upx;
		line-height: inherit;
}
.btn_commit{
	margin-top: 30upx;
	background: #09BB07;
	width:90%;
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
</style>

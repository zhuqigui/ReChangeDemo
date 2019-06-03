<template>
	<view>
		<view class="uni-flex uni-row uni-list-cell cityName" v-for="(item,index) in citylists" :key="index" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="selectCity">
			<view>{{item.cityname}}</view>
			<checkbox v-if="this.selectCityName==item.cityname" :checked="true"></checkbox>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'个人信息',
				citylists: [
					{
						cityname:'北京'
					},
					{
						cityname:'上海'
					},
					{
						cityname:'广州'
					},
					{
						cityname:'深圳'
					},
					{
						cityname:'佛山'
					},
					{
						cityname:'天津'
					},
					{
						cityname:'南京'
					},
					{
						cityname:'杭州'
					},
					{
						cityname:'苏州'
					}
					],
					showSwitch:false,
					selectCityName:''
			}
		},
		methods: {
			selectCity(){
				console.log("selectCity method item=="+this.citylists.index);
				this.showSwitch=true;
				//设置选择的城市数据
				uni.setStorageSync("cityname",this.selectCityName);
				
				console.log("selectCity method uni.getStorageSync('cityname')="+uni.getStorageSync("cityname"));
				uni.navigateBack()
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.selectCityName=uni.getStorageSync("cityname");
			console.log("onLoad this.selectCityName=="+this.selectCityName);
		}
	}
</script>

<style>
.cityName{
	width:100%;
	height: 100upx;
	font-size: 30upx;
}
</style>

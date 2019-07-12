<template>
	<view>
		<checkbox-group @change="checkboxChange">
			<view class="uni-flex uni-row uni-list-cell cityName" v-for="(item,index) in citylists" :key="index" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="selectCity(index,item.cityname)">
				<view name="citynameView" :value="itemCityName">{{item.cityname}}</view>
				<!---->
				<checkbox :checked="true" v-show="index==selectIndex"></checkbox>
			</view>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'个人信息',
				selectIndex:0,
				citylists: [
					{
						cityname:'北京',
						checked:false
					},
					{
						cityname:'上海',
						checked:false
					},
					{
						cityname:'广州',
						checked:false
					},
					{
						cityname:'深圳',
						checked:true
					},
					{
						cityname:'佛山',
						checked:false
					},
					{
						cityname:'天津',
						checked:false
					},
					{
						cityname:'南京',
						checked:false
					},
					{
						cityname:'杭州',
						checked:false
					},
					{
						cityname:'苏州',
						checked:false
					}
					],
					showSwitch:true,
					selectCityName:''
			}
		},
		methods: {
			selectCity(index,cityName){
				this.selectIndex=index;
				this.selectCityName=cityName;
				 console.log("selectCity method this.selectIndex=="+this.selectIndex+",this.selectCityName=="+this.selectCityName);
				 //设置选择的城市数据
				uni.setStorageSync("cityname",this.selectCityName);
				uni.navigateBack()
			},
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.selectCityName=uni.getStorageSync("cityname");
			console.log("onLoad this.selectCityName=="+this.selectCityName);
			var items = this.citylists;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				console.log("onLoad item.cityname=="+item.cityname);
				if(this.selectCityName==item.cityname){
					this.selectIndex=i;
					//this.$set(item,'checked',true)
					//this.$set(item,':show',true)
					console.log("onLoad this.selectIndex=="+this.selectIndex);
				}
				// else{
				// 	this.$set(item,'checked',false)
				// 	//this.$set(item,'show',false)
				// 	console.log("onLoad this.$set i checked to false...");
				// }
			}
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

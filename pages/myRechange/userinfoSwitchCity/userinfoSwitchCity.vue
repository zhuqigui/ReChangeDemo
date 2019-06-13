<template>
	<view>
		<checkbox-group @change="checkboxChange">
			<view class="uni-flex uni-row uni-list-cell cityName" v-for="(item,index) in citylists" :key="index" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @click="selectCity">
				<view name="citynameView" :value="itemCityName"></view>
				<!--{{item.cityname}}-->
				<checkbox :checked="item.checked" v-show="item.checked"></checkbox>
			</view>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'个人信息',
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
			selectCity(e){
				console.log("selectCity method e.cityname=="+e.cityname);
				this.showSwitch=true;
				//设置选择的城市数据
				uni.setStorageSync("cityname",this.selectCityName);
				console.log("selectCity method uni.getStorageSync('cityname')="+uni.getStorageSync("cityname"));
				
				var items = this.citylists;
					//values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					console.log("selectCity item.cityname=="+item.cityname+",i=="+i+",this.selectCityName=="+this.selectCityName);
					if(this.selectCityName!=(item.cityname)){
						item.checked=false;
						this.$set(item,'checked',false)
						//console.log("selectCity this.$set i checked to false...");
					}else{
						item.checked=true;
						this.$set(item,'checked',true)
						console.log("selectCity this.$set i checked to true...");
					}
				}
				//uni.navigateBack()
			},
			// checkboxChange: function (e) {
			// 	var items = this.citylists,
			// 		values = e.detail.value;
			// 	for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 		const item = items[i]
			// 		console.log("checkboxChange item.value=="+item.value);
			// 		if(values.includes(item.value)){
			// 			this.$set(item,'checked',true)
			// 			console.log("checkboxChange this.$set i checked to true...");
			// 		}else{
			// 			this.$set(item,'checked',false)
			// 			console.log("checkboxChange this.$set i checked to false...");
			// 		}
			// 	}
			// }
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.selectCityName=e.cityname;//uni.getStorageSync("cityname");
			console.log("onLoad this.selectCityName=="+this.selectCityName);
			var items = this.citylists;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				console.log("onLoad item.cityname=="+item.cityname);
				if(this.selectCityName==item.cityname){
					this.$set(item,'checked',true)
					//this.$set(item,':show',true)
					console.log("onLoad this.$set i checked to true...");
				}else{
					this.$set(item,'checked',false)
					//this.$set(item,'show',false)
					console.log("onLoad this.$set i checked to false...");
				}
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

<template>
	<view>
		<!--地图添加几个站点-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			//获取当前位置
			uni.getLocation({
				success: (res) => {
					// this.hasLocation = true,
					// 	this.location = formatLocation(res.longitude, res.latitude)
						uni.openLocation({
							longitude: Number(res.longitude),
							latitude: Number(res.latitude),
							// name: value.name,
							// address: value.address
						})
				}
			})
			
		}
	}
</script>

<style>

</style>

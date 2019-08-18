<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			//只是方便调试，单独启动页面
			// uni.navigateTo({
			// 	url:"/pages/myRechange/userRegister/userRegister"
			// })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import './common/iconfont.css';
</style>

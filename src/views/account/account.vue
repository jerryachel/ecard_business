<template>
	<div>
		<common-header></common-header>
		<iframe class="iav_container" v-if="iavToken":src="'http://dwolla.ecard/dwolla_iav.html?t='+iavToken" frameborder="0"></iframe>
		<el-button @click="getIavToken">绑卡</el-button>
	</div>
</template>
<script>
import commonHeader from '../../components/header.vue'
import axios from '../../service/axios.js'
export default {
	components:{
		commonHeader:commonHeader
	},
	data(){
		return {
			iavToken:'',
		}
	},
	computed:{
		seesion:function(){
			return this.$store.state.user_info.session
		}
	},
	mounted(){
		window.addEventListener('message',function(e){
			//console.log(e)
			if (e.data === 'success') {
				this.$message({
					message: '绑卡成功！',
					type: 'success'
				});
				this.success = ''
			}else if(e.data === 'error'){
				this.$message.error('网络错误，请刷新重试')
			}
		})
	},
	methods:{
		getIavToken(){
			axios.get('/userOperation/getIAVToken',{
				headers:{
					s:this.seesion
				}
			}).then(({data})=>{
				if (data.code == 200) {
					this.iavToken = data.data
				}else if(data.code == 410){
					this.$alert()
					this.$router.push('/login')
				}
			})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.iav_container{
	border: 1px solid #ccc;
	width: 800px;
	height: 600px;
	margin: 0 auto;
	border-radius: 10px;
	display: block;
}
</style>
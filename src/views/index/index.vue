<template>
	<div>
		<common-header></common-header>
		<iframe v-if="iavToken" width="100%" :src="'http://dwolla.ecard/dwolla_iav.html?t='+seesion" frameborder="0"></iframe>
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
			console.log(e)
		})
		axios.get('/userOperation/getIAVToken',{
			headers:{
				s:this.seesion
			}
		}).then(({data})=>{
			this.iavToken = data.data
		})
	},
	methods:{

	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
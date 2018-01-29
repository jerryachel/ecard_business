<template>
	<div>
		<common-header></common-header>
		<iframe v-if="iavToken" width="100%" :src="'http://dwolla.ecard/dwolla_iav.html?'+iavToken" frameborder="0"></iframe>
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
	mounted(){
		axios.get('/userOperation/getIAVToken').then(({data})=>{
			this.iavToken = data.data
		})
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
<template>
	<div>
		<common-header></common-header>
		<iframe class="iav_container" v-if="iavToken":src="'http://dwolla.ecard/dwolla_iav.html?t='+iavToken" frameborder="0"></iframe>
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
	},
	methods:{

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
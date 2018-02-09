<template>
	<div>
		<common-header></common-header>
		<div class="help">
			
		</div>
	</div>
</template>
<script>
import commonHeader from '../../components/header.vue'
import axios from '../../service/axios.js'
export default {
	components:{
		commonHeader:commonHeader,
	},
	data(){
		return {
			
		}
	}
}
</script>
<style lang="scss">
.help{	
	width: 1000px;
	margin: 50px auto ;
	h1{
		font-size: 18px;
		font-weight: bold;
		margin-top: 50px;
	}	
}
</style>
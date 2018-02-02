<template>
	<div  :class="['setting_button',value?'active':'']" >
		<span class="point"></span>
	</div>
</template>
<script>
export default {
	props:{
		value: {
			type: Boolean,
			default:false
		}
	},
	data () {
		return {
			checked:false
		}
	}
}
</script>
<style lang="scss">
	.setting_button{
		width:45px;
		height:20px;
		background:#ccc;
		border-radius:10px;
		transition:all ease .3s;
		position: relative;
		cursor:pointer;
		.point{
			display:block;
			width:14px;
			height:14px;
			background-color:#fff;
			border-radius:100%;
			position:absolute;
			top:50%;
			transform:translateY(-50%);
			left:10%;
			transition:all ease .3s;
		}
	}
	.active{
		background:$blue;
		.point{
			left:60%;
		}
	}
</style>
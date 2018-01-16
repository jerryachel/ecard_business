<template>
	<header class="header">

	</header>
</template>

<script>
export default {
	data () {
		return {
			msg: ''
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/css/index.scss';
.header{
	width: 100%;
	height: 100px;
	@extend %flex_justify;
	color: #333;
	padding: 10px 50px;
	background: #fff;
}
</style>

<template>
	<div class="login">
		<div class="nav">
			<img class="logo" src="../../assets/images/logo.png" alt="">
		</div>
	</div>
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
.login{
	.nav{
		width: 100%;
		height: 90px;
		display: flex;
		align-items:center;
	}
	.logo{
		width: 280px;
	}
}
</style>

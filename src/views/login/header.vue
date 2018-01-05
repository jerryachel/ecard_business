<template>
	<div class="login_nav">
		<img class="logo" src="../../assets/images/logo.png" alt="">
		<div class="nav_btn">
			<router-link to="/login">登录</router-link>
			<router-link to="/register">注册</router-link>
			<a href="#">顾客登录/注册</a>
		</div>
	</div>
</template>
<script>
	
</script>
<style lang="scss" >
@import '../../assets/css/index.scss';
.login_nav{
	width: 100%;
	height: 100px;
	@extend %flex_justify;
	color: #333;
	padding: 10px 50px;
	.logo{
		width: 180px;
	}
	a{
		margin: 0 20px;
		font-size: 18px;
	}
}
</style>
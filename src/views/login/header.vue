<template>
	<div class="login_nav">
		<img class="logo" src="../../assets/images/logo.png" alt="">
		<div class="nav_btn">
			<router-link to="/login">登录<span></span>
			</router-link>
			<router-link to="/register">注册<span></span>
			</router-link>
			<a href="#">顾客登录/注册<span></span></a>
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
	.nav_btn{
		display: flex;
		span{
			display: block;
			position: absolute;
			bottom: 0px;
			left: 50%;
			transform:translate(-50%,0);
			width: 140%;
			height: 4px;
			border-radius: 4px ;
			background-color: $blue;
			opacity: 0;
			transition:all ease .5s;
		}
	}
	.router-link-active{
		color:$blue;
		span{
			opacity: 1;
		}
	}
	a{	
		display: flex;
		height: 40px;
		align-items:center;
		position: relative;
		margin: 0 20px;
		font-size: 16px;
		transition:all ease .5s;
		&:hover{
			color:$blue;
			span{
				opacity: 1;
			}
		}
	}
	
}
</style>
<template>
	<div class="login_nav">
		<img class="logo" src="../../assets/images/logo.png" alt="">
		<div class="nav_btn">
			<a href="#">Log in<span></span>
			</a>
			<router-link to="/register">Register<span></span>
			</router-link>
			<a href="#">Customer Log in/Register<span></span></a>
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
	background: #fff;
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
			width: 120%;
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
		font-size: 18px;
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
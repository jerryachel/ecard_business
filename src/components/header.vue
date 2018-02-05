<template>
	<header class="header">
		<img class="logo" src="../assets/images/logo.png" alt="">
		<div class="nav_btn">
			<router-link class="nav_link" to="/index">Home page<span></span>
			</router-link >
			<router-link class="nav_link" to="/remind">提醒<span></span>
			</router-link>
			<div href="#" @mouseover="showMenu = !showMenu"  @mouseout="showMenu = !showMenu" class="nav_link avatar">
				<img class="avatar_pic" :src="avatar"  alt="">
				<transition name="menu">
					<div v-show="showMenu" class="menu">
						<ul >
							<li>
								<router-link to="/account">银行账号管理</router-link>
							</li>
							<li>
								<router-link to="/personal">个人信息与设置</router-link>
							</li>
							<li>
								<router-link to="/help">帮助</router-link>
							</li>
							<li>
								<a href="javascript:void(0)" @click="loginOut()">退出</a>
							</li>
						</ul>
					</div>
				</transition>
			</div>
		</div>
	</header>
</template>

<script>
import axios from '../service/axios.js'
import Cookies from 'js-cookie'
export default {
	data () {
		return {
			showMenu: false,
		}
	},
	computed:{
		avatar:function(){
			return this.$store.state.user_account.avatarUrl 
		}	
	},
	mounted(){
	},
	methods:{
		loginOut(){
			this.$confirm('确定要退出吗?', '提示', {
	          confirmButtonText: 'OK',
	          cancelButtonText: 'Cancel',
	          type: 'warning'
	        }).then(() => {
	        	axios.get('/userOperation/logout.do',{
	        		session:true
	        	}).then((data)=>{
	        		if (data.code == 200) {
	        			Cookies.remove('user_info')
         				
         				this.$router.push('/login')
	        		}else{
	        			this.$message.error(data.msg)
	        		}
	        	})
				return	
	        }).catch(() => {
	          console.log('cancel')         
	        })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header{
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
	.nav_link{	
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
	.avatar{
		position: relative;
		margin: 0 30px;
		.avatar_pic{
			width: 50px;
			height: 50px;
			border-radius: 100%;
			position: relative;
			z-index: 10;
		}
	}
	.menu{
		position: absolute;
		width: 140px;
		top: 0px;
		left: -45px;
		padding-top: 50px;
		z-index: 10;
		ul{
			border: 1px solid #e4e7ed;
			border-radius: 4px;
			background-color: #fff;
			overflow: hidden;
		}
		.router-link-active{
			background-color: #f5f7fa;
		}
		a{
			display: block;
			text-align: center;
			font-size: 16px;
			height: 40px;
			line-height: 38px;
			&:hover{
				background-color: #f5f7fa;
			}
		}
	}
	.menu-leave-active{
		animation: slide-out-top .5s .2s  both 1;
	}
	.menu-enter-active{
		animation: slide-in-top .5s  both 1;
	}
}
</style>

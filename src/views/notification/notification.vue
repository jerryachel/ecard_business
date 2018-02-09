<template>
	<div>
		<common-header></common-header>
		<div class="notification">
			<h1>ECPAY Tips</h1>
			<ul class="notification_list">
				<li>
					<div class="pic">
						<img src="../../assets/images/u75.png" alt="">
					</div>
					<div class="text">
						<h4>我是个大标题，最多20个字</h4>
						<p>简介内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内最多66字</p>
					</div>
				</li>
				<li>
					<div class="pic">
						<img src="../../assets/images/u75.png" alt="">
					</div>
					<div class="text">
						<h4>我是个大标题，最多20个字</h4>
						<p>简介内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内最多66字</p>
					</div>
				</li>
				<li>
					<div class="pic">
						<img src="../../assets/images/u75.png" alt="">
					</div>
					<div class="text">
						<h4>我是个大标题，最多20个字</h4>
						<p>简介内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内最多66字</p>
					</div>
				</li>
			</ul>
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
.notification{	
	width: 1000px;
	margin: 50px auto ;
	h1{
		font-size: 18px;
		font-weight: bold;
		margin-top: 50px;
	}	
	.notification_list{
		display: flex;
		flex-wrap:wrap;
		width: 100%;
		margin-top: 35px;
		li{
			margin-right: 30px;
			width: 30%;
			transition:ease all .3s;
			border: 1px solid #ccc;
			border-radius:4px;
			margin-bottom: 20px;
			overflow: hidden;
			&:hover{
				box-shadow: 0 0 10px 0px rgba(0,0,0, .3)
			}
		}
		.pic{
			width: 100%;
			height: 160px;
			overflow: hidden;
			img{
				width: 100%;
				height: auto;
			}
		}
		.text{
			padding: 10px;
			height: 180px;
			h4{
				font-weight: normal;
				font-size: 16px;
				margin-bottom: 10px;
			}
			p{
				line-height: 1.5
			}
		}
	}
}
</style>
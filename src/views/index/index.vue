<template>
	<div>
		<common-header></common-header>
		<div class="index">
			<h1>余额管理</h1>
			<div class="balance">
				<p>账户余额: $200.00</p>
				<el-button class="withdraw_btn" type="primary">提现</el-button>
			</div>
			<h1>账目明细</h1>
			<el-tabs  type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="顾客" name="first">顾客</el-tab-pane>
				<el-tab-pane label="我的" name="second">我的</el-tab-pane>
			</el-tabs>
		</div>
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
			activeName:'second',
		}
	},
	mounted(){
	},
	methods:{
		handleClick(tab, event) {
			console.log(tab, event);
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.index{
	width: 800px;
	margin: 30px auto 0;
	h1{
		font-size: 18px;
		font-weight: bold;
		margin-top: 50px;
	}
	.balance{
		text-align: center;
		font-size: 18px;
	}
	.withdraw_btn{
		margin-top: 80px;
		width: 360px;
	}
}
</style>
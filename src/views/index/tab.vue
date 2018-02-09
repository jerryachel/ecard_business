<template>
	<div class="tab">
		<el-button :type="statusType==1?'primary':''" @click="statusType = 1" size="mini" round>正在处理</el-button>
		<el-button :type="statusType==2?'primary':''" @click="statusType = 2" size="mini" round>已完成</el-button>
		<ul class="tab_list">
			<li>
				<div class="tab_list_l">
					<img src="../../assets/images/u4.png" class="avatar" alt="">
					<div class="info">
						<p class="name">Qiyi Chen<span class="time">03-10-2017</span></p>
						<p class="status">已付款---正在处理</p>
					</div>
				</div>
				<div class="tab_list_r pay">
					- $1.00
				</div>
			</li>
			<li>
				<div class="tab_list_l">
					<img src="../../assets/images/u4.png" class="avatar" alt="">
					<div class="info">
						<p class="name">Qiyi Chen<span class="time">03-10-2017</span></p>
						<p class="status">已付款---正在处理</p>
					</div>
				</div>
				<div class="tab_list_r pay">
					- $1.00
				</div>
			</li>
			<li>
				<div class="tab_list_l">
					<img src="../../assets/images/u4.png" class="avatar" alt="">
					<div class="info">
						<p class="name">Qiyi Chen<span class="time">03-10-2017</span></p>
						<p class="status">已付款---正在处理</p>
					</div>
				</div>
				<div class="tab_list_r pay">
					- $1.00
				</div>
			</li>
		</ul>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pagination.currentPage"
			:page-sizes="[10, 20, 30, 40]"
			:page-size="pagination.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="pagination.totalPage">
		</el-pagination>
	</div>
</template>
<script>
export default {
	data(){
		return {
			statusType:1,
			pagination:{
				currentPage:1,
				pageSize:10,
				totalPage:100,
			}
		}
	},
	methods:{
		//分页
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},

	}
}
</script>
<style lang="scss">
.tab{
	.tab_list{
		margin-top: 30px;
		min-height: 300px;
		li{
			display: flex;
			align-items:center;
			//height: 50px;
			justify-content:space-between;
			padding: 15px 0;
			border-bottom: 1px dashed #ccc;
			cursor: pointer;
			&:first-child{
				border-top: 1px dashed #ccc;
			}
		}
		.tab_list_l{
			display: flex;
		}
		.info{
			height: 50px;
			display: flex;
			flex-direction:column;
			justify-content:space-around;
			margin-left: 20px;
		}
		.avatar{
			width: 50px;
			height: 50px;
		}
		.name{
			font-size: 16px;
		}
		.time{
			font-size: 12px;
			color:#999;
			margin-left: 10px;
		}
		.status{
			font-size: 14px;
			color:#999
		}
		.tab_list_r{
			font-size: 18px;
		}
		.pay{
			color: #D80027;
		}
		.income{
			color: #009933;
		}
		.el-pagination{
			display: flex;
    		justify-content: center;
		}
	}
}
</style>
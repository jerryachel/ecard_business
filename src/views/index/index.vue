<template>
	<div>
		<common-header></common-header>
		<div class="index">
			<h1>余额管理</h1>
			<div class="balance">
				<p>账户余额: ${{balanceAvailable}}</p>
				<el-button class="withdraw_btn" type="primary">提现</el-button>
			</div>
			<h1 class="details_title" >
				账目明细 
				<el-button size="mini" type="primary">发送账目明细到我的Email</el-button>
			</h1>
			<el-tabs class="index_tab"  type="border-card" v-model="activeName">
				<div class="filter_option">
					<div class="date_filter">
						<el-button type="primary" size="mini" class="switch_filter" @click="datePickerType == 'month'? datePickerType = 'date' : datePickerType = 'month'" round>{{datePickerType== 'month' ? '按月选择' : '按日选择'}}
							<img src="../../assets/images/switch.png" alt="">
						</el-button>
						<el-date-picker 
							v-show="datePickerType == 'month'"
							v-model="time_month"
							type="month"
							placeholder="选择月"
							@change="handleDateChange()">
						</el-date-picker>
						<el-date-picker
							v-show="datePickerType == 'date'"
							v-model="time_date"
							type="daterange"
							range-separator="to"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="handleDateChange()">
						</el-date-picker>
					</div>
					<div>
						<el-button :type="shortcut == 1?'success':''" @click="shortcut = 1" size="mini" >最近90天</el-button>
						<el-button :type="shortcut == 2?'success':''" @click="shortcut = 2" size="mini" >最近半年</el-button>
						<el-button :type="shortcut == 3?'success':''" @click="shortcut = 3" size="mini" >最近一年</el-button>
					</div>
				</div>
				<el-tab-pane label="顾客" name="customer">
					<account-tab></account-tab>
				</el-tab-pane>
				<el-tab-pane label="我的" name="my">
					<account-tab></account-tab>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import commonHeader from '../../components/header.vue'
import accountTab from './tab.vue'
import axios from '../../service/axios.js'
export default {
	components:{
		commonHeader:commonHeader,
		accountTab:accountTab
	},
	data(){
		return {
			balanceAvailable:null,
			activeName:'customer',
			datePickerType:'month',
			time_month:new Date(),
			time_date:[new Date(),new Date()],
			shortcut:null,
		}
	},
	computed:{
	},
	watch:{
		shortcut:function(newVal,oldVal){
			if (newVal != null) {
				this.time_month = null
				this.time_date = []
			}
		},
	},
	mounted(){
		this.getUserAccount()
	},
	methods:{
		//获取余额
		getUserAccount(){
			axios.get('/userOperation/getUserAccount.do',{
				params:{
					userType:2
				},
				session:true
			}).then(({data}) =>{
				this.balanceAvailable = data.userAccount.balanceAvailable
			})
		},
		handleDateChange(){
			//改变时重置shortcut
			this.shortcut = null
		},

	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.index{
	width: 1000px;
	margin: 50px auto ;
	h1{
		font-size: 18px;
		font-weight: bold;
		margin-top: 50px;
	}
	.balance{
		text-align: center;
		font-size: 18px;
		margin-top: 20px;
	}
	.withdraw_btn{
		margin-top: 60px;
		width: 360px;
	}
	.index_tab{
		margin-top: 20px;
		.el-tab-pane{
			padding: 0 30px
		}
	}
	.details_title{
		@extend %flex_justify;
	}

	.filter_option{
		@extend %flex_justify;
		margin-bottom: 10px;
		.date_filter{
			display: flex;
			align-items:center;
			.el-input__inner{
				height: 40px;
			}
			.el-range-separator{
				padding: 0;
			}
		}
		.switch_filter{
			margin-right: 10px;
			span{
				display: flex;
				justify-contetn:space-around;
				align-items:center;
			}
			img{
				width: 14px;
    			margin-left: 5px;
			}
		}
	}



}
</style>
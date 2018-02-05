<template>
	<div>
		<common-header></common-header>
		<div class="account">
			<h1>管理银行账号</h1>
			<p class="account_tips">我们会保证您的银行-账号信息安全，不会把您的信息透露给其他人</p>
			<ul class="account_list">
				<li v-cloak v-for="(item,index) in accountList" :key="index">
					<p class="bank_name">{{item.bankName}}</p>
					<p class="card_info">{{item.fsName}}</p>
					<el-button class="delete_account" size="small" type="danger" @click.prevent="deleteAccount(item)">Delete</el-button>
				</li>
				<li @click="getIavToken" class="add_account">
					<i class="el-icon-plus"></i>
				</li>
			</ul>
			<el-dialog
			  title="添加银行账号"
			  :visible.sync="dialogVisible"
			  width="900px"
			  :before-close="handleClose">
			  <iframe class="iav_container" v-if="iavToken":src="'http://dwolla.ecard/dwolla_iav.html?t='+iavToken" frameborder="0"></iframe>
			</el-dialog>
			
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
			iavToken:'',
			dialogVisible:false,
			accountList:[]
		}
	},
	mounted(){
		let _this = this
		window.addEventListener('message',function(e){
			//console.log(e)
			if (e.data === 'success') {
				_this.dialogVisible = false
				_this.$message({
					message: '绑卡成功！',
					type: 'success'
				})
				_this.getBankAccount()
			}else if(e.data === 'error'){
				_this.dialogVisible = false
				_this.$message.error('网络错误，请刷新重试')
			}
		})
		this.getBankAccount()
	},
	methods:{
		getBankAccount(){
			axios.get('/userOperation/getUserFundingSource.do',{
				session:true,
				loadingContainer:'.account_list'
			}).then((res)=>{
				let data = res.data
				this.accountList = data
			})
		},
		getIavToken(){
			axios.get('/userOperation/getIAVToken',{
				session:true	
			}).then((data)=>{
				if (data.code == 200) {
					this.iavToken = data.data
					this.dialogVisible = true
				}else if(data.code == 410){
			        this.$confirm('登录状态已失效, 请重新登录', '提示', {
			          confirmButtonText: 'OK',
			          cancelButtonText: 'Cancel',
			          type: 'warning'
			        }).then(() => {
			          	this.$router.push('/login')
						return	
			        }).catch(() => {
			          console.log('cancel')         
			        })
				}
			})
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {})
		},
		deleteAccount(item){
	        this.$confirm('确定删除该银行卡吗?', '提示', {
	          confirmButtonText: 'OK',
	          cancelButtonText: 'Cancel',
	          type: 'warning'
	        }).then(() => {
	        	let formData = new FormData()
	        	formData.append('fsId',item.fsId)
	        	formData.append('fsType',item.fsType)
	        	axios.post('/userOperation/removeUserFundingSource.do',formData,{
	        		session:true
	        	}).then(()=>{
					this.$message({
						message: '删除成功！',
						type: 'success'
					})
	        		this.getBankAccount()
	        	}, ()=>{

	        	})
	          	let index = this.accountList.indexOf(item)
				if (index !== -1) {
					this.accountList.splice(index, 1)
				}
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
.account{
	width: 800px;
	margin: 30px auto 0;
	h1{
		font-size: 18px;
		font-weight: bold;
		margin-top: 50px;
	}
	.account_tips{
		font-size: 14px;
		margin: 10px 0;
	}
	.iav_container{
		border: 1px solid #ccc;
		width: 800px;
		height: 600px;
		margin: 0 auto;
		border-radius: 10px;
		display: block;
	}
	.account_list{
		width: 100%;
		display: flex;
		flex-wrap:wrap;
		//justify-content:space-between;
		margin-top:40px;
		.bank_name{
			font-size: 18px;
			color: $blue;
		}
		.card_info{
			color: #908c8c
		}
		li{
			margin-right: 25px;
			width: 30%;
			border: 1px solid #ccc;
			border-radius:4px;
			height: 140px;
			display: flex;
			flex-direction:column;
			justify-content:space-between;
			padding-top: 20px;
			transition:ease all .3s;
			margin-bottom: 20px;
			overflow: hidden;
			&:hover{
				box-shadow: 0 0 10px 0px rgba(0,0,0, .3)
			}
			p{
				text-align: center;
			}
			.delete_account{
				border-radius:0px;
			}
		}
		.add_account{
			padding-top: 0;
			justify-content:center;
			cursor: pointer;
			i{			
			    font-size: 70px;
			    color: #908e8e;
			    text-align: center;
			}
		}
	}
}
</style>
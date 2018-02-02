<template>
	<div>
		<common-header></common-header>
		<div class="account">
			<h1>管理银行账号</h1>
			<p class="account_tips">我们会保证您的银行-账号信息安全，不会把您的信息透露给其他人</p>
			<ul class="account_list">
				<li v-for="(item,index) in accountList" :key="index">
					<p>{{item.bank}}</p>
					<p>{{item.cardNumber}}</p>
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
			accountList:[{
				bank:'Bank of America',
				cardNumber:'****3210'
			},{
				bank:'Bank of America',
				cardNumber:'****3210'
			}]
		}
	},
	computed:{
		seesion:function(){
			return this.$store.state.user_info.session
		}
	},
	mounted(){
		window.addEventListener('message',function(e){
			//console.log(e)
			if (e.data === 'success') {
				this.$message({
					message: '绑卡成功！',
					type: 'success'
				});
				this.success = ''
			}else if(e.data === 'error'){
				this.$message.error('网络错误，请刷新重试')
			}
		})
	},
	methods:{
		getIavToken(){
			axios.get('/userOperation/getIAVToken',{
				headers:{
					s:this.seesion
				}
			}).then(({data})=>{
				if (data.code == 200) {
					this.iavToken = data.data
					this.dialogVisible = true
				}else if(data.code == 410){
					this.$alert()
					this.$router.push('/login')
				}
			})
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		deleteAccount(item){
			
	        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          	let index = this.accountList.indexOf(item)
				if (index !== -1) {
					this.accountList.splice(index, 1)
				}
				return	
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
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
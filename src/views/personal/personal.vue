<template>
	<div>
		<common-header></common-header>
		<div class="personal">
			<h1>基本信息</h1>
			<el-upload class="avatar-uploader" :auto-upload="true" :action="baseUrl+'/file/avatar/upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleImgFail" :before-upload="beforeAvatarUpload">
				<img v-if="avatar" :src="avatar" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<section v-for="(item,index) in addressInfo" class="address_list">
				<div class="address_title">
					<h2>{{'地址信息'+(index+1)}}</h2>
					<el-button  size="mini" @click="showFormPop(index)">编辑</el-button>
					<el-button v-if="index != 0" type="danger" size="mini" @click="deleteAddressInfo(index)">删除</el-button>
				</div>
				<ul>
					<li class="list_item">
						<span class="item_title">地址:</span>
						<div class="item_content">
							{{`${item.addressLine1} ${item.addressLine2}, ${item.city}, ${item.state}, ${item.zipCode}`}}
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">电话:</span>
						<div class="item_content">
							{{item.telPhone}}
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">营业时间1:</span>
						<div class="item_content">
							09:00 - 18:00
						</div>
					</li>
				</ul>
				<el-button class="add_address_btn" type="primary" size="mini" @click="showFormPop()">新增地址信息</el-button>
			</section>

			<h1>安全隐私</h1>
			<section class="setting_list">
				<div>
					<h2>记住我的账号</h2>
					<p>在登录前记住您的账号，这样对您比较方便</p>
				</div>
				<div class="setting_btn">
					<setting-button :value="isRemember" @click.native="rememberMe" ></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>设置6位数字密码</h2>
					<p>或支付提现超过$500前先输入数字密码，让您的资金更安全</p>
				</div>
				<div class="setting_btn">
					<setting-button @click.native="passwordRequired" v-model="isPassword"></setting-button>
				</div>
			</section>
			<h1>提示设置</h1>
			<section class="setting_list">
				<div>
					<h2>当您支付时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="payRemind" @click.native="payRemind = !payRemind"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当您充值时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="rechargeRemind" @click.native="rechargeRemind = !rechargeRemind"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当您提现时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="withdrawRemind" @click.native="withdrawRemind = !withdrawRemind"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当现金返还时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="cashbackRemind" @click.native="cashbackRemind = !cashbackRemind"></setting-button>
				</div>
			</section>
		</div>
		<edit-form :visible.sync="showEditForm" :stateList="stateList" :formContent="formContent" @submitCallBack="handleSubmit"></edit-form>
	</div>
</template>
<script>
import commonHeader from '../../components/header.vue'
import settingButton from './settingButton.vue'
import editForm from './editForm.vue'
import axios from '../../service/axios.js'
export default {
	data(){
		return {
			addressInfo:[{
				telPhone: '123',
				addressLine1: '12-54',
				addressLine2: 'Estates Lane',
				city:'Bayside',
				state:'NY',
				zipCode:'11360',
				bussinessHours:[{
					startTime:'00:00',
					endTime:'23:00',
					startWeek:1,
					endWeek:5
				},{
					startTime:'00:00',
					endTime:'23:00',
					startWeek:1,
					endWeek:5
				},{
					startTime:'00:00',
					endTime:'23:00',
					startWeek:1,
					endWeek:5
				}]
			}],
			avatar:'',
			baseUrl: window.location.hostname == 'localhost' || window.location.hostname == 'merchant.ecard'?'http://api.ecard':'https://api.ecard.life',
			isRemember:true,
			isPassword:true,
			payRemind:true,
			rechargeRemind:true,
			withdrawRemind:true,
			cashbackRemind:true,
			showEditForm:false,
			//州/省列表
			stateList:[],
			formContent:{}
		}
	},
	components:{
		commonHeader:commonHeader,
		settingButton:settingButton,
		editForm:editForm
	},
	watch:{

	},
	mounted(){
		this.getUserSetting()
		//州/省查询
		axios.get('/info/state/list.do',{
			params:{
				stateName:''
			},
			showLoading:false
		}).then((data)=>{
			console.log(data)
			this.stateList = data.data
		})
	},
	methods:{
		//上传头像
		handleAvatarSuccess(res, file) {
			this.avatar = URL.createObjectURL(file.raw)
			console.log(res)
			this.avatar = res.data.imageUrl
			this.uploadLoading.close()
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isPNG = file.type === 'image/png'
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isJPG && !isPNG) {
				this.$message.error('Only upload jpg / png files')
				return false
			}
			if (!isLt2M) {
				this.$message.error('Image size can not exceed 2MB')
				return false
			}
			this.uploadLoading = this.$loading({
				target:document.querySelector('.avatar-uploader .el-upload')
			})
			return (isPNG || isJPG) && isLt2M;
		},
		handleImgFail(err, file, fileList){
			this.$message.error(err)
			this.uploadLoading.close()
		},
		//编辑或新增地址信息
		showFormPop(i){
			if (i != undefined) {
				this.formContent = this.addressInfo[i]
			}else{
				this.formContent = {}
			}
			//this.showEditForm = true
			this.$nextTick(()=>{
				this.showEditForm = true
			})
		},
		//删除地址信息
		deleteAddressInfo(i){
	        this.$confirm('确定删除该地址信息吗?', '提示', {
	          confirmButtonText: 'OK',
	          cancelButtonText: 'Cancel',
	          type: 'warning'
	        }).then(() => {
	          	this.addressInfo.splice(i, 1)
				return	
	        }).catch(() => {
	          console.log('cancel')         
	        })
		},
		handleSubmit(res){
			console.log(res)
		},
		getAddressInfo(){
			axios.get('merchantOperation/queryMerchantStoreByUserId.do',{
				seesion:true
			})
		},
		//获取个人设置信息
		getUserSetting(){
			axios.get('/userOperation/getUserSetting.do',{
				session:true,
				showLoading:false
			}).then( res=>{
				console.log(res)
				let data = res.data
				this.withdrawRemind = data.withdrawNotify?true:false
				this.rechargeRemind = data.chargeNotify?true:false
				this.payRemind = data.payNotify?true:false
				this.cashbackRemind = data.cashBackNotify?true:false
				this.isPassword = data.userPaySecret?true:false
			}, ()=>{

			})
		},
		rememberMe(){
			this.rememberMe = !this.rememberMe
			this.$store.dispatch('rememberMe',this.rememberMe)
		},
		passwordPop(){
			this.$prompt('请输入密码', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^\d{6}$/,
				inputType:'password',
				inputErrorMessage: '请输入正确的6位数字密码'
			}).then(({ value }) => {
				/*this.$message({
				type: 'success',
				message: '你的邮箱是: ' + value
				})*/
				this.isPassword = false
			}).catch(() => {
				/*this.$message({
				type: 'info',
				message: '取消输入'
				})   */  
			})
		},
		passwordRequired(){
			if (this.isPassword) {
				this.passwordPop()
			}else{
				this.isPassword = true
			}
		},
		updateUserSetting(key,value){
			let params = {}
			params[key] = value?1:0
			console.log(params)
			let formData = new FormData()
			formData.append('rememberMe',1)
			axios.post('/userOperation/updateUserSetting.do',formData,{
				session:true
			}).then(data =>{

			}, ()=>{

			})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.personal{
	width: 800px;
	margin: 30px auto 0;
	h1{
		font-size: 18px;
		font-weight: bold;
		margin-top: 50px;
	}
	.avatar-uploader{
		position: relative;
		width: 100%;
		text-align: center;
		.el-upload {
			margin: 0 auto ;
			border: 1px dashed #848181;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			border-radius: 100%;
		}
		.el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 100px;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}
		.avatar {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.setting_list{
		margin:30px 0; 
		@extend %flex_justify;
		h2{
			font-weight:normal;
			font-size:16px;
		}
		p{
			font-size:14px;
		}
	}
	.address_list{
		margin:30px 0; 
		border-bottom: 1px dashed #ccc;
		.address_title{
			display: flex;
			align-items:center;
			h2{
				width: 150px;
			}
		}
		h2{
			font-weight:normal;
			font-size:16px;
			margin-right:20px;
		}
		ul{
			padding-left:30px;
		}
		.item_title{
			display:block;
			width:120px;
			margin-right:20px;

		}
		.list_item{
			display:flex;
			align-items:center;
			margin:15px 0;
		}
		.add_address_btn{
			margin:0 0 20px 25px;
		}
	}
	
}
</style>
<template>
	<div>
		<common-header></common-header>
		<div class="personal">
			<h1>基本信息</h1>
			<el-upload class="avatar-uploader" :auto-upload="true" :action="baseUrl+'/file/avatar/upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleImgFail" :before-upload="beforeAvatarUpload">
				<img  v-if="newAvatar"  :src="newAvatar" class="avatar">
				<img v-else :src="oldAvatar" class="avatar">
				<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
			</el-upload>
			<div v-if="newAvatar" class="upload_btn">
				<el-button @click.native="comfirmUpload" size="small" type="primary">确定上传</el-button>
				<el-button @click.native="newAvatar = ''" size="small">取消</el-button>
			</div>
			<section v-for="(item,index) in addressInfo" class="address_list">
				<div class="address_title">
					<h2>{{'地址信息'+(index+1)}}</h2>
					<el-button  size="mini" @click="showFormPop(index)">编辑</el-button>
					<el-button v-if="index != 0" type="danger" size="mini" @click="deleteAddressInfo(item.userStoreProfile.id)">删除</el-button>
				</div>
				<ul>
					<li class="list_item">
						<span class="item_title">地址:</span>
						<div class="item_content">
							{{item.userStoreProfile.fullAddress}}
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">电话:</span>
						<div class="item_content">
							{{item.userStoreProfile.contact}}
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">营业时间1:</span>
						<div class="item_content">
							<ul>
								<li v-if="time" v-for="(time ,index) in item.openDayList" >
									<span class="item_week">
										{{time.week | weekFilters}}
									</span>
									{{`${time.am}am - ${time.pm}pm`}}
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</section>
			<el-button class="add_address_btn" type="primary" size="mini" @click="showFormPop()">新增地址信息</el-button>

			<h1>安全隐私</h1>
			<section class="setting_list">
				<div>
					<h2>记住我的账号</h2>
					<p>在登录前记住您的账号，这样对您比较方便</p>
				</div>
				<div class="setting_btn">
					<setting-button :value="isRemember" @click.native="rememberLogin" ></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>设置6位数字密码</h2>
					<p>支付或提现超过$500前先输入数字密码，让您的资金更安全</p>
				</div>
				<div class="setting_btn">
					<setting-button @click.native="passwordPop" v-model="isPassword"></setting-button>
				</div>
			</section>
			<h1>提示设置</h1>
			<section class="setting_list">
				<div>
					<h2>当您收款时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="receiveRemind" @click.native="updateUserSetting('receiveRemind')"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当您提现时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="withdrawRemind" @click.native="updateUserSetting('withdrawRemind')"></setting-button>
				</div>
			</section>
		</div>
		<edit-form v-if="showEditForm" :visible.sync="showEditForm" :stateList="stateList" :formContent="formContent" @submitCallBack="handleSubmit"></edit-form>
	</div>
</template>
<script>
import commonHeader from '../../components/header.vue'
import settingButton from './settingButton.vue'
import editForm from './editForm.vue'
import axios from '../../service/axios.js'
import Cookies from 'js-cookie'
import md5 from 'js-md5'
export default {
	filters:{
		weekFilters:function(val){
			let newVal
			switch (val){
				case 1:newVal = 'Monday'
				break;
				case 2:newVal = 'TuesDay'
				break;
				case 3:newVal = 'Wednesday'
				break;
				case 4:newVal = 'Thursday'
				break;
				case 5:newVal = 'Friday'
				break;
				case 6:newVal = 'Saturday'
				break;
				case 7:newVal = 'Sunday'
				break;
			}
			return newVal
		}
	},
	data(){
		return {
			addressInfo:[],
			newAvatar:'',
			baseUrl: window.location.hostname == 'localhost' || window.location.hostname == 'merchant.ecard'?'http://api.ecard':'https://api.ecard.life',
			isRemember:Cookies.getJSON('login').isRemember,
			isPassword:true,
			receiveRemind:true,
			rechargeRemind:true,
			withdrawRemind:true,
			cashbackRemind:true,
			showEditForm:false,
			//州/省列表
			stateList:[],
			formContent:{}
		}
	},
	computed:{
		oldAvatar:function () {
			return this.$store.state.user_account.avatarUrl 
		}
	},
	watch:{
		newAvatar:function(){

		}
	},	
	components:{
		commonHeader:commonHeader,
		settingButton:settingButton,
		editForm:editForm
	},
	mounted(){
		this.getAddressInfo()
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
		comfirmUpload(){
			let url = new FormData()
			url.append('avatarUrl',this.newAvatar)
			axios.post('/userOperation/updateUserAvatarUrl.do',url,{
				session:true
			}).then(data =>{
				if (data.code == 200) {
					this.$store.dispatch('setAvatar',this.newAvatar)
					this.$message.success('修改头像成功')
					this.newAvatar = ''
				}else{
					this.$message.error(data.msg)
				}
			})
		},
		cancelUpload(){
			this.newAvatar = ''
		},
		handleAvatarSuccess(res, file) {
			console.log(res)
			this.newAvatar = res.data.imageUrl
			//this.$store.dispatch('setAvatar',res.data.imageUrl)
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
				this.formContent = ''
			}
			//this.showEditForm = true
			this.$nextTick(()=>{
				this.showEditForm = true
			})
		},
		//获取地址信息
		getAddressInfo(){
			axios.get('merchantOperation/queryMerchantStoreByUserId.do',{
				session:true				
			}).then(data=>{
				this.addressInfo = data.data.reverse()
			})
		},
		//删除地址信息
		deleteAddressInfo(id){
	        this.$confirm('确定删除该地址信息吗?', '提示', {
	          confirmButtonText: 'OK',
	          cancelButtonText: 'Cancel',
	          type: 'warning'
	        }).then(() => {
	        	let params = new FormData()
	        	params.append('id',id)
	        	axios.post('merchantOperation/removeMerchantStoreById.do',params,{
	        		session:true
	        	}).then(data=>{
	        		if (data.code == 200) {
	        			this.getAddressInfo()
	        		}
	        	})
	          	//this.addressInfo.splice(i, 1)
	        }).catch(() => {
	          console.log('cancel')         
	        })
		},
		//编辑或新增成功
		handleSubmit(res){
			console.log(res)
			this.$message.success('提交成功')
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
				this.receiveRemind = data.receiveNotify?true:false
				this.isPassword = data.usePaySecret?true:false
			}, ()=>{

			})
		},
		rememberLogin(){
			this.isRemember = !this.isRemember
			this.$store.dispatch('rememberMe',this.isRemember)
		},
		passwordPop(){
			this.$prompt('请输入密码', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^\d{6}$/,
				inputType:'password',
				inputErrorMessage: '请输入正确的6位数字密码'
			}).then(({ value }) => {
				axios.post('/userOperation/updateUserSetting.do',{
					paySecret:md5(value).toLowerCase(),
					usePaySecret:!this.isPassword?1:0
				},{
					session:true,
				}).then(data =>{
					if (data.code == 200) {
						this.isPassword = !this.isPassword
					}else{
						this.$message.error(data.msg)
					}
				})
				
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
		updateUserSetting(type){
			let params = {}
			switch(type){
				case 'receiveRemind':
				this.receiveRemind = !this.receiveRemind
				params = {
					receiveNotify:this.receiveRemind?1:0
				}
				break;
				case 'withdrawRemind':
				this.withdrawRemind = !this.withdrawRemind
				params = {
					withdrawNotify:this.withdrawRemind?1:0
				}
				break;
			}
			axios.post('/userOperation/updateUserSetting.do',params,{
				session:true,
				showLoading:false
			}).then(data =>{
				if (data.code != 200) {
					this.$message.error(data.msg)
				}
			})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.personal{
	width: 1000px;
	margin: 50px auto ;
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
	.upload_btn{
		display: flex;
		align-items:cneter;
		justify-content:center;
		margin-top: 15px;
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
			//align-items:center;
			margin:15px 0;
			ul{
				padding:0
			}
			li{
				display: flex;
				align-items:center;
				margin-bottom: 10px;
			}
			.item_week{
				width:90px;
				margin-right: 15px;
			}
		}
		.add_address_btn{
			margin:0 0 20px 25px;
		}
	}
	
}
</style>
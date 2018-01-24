<template>
	<div>
		<common-header></common-header>
		<div class="personal">
			<h1>基本信息</h1>
			<el-upload class="avatar-uploader" :auto-upload="true" :action="baseUrl+'/file/avatar/upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleImgFail" :before-upload="beforeAvatarUpload">
				<img v-if="avatar" :src="avatar" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<section class="address_list">
				<div class="address_title">
					<h2>地址信息1</h2>
					<el-button type="primary" size="mini" @click="editForm = true">编辑</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</div>
				<ul>
					<li class="list_item">
						<span class="item_title">地址:</span>
						<div class="item_content">
							12-54 Estates Lane,Bayside, NY, 11360
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">电话1:</span>
						<div class="item_content">
							+1(929)426-2850
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">电话2:</span>
						<div class="item_content">
							+1(929)426-2850
						</div>
					</li>
					<li class="list_item">
						<span class="item_title">营业时间1:</span>
						<div class="item_content">
							09:00 - 18:00
						</div>
					</li>
				</ul>
			</section>
			<h1>安全隐私</h1>
			<section class="setting_list">
				<div>
					<h2>记住我的账号</h2>
					<p>在登录前记住您的账号，这样对您比较方便</p>
				</div>
				<div class="setting_btn">
					<setting-button v-model="isRemember"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>设置6位数字密码</h2>
					<p>或支付提现超过$500时需要指纹验证，让您的的资金更安全</p>
				</div>
				<div class="setting_btn">
					<setting-button v-model="isPassword"></setting-button>
				</div>
			</section>
			<h1>提示设置</h1>
			<section class="setting_list">
				<div>
					<h2>当您支付时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="payRemind"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当您充值时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="rechargeRemind"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当您提现时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="withdrawRemind"></setting-button>
				</div>
			</section>
			<section class="setting_list">
				<div>
					<h2>当现金返还时发送提醒</h2>
				</div>
				<div class="setting_btn">
					<setting-button v-model="cashbackRemind"></setting-button>
				</div>
			</section>
		</div>
		<edit-form :visible.sync="showEditForm"></edit-form>
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
			avatar:'',
			baseUrl: window.location.hostname == 'localhost' || window.location.hostname == 'merchant.ecard'?'http://api.ecard':'https://api.ecard.life',
			isRemember:true,
			isPassword:false,
			payRemind:true,
			rechargeRemind:true,
			withdrawRemind:true,
			cashbackRemind:true,
			showEditForm:false
		}
	},
	components:{
		commonHeader:commonHeader,
		settingButton:settingButton,
		editForm:editForm
	},
	created(){
		//this.getUser()
	},
	methods:{
		//上传头像
		handleAvatarSuccess(res, file) {
			this.avatar = URL.createObjectURL(file.raw)
			console.log(res)
			this.avatar = res.data
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
		//获取信息
		getUser(){
			axios.get('/user/get.do',{
				params:{
					userId:this.$store.state.user_info.userId
				}
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
		.address_title{
			display: flex;
			align-items:center;
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

	}
	
}
</style>
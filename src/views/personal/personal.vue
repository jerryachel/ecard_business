<template>
	<div>
		<common-header></common-header>
		<div class="personal">
			<h1>基本信息</h1>
			<el-upload class="avatar-uploader" :auto-upload="true" :action="baseUrl+'/file/avatar/upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleImgFail" :before-upload="beforeAvatarUpload">
				<img v-if="avatar" :src="avatar" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<section class="setting_list">
				<h2></h2>
			</section>
		</div>
	</div>
</template>
<script>
import commonHeader from '../../components/header.vue'
import axios from '../../service/axios.js'
export default {
	data(){
		return {
			avatar:'',
			baseUrl: window.location.hostname == 'localhost' || window.location.hostname == 'merchant.ecard'?'http://api.ecard':'https://api.ecard.life',
		}
	},
	components:{
		commonHeader:commonHeader
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
	width: 1000px;
	margin: 30px auto 0;
	h1{
		font-size: 20px;
		font-weight: 500;
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
	
}
</style>
<template>
	<div class="register">
		<login-nav></login-nav>
		<div class="register_form">
			<h3>注册</h3>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form_container demo-ruleForm">
				<transition name="page_switch">
					<div v-show="curPage == 1" class="page1 page_content">
						<div class="avatar_tips">
							图片会展示在客户端<br>
							点击上传图片作为商店头像
						</div>
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						
						<el-form-item label-width="220px" label="电子邮件"  prop="email">
							<div class="email">
								<el-input v-model="ruleForm.email"></el-input>
								<el-button  type="primary" >获取验证码</el-button>
							</div>
						</el-form-item>
						<el-form-item label-width="220px" label="输入验证码" prop="msgCode">
							<el-input v-model="ruleForm.msgCode"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="公司类型" class="wrap_input" prop="company_type">
							<el-input v-model="ruleForm.company_type"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="公司名称（英文）" prop="enName">
							<el-input v-model="ruleForm.enName"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="公司名称（中文）" prop="cnName">
							<el-input v-model="ruleForm.cnName"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="姓（公司法人的姓）" prop="lastName">
							<el-input v-model="ruleForm.lastName"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="名（公司法人的名）" prop="firstName">
							<el-input v-model="ruleForm.firstName"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="中间名（公司法人的中间名）" prop="midName">
							<el-input v-model="ruleForm.midName"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="公司联系电话号码*" prop="telPhone">
							<el-input v-model="ruleForm.telPhone"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="密码" class="wrap_input" prop="password">
							<el-input v-model="ruleForm.password"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="地址栏1（公司地址）" prop="address1">
							<el-input v-model="ruleForm.address1"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="地址栏2（公司地址）" prop="address2">
							<el-input v-model="ruleForm.address2"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="市" prop="city">
							<el-input v-model="ruleForm.city"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="州/省" prop="state">
							<el-input v-model="ruleForm.state"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="邮政编码" prop="zipCode">
							<el-input v-model="ruleForm.zipCode"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="邀请码（如无则可留空）" prop="cnName">
							<el-input v-model="ruleForm.cnName"></el-input>
						</el-form-item>
						<div class="upload_drag">
							<p>上传营业执照</p>
							<el-upload  drag action="https://jsonplaceholder.typicode.com/posts/">
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
								</div>
								<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
						</div>
					</div>
				</transition>
				
				<div class="page_btn">
					<el-button @click="curPage--">上一页</el-button>
					<el-button type="primary" @click="curPage++" >下一页</el-button>
				</div>



				<el-form-item class="submit">
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import loginNav from './header.vue'
import { Form,FormItem,Button,Input,Col,TimePicker,DatePicker,Upload} from 'element-ui'
export default {
	components:{
		loginNav:loginNav,
		elForm:Form,
		elFormItem:FormItem,
		elButton:Button,
		elInput:Input,
		elCol:Col,
		elTimePicker:TimePicker,
		elDatePicker:DatePicker,
		elUpload:Upload
	},
	data() {
		return {
			imageUrl: '',
			ruleForm: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				email:[
					{ required: true, message: '请输入邮件地址', trigger: 'blur' }
				],
				msgCode:[
					{ required: true, message: '请输入邮件验证码', trigger: 'blur' }
				],
				company_type:[{
					required: false,trigger: 'blur'
				}],
				enName:[
					{ required: true, message: '请输入公司名称（英文)', trigger: 'blur' }
				],
				cnName:[
					{ required: true, message: '请输入公司名称（中文)', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			},
			curPage:1
		};
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isPNG = file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG && !isPNG) {
				this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../assets/css/index.scss';
.el-button--primary{
	background-color: $blue;
    border-color: $blue;
    &:focus,&:hover{
		background-color: $blue_hover;
    	border-color: $blue_hover;
    }
}
.register{
	overflow-x:hidden;
	.avatar_tips{
		transform:translate(342px,35px);
   		color: #606266;
	}
	.avatar-uploader{
		position: relative;
		width: 100%;
		.el-upload {
			margin: 0 0 20px 220px ;
			border: 1px dashed #d9d9d9;
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
	.register_form{
		position: relative;
		width: 1000px;
		margin: 50px auto 0 auto;
		h3{
			text-align: center;
			font-weight: normal;
			color: $blue;
			font-size: 28px;
			margin-bottom: 50px;
		}
		
	}
	.page_content{
		display: flex;
		flex-wrap:wrap;
		justify-content:space-between;
		.el-form-item{
			width: 47%;
		}
		.email{
			display: flex;
			.el-button{
				margin-left: 10px;
				padding: 12px 10px;
			}
		}
		.wrap_input{
			width: 100%;
			.el-input{
				width: 250px;
			}
		}
		.upload_drag{
			margin-left: 125px;
			display: flex;
			align-items:center;
			width: 100%;
			p{
				margin-right: 12px;
				color: #606266;
			}
		}
	}
	.submit{
		width: 100%;
		display: flex;
		justify-content:center;
		margin-top: 50px;
		.el-form-item__content{
		    transform: translate(-50px,0);
		}
	}
	.page_btn{
		margin-top: 40px;
		width: 100%;
		text-align: center;
	}
	.page_switch-leave-active{
		animation: slideOutLeft .8s  both 1;
	}
	.page_switch-enter-active{
		animation: slideInRight .8s  both 1;
	}
}
</style>

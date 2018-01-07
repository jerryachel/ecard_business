<template>
	<div class="register">
		<login-nav></login-nav>
		<div class="register_form">
			<h3>注册</h3>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form_container demo-ruleForm">
				<el-form-item label="电子邮件"  prop="name">
					<div class="email">
						<el-input v-model="ruleForm.name"></el-input>
						<el-button  type="primary" >获取验证码</el-button>
					</div>
				</el-form-item>
				<el-form-item label="输入验证码" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="公司类型" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
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
import { Form,FormItem,Button,Input,Col,TimePicker,DatePicker } from 'element-ui'
export default {
	components:{
		loginNav:loginNav,
		elForm:Form,
		elFormItem:FormItem,
		elButton:Button,
		elInput:Input,
		elCol:Col,
		elTimePicker:TimePicker,
		elDatePicker:DatePicker
	},
	data() {
		return {
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
			}
		};
	},
	methods: {
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
	.register_form{
		h3{
			text-align: center;
			font-weight: normal;
			color: $blue;
			font-size: 28px;
			margin-bottom: 50px;
		}
		width: 800px;
		margin: 50px auto 0 auto;
	}
	.form_container{
		display: flex;
		flex-wrap:wrap;
		justify-content:space-between;
		.el-form-item{
			width: 47%;
		}
		.email{
			display: flex;
			.el-button{
				//width: 100px;
				margin-left: 10px;
				padding: 12px 10px;
			}
		}
		.submit{
			width: 100%;
			display: flex;
			justify-content:center;
			.el-form-item__content{
			    transform: translate(-50px,0);
			}
		}
	}
}
</style>

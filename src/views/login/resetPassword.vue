<template>
	<div class="reset">
		<login-nav></login-nav>
		<el-form :model="resetForm" :rules="rules" ref="loginForm" label-width="100px" class="login_form">
			<el-form-item label-width="0" prop="email">
				<el-input placeholder="Email" v-model="resetForm.email" clearable>
				</el-input>
			</el-form-item>
			<el-form-item label-width="0" prop="code">
				<el-input type="password" class="forget_password" placeholder="Code" v-model="resetForm.code" clearable>
					<template  slot="append">
						<el-button size="medium" :disabled="sendCodeText !== 'Send code'" class="send_code_btn" @click="sendCode"  type="primary" >{{sendCodeText}}</el-button>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label-width="0" prop="password">
				<el-input type="password" class="forget_password" placeholder="Password" v-model="resetForm.password" clearable>
				</el-input>
			</el-form-item>
			<div class="to_register"></div>
			<el-button class="login_btn" @click="submit" type="primary">重置密码</el-button>
		</el-form>
	</div>
</template>

<script>
import loginNav from './header.vue'
export default {
	data () {
		let validateEmail = (rule, value, callback) => {
			let regu = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
			if (value === '' || value == undefined) {
				callback(new Error('Please enter email'))
				return false
			} else if(!regu.test(value)){
				callback(new Error('Please input the correct email'))
			} else {
				callback();
			}
		}
		return {
			sendCodeText:'Send code',
			resetForm:{
				email: '',
				password:'',
				code:'',
			},
			rules:{
				email:[
					{ required: true,validator: validateEmail, trigger: 'blur' }
				],
				password:[
					{
						required: true,trigger: 'blur',message:'Please enter password'
					}
				],
				code:[
					{
						required: true,trigger: 'blur',message:'Please enter code'
					}
				]
			}

		}
	},
	components:{
		loginNav:loginNav
	},
	methods:{
		sendCode(){
			//校验邮箱格式
			let regu = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
			if(!regu.test(this.resetForm.email)){
				this.$message.error('Please input the correct email')
				return false
			}
			//发送邮件后倒计时
			let second = 120
			let _this = this
			function countDown(){
				let timer = setTimeout(()=>{
					if (second == 0) {
						_this.sendCodeText = 'Send code'
						clearTimeout(timer)
					}else{
						_this.sendCodeText = second + 's'
						second -- 
						countDown()
					}
				},1000)
			}
			countDown()
		},
		submit(){
			this.$refs['resetForm'].validate((valid) => {
				if (valid) {
					
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		reset(){
			axios.post()
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.reset{
	.login_form{
		width: 500px;
		margin: 150px auto 0 auto;
		font-size: 18px;
		.el-form-item{
			width: 400px;
			margin:30px auto;
			display: block;
			font-size: 18px;
			input{
				border: none;
				border-radius: 0;
				border-bottom: 1px solid #dcdfe6;
				font-size: 18px;
			}
			.el-form-item__error{
				font-size: 14px;
				padding-left:14px;
			}
			.el-input__inner{
				background-color:#F2F6FA;
			}
			.el-button--medium{
				padding:10px 0;
			}
			
			
		}
		.forget_password{
			position: relative;
			.el-input-group__append{
				position: absolute;
				right:0;
				top: 50%;
				transform:translate(0,-50%);
				background:none;
				border: none;
				padding:0;
				width: auto;
				.el-button--primary{
				  	background-color: $blue;
				    border-color: $blue;
					color:#fff;
				    &:focus,&:hover{
				    	background-color: $blue_hover;
				      border-color: $blue_hover;
				    }
				}
				.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
				    color: #fff;
				    background-color: #a0cfff;
				    border-color: #a0cfff;
				}
			}
			a{
				color: $blue;
			}
			
		}
		.to_register{
			color: $blue;
			text-align: center;
			margin: 200px 0 100px 0;
			display: block;
		}
		.send_code_btn{
			width: 78px;
			position:absolute;
			right:18px;
			bottom:5px;

		}
		.login_btn{
			width: 100%;
			font-size: 18px;
		}
	}
}
</style>

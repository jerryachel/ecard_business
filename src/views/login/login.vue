<template>
	<div class="login">
		<login-nav></login-nav>
		<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login_form">
			<el-form-item label-width="0" prop="email">
				<el-input placeholder="Email" v-model="loginForm.email" clearable>
				</el-input>
			</el-form-item>
			<el-form-item label-width="0" prop="password">
				<el-input @keyup.native.enter="submit" type="password" class="forget_password" :placeholder="isLoginByPassword?'Password':'Code'" v-model="loginForm.password" clearable>
					<template v-if="isLoginByPassword" slot="append">
						<router-link to="/resetPassword" class="">
							忘记密码？
						</router-link>
					</template>
					<template  v-else slot="append">
						<el-button size="medium" :disabled="sendCodeText !== 'Send code'" class="send_code_btn" @click="sendCode"  type="primary" >{{sendCodeText}}</el-button>
					</template>
				</el-input>
				
			</el-form-item>
			<p v-if="isLoginByPassword" class="login_by_code" @click="isLoginByPassword = !isLoginByPassword">使用邮箱验证码登录</p>
			<p v-else class="login_by_code" @click="isLoginByPassword = !isLoginByPassword">使用密码登录</p>
			<router-link to="/register" class="to_register">新用户? 立即注册</router-link >
			<el-button class="login_btn" @click="submit" type="primary">Login</el-button>
		</el-form>
	</div>
</template>

<script>
import loginNav from './header.vue'
import axios from '../../service/axios.js'
import md5 from 'js-md5'
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
			isLoginByPassword:true,
			sendCodeText:'Send code',
			loginForm:{
				email: '',
				password:'',
			},
			rules:{
				email:[
					{ required: true,validator: validateEmail, trigger: 'blur' }
				],
				password:[
					{
						required: true,trigger: 'blur',message:'Please enter password'
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
			if(!regu.test(this.loginForm.email)){
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
			axios.get('/auth/authMail.do',{
				params:{
					email:this.loginForm.email
				},
				loadingContainer:'.send_code_btn'
			}).then((data)=>{
				console.log(data)
			})
		},
		submit(){
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					let url = this.isLoginByPassword ? '/merchantAuth/merchantLoginByEmailWithPassword.do' : '/merchantAuth/merchantLoginByEmailWithCode.do'
					let params = this.isLoginByPassword ? {
						email:this.loginForm.email,
						password:md5(this.loginForm.password).toLowerCase()
					}:{
						email:this.loginForm.email,
						code:this.loginForm.password
					}
					axios({
					    method: 'post',
					    url: url,
					    headers: {
					        'Content-type': 'multipart/form-data'
					    },
					    params: params
					}).then((data)=>{
						console.log(data)	
						if (data.code == 200) {
							let res = data.data
							this.$store.dispatch('login',res)
							this.$store.dispatch('user_account',res.session)
							this.$router.push('/')
						}else{
							this.$message.error(data.msg)
						}
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.login{
	.login_form{
		width: 500px;
		margin: 150px auto;
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
				right:0px;
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
			.el-input__inner{
				padding-right:90px;
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
		.login_btn{
			width: 100%;
			font-size: 18px;
		}
		.send_code_btn{
			width: 78px;
			position:absolute;
			right:18px;
			bottom:5px;

		}
		.login_by_code{
			text-align:center;
			color:$blue;
			cursor:pointer;
		}
	}
}
</style>

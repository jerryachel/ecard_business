<template>
	<div class="login">
		<login-nav></login-nav>
		<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login_form">
			<el-form-item label-width="0" prop="email">
				<el-input placeholder="Email" v-model="email" clearable>
				</el-input>
			</el-form-item>
			<el-form-item label-width="0" prop="password">
				<el-input type="password" class="forget_password" placeholder="Password" v-model="password" clearable>
					<template slot="append">
						<router-link to="" class="">
							忘记密码？
						</router-link>
					</template>
				</el-input>
			</el-form-item>
			<router-link to="/register" class="to_register">新用户? 立即注册</router-link >
			<el-button class="login_btn" @click="login" type="primary">Login</el-button>
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
			email: '',
			password:'',
			loginForm:{

			},
			rules:{
				email:[
					{ required: true,validator: validateEmail, trigger: 'submit' }
				],
				password:[
					{
						required: true,trigger: 'submit'
					}
				]
			}

		}
	},
	components:{
		loginNav:loginNav
	},
	methods:{
		login(){
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					
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
@import '../../assets/css/index.scss';
.login{
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
	}
}
</style>

<template>
	<div class="register">
		<login-nav></login-nav>
		<div class="register_form">
			<h3>Register</h3>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form_container demo-ruleForm">
				<transition name="page_switch">
					<div v-show="curPage == 1" class="page1 page_content">
						<div class="avatar_tips">
							Photo will be displayed on client-side<br>Click here to upload photo as merchant profile picture
						</div>
						<el-upload class="avatar-uploader" :auto-upload="true" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						
						<el-form-item label-width="220px" label="Email"  prop="email">
							<div class="email">
								<el-input v-model="ruleForm.email"></el-input>
								<el-button :disabled="sendCodeText !== 'Send code'" class="send_code_btn" @click="sendCode"  type="primary" >{{sendCodeText}}</el-button>
							</div>
						</el-form-item>
						<el-form-item label-width="220px" label="Enter code" prop="msgCode">
							<el-input v-model="ruleForm.msgCode"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="Industry type" class="wrap_input" prop="company_type">
							<el-select v-model="ruleForm.company_type" placeholder="Please select industry type">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item  label-width="220px" label="Company name (English)" prop="enName">
							<el-input v-model="ruleForm.enName"></el-input>
						</el-form-item>
						<el-form-item  label-width="220px" label="Company name (Chinese)" prop="cnName">
							<el-input v-model="ruleForm.cnName"></el-input>
						</el-form-item>
						<el-form-item class="sm_line_height" label-width="220px" label="Last name  (Owner/founder's info)" prop="lastName">
							<el-input v-model="ruleForm.lastName"></el-input>
						</el-form-item>
						<el-form-item class="sm_line_height" label-width="220px" label="First name  (Owner/founder's info)" prop="firstName">
							<el-input v-model="ruleForm.firstName"></el-input>
						</el-form-item>
						<el-form-item class="sm_line_height" label-width="220px" label="Middle name  (Owner/founder's info)" prop="midName">
							<el-input v-model="ruleForm.midName"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="Contact number" prop="telPhone">
							<el-input  v-model="ruleForm.telPhone"></el-input>
						</el-form-item>
						<el-form-item  label-width="220px" label="Password" class="wrap_input" prop="password">
							<el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
						</el-form-item>
						<el-form-item class="sm_line_height" label-width="220px" label="Address line 1* (corporate address)" prop="address1">
							<el-input v-model="ruleForm.address1"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="Address line 2" prop="address2">
							<el-input v-model="ruleForm.address2"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="City" prop="city">
							<el-input v-model="ruleForm.city"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" class="state" label="State / province" prop="state">
							<el-select v-model="ruleForm.state" placeholder="Please select state / province">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label-width="220px" label="Zip code" prop="zipCode">
							<el-input v-model="ruleForm.zipCode"></el-input>
						</el-form-item>
						<el-form-item label-width="220px" label="Invitation code" prop="inviteCode">
							<el-input v-model="ruleForm.inviteCode"></el-input>
						</el-form-item>
						<el-form-item class="cashBack sm_line_height" label-width="220px" label="Cashback percentage(at least 10%)" prop="cashBack">
							<el-input type="number" v-model="ruleForm.cashBack"></el-input> 
							%
						</el-form-item>
						<div class="upload_drag">
							<p>Upload business license</p>
							<el-upload :on-success="handlePicSuccess" :before-upload="beforePicUpload" action="https://jsonplaceholder.typicode.com/posts/">
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">Click here to upload
								</div>
								<div class="el-upload__tip" slot="tip">Only upload jpg / png files, and not more than 2Mb</div>
							</el-upload>
						</div>
						<div class="page_btn">
							<el-button v-if="curPage != 3" type="primary" @click="nextPage()" >下一步</el-button>
						</div>
					</div>
				</transition>
				<transition name="page_switch">
					<div v-show="curPage == 2" class="page2 page_content">
						<div class="business_hours">
							<p class="business_hours_title">Business hour*</p>
							<div class="business_select">
								<span class="is_require">Required</span>
								<div>
									<div class="week_select">
										<el-select v-model="week1_value" placeholder="请选择">
											<el-option v-for="item in week1" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
										<el-select v-model="week2_value" placeholder="请选择">
											<el-option v-for="item in week2" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
									</div>
									<el-time-picker is-range v-model="hour1" range-separator="Till" start-placeholder="From" end-placeholder="To" placeholder="select">
									</el-time-picker>
								</div>
							</div>
							<i class="line"></i>
							<div class="business_select">
								<span class="is_require">Optional</span>
								<div>
									<div class="week_select">
										<el-select v-model="week3_value" placeholder="请选择">
											<el-option v-for="item in week3" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
										<el-select v-model="week4_value" placeholder="请选择">
											<el-option v-for="item in week4" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
									</div>
									<el-time-picker is-range v-model="hour2" range-separator="Till" start-placeholder="From" end-placeholder="To"placeholder="选择时间范围">
									</el-time-picker>
								</div>
							</div>
						</div>
						<div class="card_type">
							<p class="business_hours_title">Choose virtual ECARD</p>
							<div class="card_container">
								<el-radio v-model="card_type" label="1">
									<img  src="../../assets/images/card1.png" alt="">
								</el-radio>
								<el-radio v-model="card_type" label="2">
									<img  src="../../assets/images/card2.png" alt="">
								</el-radio>
							</div>
							<el-checkbox class="notifier" v-model="notifier">
								<p>Send me Email</p>
								<span>When received or transferred money</span>
							</el-checkbox><i></i>
							<el-checkbox class="notifier" v-model="agreement">
								<p>I agree to the Terms and Privacy</p>
								<span>After click this button, I agree to the ECARD terms and conditions</span>
							</el-checkbox>
						</div>
						<div class="page_btn">
							<el-button v-if="curPage != 1" @click="curPage--">Prev</el-button>
							<el-button type="primary" :disabled="!agreement">Register</el-button>
						</div>
					</div>
				</transition>
			</el-form>
		</div>
	</div>
</template>

<script>
import loginNav from './header.vue'
import	axios from '../../service/axios.js'
export default {
	components:{
		loginNav:loginNav,
	},
	data() {
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
		let validatePass = (rule, value, callback) => {
			let regu = /^\d+$/;
			if (value === '' || value == undefined) {
				callback(new Error('Please enter 6 numerical digits password'));
				return false
			} else if(value.length !== 6 || !regu.test(value)){
				callback(new Error('Please enter 6 numerical digits password'));
			} else {
				callback();
			}
		}
		let validateCashBack = (rule, value, callback) => {
			if (value === '' || value == undefined) {
				callback(new Error('Please enter cashback'));
				return false
			} else if (parseFloat(value)!== NaN && parseFloat(value)< 10){
				callback(new Error('Input data can not be less than 10%'));
			} else if (parseFloat(value)!== NaN && parseFloat(value)> 100){
				callback(new Error('Please enter the correct cashback'));
			} else {
				callback();
			}
		}
		return {
			imageUrl: '',//头像地址
			picUrl:'',//营业执照地址
			sendCodeText:'Send code',
			ruleForm: {
				email: '',
				msgCode: '',
				company_type: '',
				enName: '',
				cnName: '',
				lastName: '',
				firstName: '',
				midName:'',
				telPhone:'',
				password:'',
				address1:'',
				address2:'',
				city:'',
				state:'',
				zipCode:'',
				inviteCode:'',
				cashBack:''
			},
			rules: {
				email:[
					{ required: true,validator: validateEmail, trigger: 'blur' }
				],
				msgCode:[
					{ required: true, message: 'Please enter code', trigger: 'blur' }
				],
				company_type:[
					{ required: true, message: 'Please select industry type', trigger: 'change' }
				],
				enName:[
					{ required: true, message: 'Please enter company name (English)', trigger: 'blur' }
				],
				cnName:[
					{ required: false, trigger: 'blur' }
				],
				lastName: [
					{ required: true, message: 'Please enter last name', trigger: 'blur' }
				],
				firstName:[
					{ required: true, message: 'Please enter first name', trigger: 'blur' }
				],
				midName: [
					{ required: false, trigger: 'blur' }
				],
				telPhone:[
					{ required: true, message: 'Please enter contact number', trigger: 'blur' }
				],
				password:[
					{ required: true,validator: validatePass, trigger: 'blur'}
				],
				address1: [
					{ required: true, message: 'Please enter address line 1', trigger: 'blur' }
				],
				address2: [
					{ required: false, trigger: 'blur' }
				],
				city:[
					{ required: true, message: 'Please enter city', trigger: 'blur' }
				],
				state:[
					{ required: true, message: 'Please select state / province', trigger: 'change' }
				],
				zipCode:[
					{ required: true, message: 'Please enter zip code', trigger: 'blur' }
				],
				inviteCode: [
					{ required: false, trigger: 'blur' }
				],
				cashBack:[
					{  required: true,validator: validateCashBack}
				],
				
			},
			curPage:2,
			//必选营业时间
			hour1:[new Date(), new Date()],
			week1_value:'Monday',
			week1:[
				{
					label:'Monday',
					value:1
				},{
					label:'Tuesday',
					value:2
				},{
					label:'Wednesday',
					value:3
				},{
					label:'Thursday',
					value:4
				},{
					label:'Friday',
					value:5
				},{
					label:'Saturday',
					value:6
				},{
					label:'Sunday',
					value:0
				}],
			week2_value:'Friday',
			week2:[
				{
					label:'Monday',
					value:1
				},{
					label:'Tuesday',
					value:2
				},{
					label:'Wednesday',
					value:3
				},{
					label:'Thursday',
					value:4
				},{
					label:'Friday',
					value:5
				},{
					label:'Saturday',
					value:6
				},{
					label:'Sunday',
					value:0
				}],
			//可选营业时间
			hour2:[new Date(0,0,0), new Date(0,0,0)],
			week3_value:'',
			week3:[
				{
					label:'Monday',
					value:1
				},{
					label:'Tuesday',
					value:2
				},{
					label:'Wednesday',
					value:3
				},{
					label:'Thursday',
					value:4
				},{
					label:'Friday',
					value:5
				},{
					label:'Saturday',
					value:6
				},{
					label:'Sunday',
					value:0
				}],
			week4_value:'',
			week4:[
				{
					label:'Monday',
					value:1
				},{
					label:'Tuesday',
					value:2
				},{
					label:'Wednesday',
					value:3
				},{
					label:'Thursday',
					value:4
				},{
					label:'Friday',
					value:5
				},{
					label:'Saturday',
					value:6
				},{
					label:'Sunday',
					value:0
				}],
			card_type:"1",
			notifier:true,
			agreement:false
		}
	},
	created(){

	},
	methods:{
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw)
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
			return (isPNG || isJPG) && isLt2M;
		},
		handlePicSuccess(res, file) {
			this.picUrl = URL.createObjectURL(file.raw)
		},
		beforePicUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isPNG = file.type === 'image/png'
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG && !isPNG) {
				this.$message.error('Only upload jpg / png files')
				return false
			}
			if (!isLt2M) {
				this.$message.error('Image size can not exceed 2MB')
				return false
			}
			return (isPNG || isJPG) && isLt2M;
		},
		sendCode(){
			let regu = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
			if(!regu.test(this.ruleForm.email)){
				this.$message.error('Please input the correct email')
				return false
			}
			let second = 5
			let _this = this
			function countDown(){
				let timer = setTimeout(()=>{
					if (second == 0) {
						_this.sendCodeText = 'Send code'
						clearTimeout(timer)
					}else{
						console.log(_this)
						_this.sendCodeText = second + 's'
						second -- 
						countDown()
					}
				},1000)
			}
			countDown()
		},
		//提交第一步的表单
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.getLocation()
					//this.curPage++
				} else {
					console.log('error submit!!')
					return false;
				}
			});
		},
		//下一步
		nextPage(){
			//this.submitForm('ruleForm')
			this.curPage++
		},
		//获取经纬度
		getLocation(){
			axios.get('https://maps.google.cn/maps/api/geocode/json',{
				params:{
					address:`${this.ruleForm.address1}+${this.ruleForm.city}+${this.ruleForm.state}`,
					key:'AIzaSyCWwxc_LHWy2n_gCbKHw4Ky7st5J_ssfXg'
				},
				withCredentials: false
			}).then(({data})=>{
				console.log(data)
			}, ()=>{

			})
		}

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../assets/css/index.scss';
.el-radio__input.is-checked .el-radio__inner {
    border-color: $blue;
    background: $blue;
}
.el-button--primary{
	background-color: $blue;
    border-color: $blue;
    &:focus,&:hover{
		background-color: $blue_hover;
    	border-color: $blue_hover;
    }
}
.el-form-item{
	margin-bottom:28px; 
}
.el-time-panel__content::after, .el-time-panel__content::before{
	margin-top: -7px;
}
.register{
	overflow-x:hidden;
	background: #F2F6FA;
    min-height: 100%;
    padding-bottom: 100px;
	.avatar_tips{
		transform:translate(342px,65px);
   		color: #606266;
	}
	.avatar-uploader{
		position: relative;
		width: 100%;
		.el-upload {
			margin: 0 0 20px 220px ;
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
	.register_form{
		position: relative;
		width: 1000px;
		margin: 50px auto 0 auto;
		h3{
			text-align: center;
			font-weight: normal;
			color: $blue;
			font-size: 28px;
			margin-bottom: 25px;
		}
		
	}
	.send_code_btn{
		min-width: 88px;
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
			margin-left: 46px;
			display: flex;
			align-items:flex-start;
			width: 100%;
			.el-upload{
				width: 250px;
				padding: 5px 10px;
    			border: 1px solid $blue;
    			border-radius: 4px;
    			background-color: #fff;
			}
			p{
				margin-right: 12px;
				color: #606266;
				height: 50px;
				line-height: 50px;
			}
		}
	}
	.state{	
		.el-select>.el-input{
			width: 250px;
		}
	}
	.sm_line_height{
		.el-form-item__label{
			line-height: 20px;
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
		animation: slideInRight .8s .5s both 1;
	}
	.el-range-separator{
		padding: 0;
	}
	.cashBack{
		.el-form-item__content{
			display: flex;
		}
		.el-input{
			margin-right: 5px;
		}
	}
	.business_hours,.card_type{
		width: 100%;
		display: flex;
		flex-direction:column;
		align-items:center;
		.el-select{
			width: 173px;
			margin: 20px 0;
		}
		.business_hours_title{
			width: 100%;
			font-size: 16px;
			padding-left: 270px;
		}
		.business_select{
			display: flex;
			align-items:center;
			.is_require{
				margin-right: 20px;
			}
		}
		.line{
			width: 350px;
			height: 2px;
			background-color: #ccc;
			margin-top: 20px;
			margin-left: 76px;
		}
	}
	.card_type{
		margin-top: 30px;
		.card_container{
			width: 350px;
			margin: 20px 0 0 0;
			@extend %flex_justify;
			img{
				width: 150px;
				cursor: pointer;
			}
			.el-radio{
			    display: flex;
				align-items: center;
			}
		}
		.notifier{
			margin-top: 20px;
			display: flex;
			align-items:center;
			width: 373px;
			.el-checkbox__label{
				p{
					width: 350px;
				}
				span{
					color: #999
				}
			}
		}
	}

}

</style>

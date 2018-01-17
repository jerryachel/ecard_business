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
						<el-upload class="avatar-uploader" :auto-upload="true" :action="baseUrl+'/file/avatar/upload'" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleImgFail" :before-upload="beforeAvatarUpload">
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
								<el-option v-for="(item,index) in companyTypeList" :key="index" :label="item.cateName" :value="item.id"></el-option>
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
						<el-form-item  label-width="220px" label="Password"  prop="password">
							<el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
						</el-form-item>
						<el-form-item  label-width="220px" class="paySecret sm_line_height" label="Enter 6 digital password, will be used when transfer funds back to bank account, and load funds."  prop="paySecret">
							<el-input type="password" auto-complete="off" v-model="ruleForm.paySecret"></el-input>
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
								<el-option v-for="(item ,index) in stateList" :key="index" :label="item.name" :value="item.id"></el-option>
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
							<el-upload :show-file-list="false" :on-success="handlePicSuccess" :before-upload="beforePicUpload" :on-error="handleImgFail" :action="baseUrl+'/file/licence/upload.do'">
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">Click here to upload
								</div>
								<img v-if="picUrl" :src="picUrl" class="picUrl">
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
										<el-select v-model="week1_value" placeholder="Please select">
											<el-option v-for="item in week1" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
										<span class="till">Till</span>
										<el-select v-model="week2_value" placeholder="Please select">
											<el-option v-for="item in week2" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
									</div>
									<el-time-select placeholder="startTime" v-model="hour1.startTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: hour1.endTime}">
									</el-time-select>
									<span class="till">Till</span>
									<el-time-select placeholder="endTime" v-model="hour1.endTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: hour1.startTime}">
									</el-time-select>
								</div>
							</div>
							<i class="line"></i>
							<div class="business_select">
								<span class="is_require">Optional 1</span>
								<div>
									<div class="week_select">
										<el-select clearable v-model="week3_value" placeholder="Please select">
											<el-option v-for="item in week3" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
										<span class="till">Till</span>
										<el-select clearable v-model="week4_value" placeholder="Please select">
											<el-option v-for="item in week4" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
									</div>
									<el-time-select placeholder="startTime" v-model="hour2.startTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: hour2.endTime}">
									</el-time-select>
									<span class="till">Till</span>
									<el-time-select placeholder="endTime" v-model="hour2.endTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: hour2.startTime}">
									</el-time-select>
								</div>
							</div>
							<div class="business_select">
								<span class="is_require">Optional 2</span>
								<div>
									<div class="week_select">
										<el-select clearable v-model="week5_value" placeholder="Please select">
											<el-option v-for="item in week5" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
										<span class="till">Till</span>
										<el-select clearable v-model="week6_value" placeholder="Please select">
											<el-option v-for="item in week6" :key="item.value" :label="item.label":value="item.value">
											</el-option>
										</el-select>
									</div>
									<el-time-select placeholder="startTime" v-model="hour3.startTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: hour3.endTime}">
									</el-time-select>
									<span class="till">Till</span>
									<el-time-select placeholder="endTime" v-model="hour3.endTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: hour3.startTime}">
									</el-time-select>
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
							<el-button type="primary" @click="submit()" :disabled="!agreement">Register</el-button>
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
import qs from 'qs'
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
		let validatePaySecrets = (rule, value, callback) => {
			let regu = /^\d+$/;
			if (value === '' || value == undefined) {
				callback();
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
			baseUrl: window.location.hostname == 'localhost' || window.location.hostname == 'merchant.ecard'?'http://api.ecard':'https://api.ecard.life',
			sendCodeText:'Send code',
			//公司种类
			companyTypeList:[],
			//州/省
			stateList:[],
			//校验规则
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
					{ required: true, trigger: 'blur'}
				],
				paySecret:[
					{ validator: validatePaySecrets }
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
			//当前页
			curPage:1,
			//必选营业时间
			hour1:{
				startTime:'00:00',
				endTime:'23:00'
			},
			week1_value:1,
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
					value:7
				}],
			week2_value:5,
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
					value:7
				}],
			//可选营业时间1
			hour2:{
				startTime:'',
				endTime:''
			},
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
					value:7
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
					value:7
				}],
			//可选营业时间2
			hour3:{
				startTime:'',
				endTime:''
			},
			week5_value:'',
			week5:[
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
					value:7
				}],
			week6_value:'',
			week6:[
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
					value:7
				}],
			//卡种类
			card_type:"1",
			//是否接受邮箱通知
			notifier:true,
			//是否同意条款
			agreement:false,
			imageUrl: '',//头像地址
			picUrl:'',//营业执照地址
			//表单信息
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
				paySecret:'',
				address1:'',
				address2:'',
				city:'',
				state:'',
				zipCode:'',
				inviteCode:'',
				cashBack:'',
				location:{
					lng:'',
					lat:''
				}
			},
			uploadLoading:''
		}
	},
	created(){
		//商家类型查询
		axios.get('/info/cateType/list.do',{
			params:{
				cateName:''
			},
			//showLoading:false
		}).then(({data})=>{
			console.log(data)
			this.companyTypeList = data.data
		})
		//州/省查询
		axios.get('/info/state/list.do',{
			params:{
				stateName:''
			},
			//showLoading:false
		}).then(({data})=>{
			console.log(data)
			this.stateList = data.data
		})
	},
	methods:{
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw)
			console.log(res)
			this.imageUrl = res.data
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
		handlePicSuccess(res, file) {
			this.picUrl = URL.createObjectURL(file.raw)
			console.log(res)
			this.picUrl = res.data
			this.uploadLoading.close()
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
			this.uploadLoading = this.$loading({
				target:document.querySelector('.upload_drag .el-upload')
			})
			return (isPNG || isJPG) && isLt2M;
		},
		//校验邮箱是否已经注册
		checkMail(){
			axios.get('/auth/checkMail.do',{
				params:{
					email:this.ruleForm.email,
					userType:2
				},
				showLoading:false
			}).then(({data})=>{
				console.log(data)
			}, ()=>{

			})
		},
		//发送邮箱验证码
		sendCode(){
			//校验邮箱格式
			let regu = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
			if(!regu.test(this.ruleForm.email)){
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
			
			//校验邮箱是否已经注册
			axios.get('/auth/checkMail.do',{
				params:{
					email:this.ruleForm.email,
					userType:2
				}
			}).then(({data})=>{
				if (!data.data) {
					countDown()
					//formData.append('email',this.ruleForm.email)
					//发送邮箱验证码
					axios.get('/auth/authMail.do',{
						params:{
							email:this.ruleForm.email
						}
					}).then(({data})=>{
						console.log(data)
					})
				}else{
					this.$message.error('E-mail has been registered')
				}
			})

		},
		//提交第一步的表单
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (!this.imageUrl) {
						this.$message.error('Please upload the photo')
						return false
					}
					if (!this.picUrl) {
						this.$message.error('Please upload the business license')
						return false
					}
					this.getLocation()
				} else {
					console.log('error submit!!')
					return false;
				}
			});
		},
		//下一步
		nextPage(){
			this.submitForm('ruleForm')
			//this.curPage++
			console.log(this.ruleForm)
		},
		//获取经纬度
		getLocation(){
			//获取州/省名字
			let len = this.stateList.length
			let province
			for(let i = 0;i<len;i++){
				if (this.ruleForm.state === this.stateList[i].id) {
					province = this.stateList[i].name
				}
			}
			let hostname = window.location.hostname
			axios.get('https://maps.google.cn/maps/api/geocode/json',{
				params:{
					address:`${this.ruleForm.address1}+${this.ruleForm.city}+${province}`,
					key:hostname == 'merchant.ecard.life'? 'AIzaSyCDwmMrC-NWMMgGlydCBzF7rKB2GeFUTaU' : 'AIzaSyCWwxc_LHWy2n_gCbKHw4Ky7st5J_ssfXg'
				},
				withCredentials: false
			}).then(({data})=>{
				if (data.status === "OK") {
					let res = data.results[0]
					console.log(res.geometry.location)
					this.ruleForm.location.lng = res.geometry.location.lng
					this.ruleForm.location.lat = res.geometry.location.lat
					this.curPage++
				}else if(data.status === "ZERO_RESULTS"){
					this.$message.error('The corporate address does not exist, please revise and submit again.')
					return false
				}else{
					this.$message.error(data.status)
				}
				
			})
		},
		//提交第二步表单
		submit(){
			//校验营业时间是否为空
			if (!this.hour1.startTime || !this.hour1.endTime) {
				this.$message.error('Please select business hour')
				return false
			}
			let len = this.stateList.length
			let province
			for(let i = 0;i<len;i++){
				if (this.ruleForm.state === this.stateList[i].id) {
					province = this.stateList[i].name
				}
			}
			let form = {
				address1:this.ruleForm.address1,
				address2:this.ruleForm.address2,
				avatarUrl:this.imageUrl,
				cardType:parseInt(this.card_type),
				city:this.ruleForm.city,
				companyCNName:this.ruleForm.cnName,
				companyENName:this.ruleForm.enName,
				companyType:parseInt(this.ruleForm.company_type),
				email:this.ruleForm.email,
				mailCode:this.ruleForm.msgCode,
				extraRate:parseFloat(this.ruleForm.cashBack),
				firstName:this.ruleForm.firstName,
				lastName:this.ruleForm.lastName,
				middleName:this.ruleForm.midName,
				invitationCode:this.ruleForm.inviteCode,
				ing:this.ruleForm.location.lng?parseFloat(this.ruleForm.location.lng):this.ruleForm.location.lng,
				lat:this.ruleForm.location.lat?parseFloat(this.ruleForm.location.lat):this.ruleForm.location.lat,
				licenceUrl:this.picUrl,
				needEmailRemind:this.notifier?1:0,
				password:this.ruleForm.password,
				paySecret:this.ruleForm.paySecret,
				phone:this.ruleForm.telPhone,
				province:province,
				provinceId:parseInt(this.ruleForm.state),
				type:2,
				zipCode:this.ruleForm.zipCode,
				officeHours:{
					am:this.hour1.startTime,
					dayFrom:this.week1_value,
					dayTo:this.week2_value,
					pm:this.hour1.endTime
				},
				optionalOfficeHours1:{
					am:this.hour2.startTime,
					dayFrom:parseInt(this.week3_value),
					dayTo:parseInt(this.week4_value),
					pm:this.hour2.endTime
				},
				optionalOfficeHours2:{
					am:this.hour3.startTime,
					dayFrom:parseInt(this.week5_value),
					dayTo:parseInt(this.week6_value),
					pm:this.hour3.endTime
				}
			}
			
			axios.post('/merchantAuth/merchantRegister.do',form).then(({data})=>{
				if (data.code == 200) {
					this.$alert('Registration success!', 'Prompt', {
						confirmButtonText: 'Confirm',
						type:'success',
						callback: action => {
				            window.location.reload()
				        }
					})
				}else if(data.code == 403){
					this.$alert('E-mail has been registered!', 'Prompt', {
						confirmButtonText: 'Confirm',
						type:'error'

					})
				}else if(data.code == 404){
					this.$alert('Incorrect email verification code!', 'Prompt', {
						confirmButtonText: 'Confirm',
						type:'error'

					})
				}else{
					this.$message.error(data.msg)
				}
			},()=>{

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
   		&:before{
		    content: '*';
		    color: #f56c6c;
		    margin-right: 4px;
   		}
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
    			position: relative;
    			height: 120px;
			    display: flex;
			    flex-direction: column;
			    align-items: center;
			    justify-content: center;
			}
			.picUrl{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			p{
				margin-right: 12px;
				color: #606266;
				height: 50px;
				line-height: 50px;
				&:before{
					content: '*';
					color: #f56c6c;
					margin-right: 4px;
				}
			}
		}
	}
	.state{	
		.el-select>.el-input{
			width: 250px;
		}
	}
	.paySecret{
		.el-form-item__error{
			top:60%;
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
		animation: slideOutLeft .5s  both 1;
	}
	.page_switch-enter-active{
		animation: slideInRight .8s .3s both 1;
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
			.el-date-editor{
				width: 173px;
			}
			.till{
				margin: 0 5px;
			}
		}
		.line{
			width: 378px;
			height: 2px;
			background-color: #ccc;
			margin-top: 20px;
			margin-left: 80px;
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

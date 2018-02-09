<template>
	<div class="editForm">
		<el-dialog :title="this.formContent?'编辑地址信息':'新增地址信息'" :visible.sync="dialogFormVisible" :before-close="handleClose">
			<el-form  :model="address" ref="address" label-width="100px" class="form_container">
				<el-form-item 
				prop="userStoreProfile.address1" 
				label="地址栏1" 
				:rules="[{ required: true, message: '请输入商家地址栏1', trigger: 'blur' }]">
					<el-input v-model="address.userStoreProfile.address1"></el-input>
				</el-form-item>
				<el-form-item 
				prop="userStoreProfile.address2" 
				label="地址栏2" >
					<el-input v-model="address.userStoreProfile.address2"></el-input>
				</el-form-item>
				<el-form-item 
				prop="userStoreProfile.cityName" 
				label="市" 
				:rules="[{required: true, message: '请输入市', trigger: 'blur' }]">
					<el-input v-model="address.userStoreProfile.cityName"></el-input>
				</el-form-item>
				<el-form-item 
				prop="userStoreProfile.stateId" 
				label="省" 
				:rules="[{required: true, message: '请输入省', trigger: 'blur' }]">
					<el-select v-model="address.userStoreProfile.stateId" placeholder="Please select state / province">
						<el-option v-for="(item ,index) in stateList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item 
				prop="userStoreProfile.zipCode" 
				label="邮编" 
				:rules="[{required: true, message: '请输入邮编', trigger: 'blur' }]">
					<el-input v-model="address.userStoreProfile.zipCode"></el-input>
				</el-form-item>
				<el-form-item
				label="电话"
				prop="userStoreProfile.contact"
				:rules="{required: true, message: '电话不能为空', trigger: 'blur'}">
					<el-input v-model="address.userStoreProfile.contact"></el-input>
					<!-- <el-button v-if="index!=0" size="small" type="danger" @click.prevent="removeTelPhone(telPhone)">删除</el-button> -->
				</el-form-item>
				<!-- <el-button class="add_btn" type="primary" size="small" @click.prevent="addTelPhone()">Add contact number</el-button> -->
				<div class="business_select form_block">
					<span class="is_require Required">Required</span>
					<div>
						<div class="week_select">
							<el-select :clearable="false" v-model="address.optional1.openFromDay" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
							<span class="till">Till</span>
							<el-select :clearable="false" v-model="address.optional1.openToDay" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
						</div>
						<el-time-select :clearable="false" id="open1FromTime" placeholder="startTime" v-model="address.optional1.openFromTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: address.optional1.openToTime}">
						</el-time-select>
						<span class="till">Till</span>
						<el-time-select :clearable="false" id="open1ToTime" placeholder="endTime" v-model="address.optional1.openToTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: address.optional1.openFromTime}">
						</el-time-select>
					</div>
				</div>
				<div class="business_select form_block">
					<span class="is_require">Optional 1</span>
					<div>
						<div class="week_select">
							<el-select :clearable="true" v-model="address.optional2.openFromDay" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
							<span class="till">Till</span>
							<el-select :clearable="true" v-model="address.optional2.openToDay" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
						</div>
						<el-time-select :clearable="true" id="open2FromTime" placeholder="startTime" v-model="address.optional2.openFromTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: address.optional2.openToTime}">
						</el-time-select>
						<span class="till">Till</span>
						<el-time-select :clearable="true" id="open2ToTime" placeholder="endTime" v-model="address.optional2.openToTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: address.optional2.openFromTime}">
						</el-time-select>
					</div>
				</div>
				<div class="business_select form_block">
					<span class="is_require">Optional 2</span>
					<div>
						<div class="week_select">
							<el-select :clearable="true" v-model="address.optional3.openFromDay" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
							<span class="till">Till</span>
							<el-select :clearable="true" v-model="address.optional3.openToDay" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
						</div>
						<el-time-select :clearable="true" id="open3FromTime" placeholder="startTime" v-model="address.optional3.openFromTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: address.optional3.openToTime}">
						</el-time-select>
						<span class="till">Till</span>
						<el-time-select :clearable="true" id="open3ToTime" placeholder="endTime" v-model="address.optional3.openToTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: address.optional3.openFromTime}">
						</el-time-select>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="validate('address')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import axios from '../../service/axios.js'
export default {
	props: ['visible','stateList','formContent'],
	data(){
		return {
			dialogFormVisible:this.visible,
			weekList:[
				{
					label:'MON',
					value:1
				},{
					label:'TUE',
					value:2
				},{
					label:'WEN',
					value:3
				},{
					label:'THU',
					value:4
				},{
					label:'FRI',
					value:5
				},{
					label:'SAT',
					value:6
				},{
					label:'SUN',
					value:7
			}],
			address: this.formContent || {
				optional1:{
					openFromDay:1,
					openFromTime:"00:00",
					openToDay:5,
					openToTime:"23:00"
				},
				optional2:{
					openFromDay:null,
					openFromTime:null,
					openToDay:null,
					openToTime:null
				},
				optional3:{
					openFromDay:null,
					openFromTime:null,
					openToDay:null,
					openToTime:null
				},
				userStoreProfile:{
					address1:"",
					address2:"",
					cityName:"",
					stateId:null,
					stateName:"",
					briefAddress:"",
					cnName:"",
					contact:"",
					enName:"",
					fullAddress:"",
					lat:null,
					lng:null,
					zipCode:"",
					storeId:null
				}
			}
		}
	},
	mounted(){
		console.log(this.formContent)
		//this.address = this.formContent
	},
	watch:{
		visible:function(newVal){
			this.dialogFormVisible = newVal
		},
		dialogFormVisible:function(newVal){
			this.$emit('update:visible', newVal)
		}
	},
	methods:{
		cancel(){
			this.$emit(this.$emit('update:visible', false))
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {})
		},
		validate(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.checkBussinessHours(this.address.optional2) && this.checkBussinessHours(this.address.optional3)){
						this.getLocation()
					}else{
						this.$message.error('请选择完整的营业时间')
						return false
					}
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		checkBussinessHours(obj){
			let arr = []
			for( var key in obj ){
				arr.push(obj[key])
			}
			function isAllNull(data) {
			    return data == null || data == ''
			}
			function isAllNotNull(data){
				return data != '' && data != null
			}
			return (arr.every(isAllNull) || arr.every(isAllNotNull))
		},
		//获取经纬度
		getLocation(){
			//获取州/省名字
			let len = this.stateList.length
			let province
			for(let i = 0;i<len;i++){
				if (this.address.userStoreProfile.stateId === this.stateList[i].id) {
					province = this.stateList[i].name
				}
			}
			let hostname = window.location.hostname
			axios.get('https://maps.google.cn/maps/api/geocode/json',{
				params:{
					address:`${this.address.userStoreProfile.address1}+${this.address.userStoreProfile.address2}+${this.address.userStoreProfile.cityName}+${province}`,
					key:hostname == 'merchant.ecard.life'? 'AIzaSyCDwmMrC-NWMMgGlydCBzF7rKB2GeFUTaU' : 'AIzaSyCWwxc_LHWy2n_gCbKHw4Ky7st5J_ssfXg'
				},
				withCredentials: false,
				p:false
			}).then((data)=>{
				if (data.status === "OK") {
					//成功
					let res = data.results[0]
					console.log(res.geometry.location)
					this.address.userStoreProfile.lng = res.geometry.location.lng
					this.address.userStoreProfile.lat = res.geometry.location.lat
					this.submitForm(province)
				}else if(data.status === "ZERO_RESULTS"){
					this.$message.error('The corporate address does not exist, please revise and submit again.')
					return false
				}else{
					this.$message.error(data.status)
				}
				
			})
		},
		submitForm(stateName){
			axios.post('/merchantOperation/saveMerchantStore.do',{
				address1:this.address.userStoreProfile.address1,
				address2:this.address.userStoreProfile.address2,
				cityName:this.address.userStoreProfile.cityName,
				contact:this.address.userStoreProfile.contact,
				lat:parseFloat(this.address.userStoreProfile.lat),
				lng:parseFloat(this.address.userStoreProfile.lng),
				open1FromDay:this.address.optional1.openFromDay,
				open1FromTime:this.address.optional1.openFromTime,
				open1ToDay:this.address.optional1.openToDay,
				open1ToTime:this.address.optional1.openToTime,
				open2FromDay:this.address.optional2.openFromDay,
				open2FromTime:this.address.optional2.openFromTime,
				open2ToDay:this.address.optional2.openToDay,
				open2ToTime:this.address.optional2.openToTime,
				open3FromDay:this.address.optional3.openFromDay,
				open3FromTime:this.address.optional3.openFromTime,
				open3ToDay:this.address.optional3.openToDay,
				open3ToTime:this.address.optional3.openToTime,
				stateId:this.address.userStoreProfile.stateId,
				stateName:stateName,
				storeId:this.address.userStoreProfile.id,
				updateType:this.formContent?0:1, //更新：0  新增：1
				userId:this.$store.state.user_info.userId,
				zipCode:this.address.userStoreProfile.zipCode
			},{
				session:true
			}).then(data=>{
				if (data.code == 200) {
					this.$emit('submitCallBack', 'success')
					this.dialogFormVisible = false
				}else{
					this.$message.error(data.msg)
				}
			})
		}
		/*removeTelPhone(item) {
			let index = this.address.telPhone.indexOf(item)
			if (index !== -1) {
				this.address.telPhone.splice(index, 1)
			}
		},
		addTelPhone() {
			this.address.telPhone.push({
				value: ''
			})
		},
		removeBussinessHours(item){
			let index = this.address.bussinessHours.indexOf(item)
			if (index !== -1) {
				this.address.bussinessHours.splice(index, 1)
			}
		},
		addBussinessHours(){
			this.address.bussinessHours.push({
				startTime:'',
				endTime:'',
				startWeek:null,
				endWeek:null
			})
		}*/
	}
}
</script>
<style lang="scss">
.editForm{
	.el-dialog{
		width: 800px;
	}
	.el-form-item__content{
		display: flex;

	}
	.el-input{
		width: 200px;
		margin-right: 20px;
	}
	.form_container{
		display: flex;
		flex-wrap:wrap;
		.form_block{
			width: 100%;
		}
	}
	.business_select{
		display: flex;
		align-items:center;
		.el-input{
			width: 173px;
			margin: 0;
		}
		.el-select{
		    width: 173px;
		    margin: 20px 0;
		}
		.is_require{
			padding-right: 12px;
		    display: block;
		    width: 100px;
		    text-align: right;
		}
		.Required:after{
			content: "*";
		    color: #f56c6c;
		    margin-left: 4px;
		}
		.el-date-editor{
			width: 173px;
		}
		.till{
			margin: 0 5px;
		}
	}
	.add_btn{
		margin-left: 100px;
	}
	.removeBussinessHours{
		margin-left: 20px;
	}
	.addBussinessHours{
		margin-top: 28px;
	}
}
</style>
<template>
	<div class="editForm">
		<el-dialog title="编辑地址信息" :visible.sync="dialogFormVisible">
			<el-form  :model="address" ref="address" label-width="100px" class="form_container">
				<el-form-item 
				prop="addressLine1" 
				label="地址栏1" 
				:rules="[{ required: true, message: '请输入商家地址栏1', trigger: 'blur' }]">
					<el-input v-model="address.addressLine1"></el-input>
				</el-form-item>
				<el-form-item 
				prop="addressLine2" 
				label="地址栏2" 
				:rules="[{ message: '请输入商家地址栏2', trigger: 'blur' }]">
					<el-input v-model="address.addressLine2"></el-input>
				</el-form-item>
				<el-form-item 
				prop="city" 
				label="市" 
				:rules="[{required: true, message: '请输入市', trigger: 'blur' }]">
					<el-input v-model="address.city"></el-input>
				</el-form-item>
				<el-form-item 
				prop="state" 
				label="省" 
				:rules="[{required: true, message: '请输入省', trigger: 'blur' }]">
					<el-select v-model="address.state" placeholder="Please select state / province">
						<el-option v-for="(item ,index) in stateList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item 
				prop="zipCode" 
				label="邮编" 
				:rules="[{required: true, message: '请输入邮编', trigger: 'blur' }]">
					<el-input v-model="address.zipCode"></el-input>
				</el-form-item>
				<el-form-item v-for="(telPhone, index) in address.telPhone"
				:label="'电话' + (index+1)"
				:key="index"
				:prop="'telPhone.' + index + '.value'"
				:rules="{required: true, message: '电话不能为空', trigger: 'blur'}"
				class="form_block">
					<el-input v-model="telPhone.value"></el-input>
					<el-button v-if="index!=0" size="small" type="danger" @click.prevent="removeTelPhone(telPhone)">删除</el-button>
				</el-form-item>
				<el-button class="add_btn" type="primary" size="small" @click.prevent="addTelPhone()">Add contact number</el-button>
				<div class="business_select form_block" v-for="(item,index) in address.bussinessHours" :key="index+100">
					<span class="is_require">{{index==0?'Required':'Optional'+(index)}}</span>
					<div>
						<div class="week_select">
							<el-select :clearable="index==0? false :true" v-model="item.startWeek" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
							<span class="till">Till</span>
							<el-select :clearable="index==0? false :true" v-model="item.endWeek" placeholder="Please select">
								<el-option v-for="week in weekList" :key="week.value" :label="week.label":value="week.value">
								</el-option>
							</el-select>
						</div>
						<el-time-select :id="'startTime'+index" placeholder="startTime" v-model="item.startTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00',maxTime: item.endTime}">
						</el-time-select>
						<span class="till">Till</span>
						<el-time-select :id="'endTime'+index" placeholder="endTime" v-model="item.endTime":picker-options="{start: '00:00',step: '00:30',end: '24:00',minTime: item.startTime}">
						</el-time-select>
					</div>
					<el-button v-if="index!=0" class="removeBussinessHours" size="small" type="danger" @click.prevent="removeBussinessHours(item)">删除</el-button>
				</div>
				<el-button class="add_btn addBussinessHours" type="primary" size="small" @click.prevent="addBussinessHours()">Add business hour</el-button>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('address')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
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
			address: {
				telPhone: [{
					value: ''
				}],
				addressLine1: '',
				addressLine2: '',
				city:'',
				state:'',
				zipCode:'',
				bussinessHours:[{
					startTime:'00:00',
					endTime:'23:00',
					startWeek:1,
					endWeek:5
				},{
					startTime:'00:00',
					endTime:'23:00',
					startWeek:1,
					endWeek:5
				},{
					startTime:'00:00',
					endTime:'23:00',
					startWeek:1,
					endWeek:5
				}]
			}
		}
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
					this.$emit('submitCallBack', 'success')
					this.dialogFormVisible = false
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		removeTelPhone(item) {
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
		}
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
			margin-right: 20px;
			display: block;
			width: 80px
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
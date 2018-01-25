<template>
	<div class="editForm">
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="address" ref="address" label-width="100px" class="">
				<el-form-item 
				prop="fullAddress" 
				label="地址" 
				:rules="[{ required: true, message: '请输入商家地址', trigger: 'blur' }]">
					<el-input v-model="address.fullAddress"></el-input>
					<el-button size="small" @click="addDomain" type="primary" class="el-icon-circle-plus"> Add</el-button>
				</el-form-item>
				<el-form-item v-for="(domain, index) in address.domains"
				:label="'域名' + index"
				:key="index"
				:prop="'domains.' + index + '.value'"
				:rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
					<el-input v-model="domain.value"></el-input>
					<el-button size="small" @click.prevent="removeDomain(domain)">删除</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('address')">提交</el-button>
					<el-button @click="addDomain">新增域名</el-button>
					<el-button @click="resetForm('address')">重置</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	props: ['visible'],
	data(){
		return {
			dialogFormVisible:this.visible,
			address: {
				domains: [{
					value: ''
				}],
				fullAddress: '789456'
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
			console.log()
			this.$emit(this.$emit('update:visible', false))
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		removeDomain(item) {
			var index = this.address.domains.indexOf(item)
			if (index !== -1) {
				this.address.domains.splice(index, 1)
			}
		},
		addDomain() {
			this.address.domains.push({
				value: '',
				key: Date.now()
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
		padding-right:20px;
	}
}
</style>
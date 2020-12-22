<template>
	<div class="main">
		<div class="addBox" id="addBox">
			<div class="flex flex_between">
				<div class="flex">
					<ul class="flex" style="margin-right: 20px;margin-top: 6px;">
						<li>
							<i :class="curType == 'type' ?  'apiColor el-icon-s-grid is-active' : 'apiColor el-icon-s-grid' " @click="onChangeIndex('type')"></i>
						</li>
						<li>
							<i :class="curType == 'hardware' ?  'apiColor el-icon-s-order is-active' : 'apiColor el-icon-s-order' " @click="onChangeIndex('hardware')"></i>
						</li>
						<li>
							<i :class="curType == 'protocol' ?  'apiColor el-icon-edit is-active' : 'apiColor el-icon-edit' " @click="onChangeIndex('protocol' )"></i>
						</li>
					</ul>
				</div>
				<el-button type="primary" size="normal" v-print="'#addBox'" style="margin-top: 6px;" >打印</el-button>
			</div>
			<div class="tableBox">
				<el-table
					v-if="curType == 'type' "
					:data="tableData01"
					border
					style="width: 100%">
					<el-table-column prop="id" label="id" width="100"></el-table-column>
					<el-table-column prop="name" label="姓名" ></el-table-column>
					<el-table-column prop="age" label="年龄"></el-table-column>
					<el-table-column prop="city" label="城市"></el-table-column>
				</el-table>
				<el-table
					 v-if="curType == 'hardware' "
					:data="tableData"
					border
					style="width: 100%">
					<el-table-column prop="id" label="ID" width="100"></el-table-column>
					<el-table-column prop="id" label="ID"></el-table-column>
					<el-table-column prop="id" label="ID"></el-table-column>
					<el-table-column prop="id" label="ID"></el-table-column>
					<el-table-column label="ID">
					</el-table-column>
					<el-table-column  label="ID" width="300" align="center">
					</el-table-column>
				</el-table>
				<el-table
					v-if="curType == 'protocol' "
					:data="tableData"
					border
					style="width: 100%">
					<el-table-column prop="id" label="ID" width="100"></el-table-column>
					<el-table-column prop="id" label="id"></el-table-column>
					<el-table-column prop="id" label="id"></el-table-column>
					<el-table-column prop="id" label="id"></el-table-column>
					<el-table-column label="id">
					</el-table-column>
					<el-table-column  label="id" width="300" align="center">
					</el-table-column>
				</el-table>
			</div>

      <el-button @click="onAdd()" style="padding: left;margin: left;margin-bottom: 10px;">新增</el-button>
      <el-table
      	:data="items"
      	border
      	style="width: 100%">
      	<el-table-column prop="index" label="ID" width="100"></el-table-column>
      	<el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column  label="操作" width="300" align="left" >
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="warning" icon="el-icon-edit">编辑</el-button>
            <el-button @click="onDelet(scope.row.id)" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
		</div>

      <el-dialog
        :title="tittle"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      		<el-form-item label="用户名" prop="username">
      			<el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      		</el-form-item>
          <el-form-item label="密码" prop="password">
          	<el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
      	</el-form>
      	<span slot="footer" class="dialog-footer">
      		<el-button size="mini" @click="onReset()">取 消</el-button>
      		<el-button size="mini" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      	</span>
      </el-dialog>

	</div>
</template>
<script>
// import axios from 'axios'
import Qs from 'qs';
export default{
	name:'iotType',
	data(){
		return{
      items: [],
			curType:'type',
			tableData01: [
			{'id':1,'name':"lx",'age':3,'city': "Shanghai"},
			{'id':2,'name':"ly",'age': 21,'city': "Henan"},
			{'id':3,'name':"lz",'age':18,'city': "Beijing"}
			],
      ruleForm:{
        username: '',
        password: '',
      },
      rules:{
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      tittle:'',
      options: [],
			tableData: [],
			currentPage:1,
			count:15,
			totalPage:1,
			dialogVisible:false,
			dialogVisibleInfo:false,
			type:'add',
			id:'',
      url: 'http://127.0.0.1:8000'
			}
		},
		mounted(){
			this.onGetData();
		},
		methods:{
      onAdd(){
        this.type = 'add'
        this.tittle = '新增用户'
        this.dialogVisible = true
      },
      onEdit(data){
        this.type = 'edit'
        for(let item in  this.ruleForm){
        	this.ruleForm[item] = data[item];
        }
        this.id = data['id'];
        this.tittle = '编辑用户'
        this.dialogVisible = true
      },
      onGetData(){
        let parmas = {
        }
        this.$api.user(parmas).then((res)=>{
          console.log(res)
          this.items = res.data;
        })
      },
			onChangeIndex(index){
				this.curType = index;
				this.tableData = [];
				this.totalPage = 0;
				this.currentPage = 1;
				this.onGetData();
			},
			handleCurrentChange(val){
				this.onGetData();
			},
			handleClose(){
				this.onReset();
			},
			onReset(){
				for(let item in  this.ruleForm){
					this.ruleForm[item] = '';
				}

				this.dialogVisible = false;
				this.dialogVisibleInfo = false;
				this.id = '';
			},
      submitForm(formName) {
      	this.$refs[formName].validate((valid) => {
      		if (valid) {
      			this.onSave();
      		} else {
      			return false;
      		}
      	});
      },
      onSave(){
        let params = {
        	username: this.ruleForm['username'],
        	password: this.ruleForm['password'],
        };
        let method = '';
        let message = '';
        if(this.type == 'add'){
          method = 'post'
          message = '添加成功！'
        }else{
          method = 'put'
          params['id'] = this.id;
          message = '修改成功！'
        }
        this.axios({
        	method: method,
        	url:	this.url + '/api/v1/user/user/',
        	data:Qs.stringify(params),
        }).then((res)=>{
        	if(res.data.code == 200){
            this.dialogVisible = false;
            this.onGetData();
            this.$message({
            	type: 'success',
            	message: message
            });
        	}else{
        		this.$message({
        			type: 'warning',
        			message: res.data.msg
        		});
        	}
        }).catch((error)=>{this.loading = false;})
      },
      onDelet(id){
        
      	// this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
      	// 	confirmButtonText: '确定',
      	// 	cancelButtonText: '取消',
      	// 	type: 'warning',
       //  }).then(() => {
       //  	let params = {
       //  		id:id,
       //  	};
       //  	this.$api.user_delet(params).then((res)=>{
       //  		if(res.code == 200){
       //  			this.onGetUser();
       //  			this.$record.saveRecord('user_d_confirm')
       //  		}
       //  	})
       //  }).catch(() => {
       //  	this.$record.saveRecord('user_d_cancel')
       //  	this.$message({
       //  		type: 'info',
       //  		message: '已取消删除'
       //  	});
       //  });
        
      	this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
      		confirmButtonText: '确定',
      		cancelButtonText: '取消',
      		type: 'warning',
      	}).then(() => {
      		let params = {
      			id:id,
      		};
      		this.axios({
      			method:'delete',
      			url:	this.url + '/api/v1/user/user/',
      			data:params,
      		}).then((res)=>{
      			if(res.data.code == 200){
      				this.$message({
      					type: 'success',
      					message: '删除成功'
      				});
      				this.onGetData();
      			}else{
      				this.$message({
      					type: 'warning',
      					message: res.data.msg
      				});
      			}
      		}).catch((error)=>{})
      	}).catch(() => {
      		this.$message({
      			type: 'info',
      			message: '已取消删除'
      		});
      	});
      },
			handleRemove(file, fileList) {
				this.ruleForm['api_template'] = '';
			},
		},
	}
</script>
<style scoped lang="less">
.main{
	color: #FFFFFF;
	background: grey;
	.addBox{
		padding-right: 20px;
		text-align: right;
		li{
			line-height: 40px;
		}
	}
	.el-select{
		width: 100%;
	}
	.apiColor{
		width: 20px;
		height: 20px;
		display: inline-block;
		font-size: 20px;
		margin-right: 10px;
		cursor: pointer;
	}
	.is-active{
		color: #7289da;
	}
}
</style>

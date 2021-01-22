<template>
  <div class="main">
		<div>
			<Son v-bind:mySon="message"/>
		</div>
    <div class="flex head">
      <el-input placeholder="请输入查询内容" v-model="keyword" clearable style="width: 200px;margin-right: 10px;"></el-input>
      <el-button @click="onGetData()" icon="el-icon-search">搜索</el-button>
      <el-button @click="onadd()" icon="el-icon-plus">新增</el-button>
     <!-- <el-button @click="onTotal()" >统计</el-button> -->
    </div>
    <div class="tablxbox">
      <el-table
       :data="items"
       border
       style="width: 98%"
       class="weather"
       >
        <el-table-column prop="id" label="ID" width="150"></el-table-column>
        <el-table-column prop="message" label="消息"></el-table-column>
        <el-table-column prop="user" label="用户"></el-table-column>
        <el-table-column  label="操作" width="300" align="left" >
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="warning" icon="el-icon-edit">编辑</el-button>
            <el-button @click="onDelet(scope.row.id,'apply')" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
      	<el-pagination
      		@current-change="handleCurrentChange"
      		:current-page.sync="currentPage"
      		:page-size="count"
      		layout="prev, pager, next, jumper"
      		:total="totalPage">
      	</el-pagination>
      </div>
    </div>


		<el-dialog
		  :title="tittle"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
				<el-form-item label="消息" prop="message">
					<el-input v-model="ruleForm.message" placeholder="消息"></el-input>
				</el-form-item>
				<el-form-item label="用户" prop="user">
					<!-- <el-input v-model="ruleForm.email"></el-input> -->
          <el-select v-model="ruleForm.user" placeholder="请选择">
          	<el-option
          		v-for="item in options"
          		:key="item.id"
          		:label="item.name"
          		:value="item.id">
          	</el-option>
          </el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="onReset()">取 消</el-button>
				<el-button size="mini" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
			</span>
		</el-dialog>

  </div>
</template>
<script >
  import Highchart from 'highcharts'
  import Qs from 'qs';
  export default{
    name: 'index',
    components:{
      Highchart,
    },
    data(){
      return{
				message: '父组件传递',
        keyword: '',
        id: '',
        tittle: '',
        totalPage:1,
        currentPage:1,
        count:10,
        dialogVisible: false,
        textword:'',
        type: 'add',
        items:[],
        ruleForm:{
          message: '',
          user: '',
        },
        rules:{
          message: [{ required: true, message: '请输入消息', trigger: 'blur' }],
          user: [{ required: true, message: '请选择用户', trigger: 'blur' }],
        },
        options:[
          {id: 1,"user":1},
          {id: 2,"user":2}
        ]

    }
  },
  mounted(){
    this.onGetData();
      //this.onGetchart();
    },
    methods:{
      onTotal(){
				//this.$store.commit('getSecondChildren',data['role_name']);
				this.$router.push({path:'/main/total01',});
				sessionStorage.setItem('state', JSON.stringify(this.$store.state));
      },
      handleCurrentChange(val) {
      	this.currentPage = val;
      	this.onGetData();
      },
      rowstyle({row,rowIndex}){
        if(row){
          return{
            backgroundColor: 'lightblut'
          }
        }
      },
      onadd(){
        this.type = 'add'
        this.tittle="新增消息"
        this.dialogVisible = true
      },
      onEdit(data){
        this.type = 'edit'
        this.id = data.id;
        this.ruleForm.message = data.message;
        this.ruleForm.user = data.user;
        this.tittle = "修改信息";
        this.dialogVisible = true;

      },
      onGetData(){
        let params={
          keyword: this.keyword
        }
        this.axios({
        	method: 'get',
        	url:	'http://127.0.0.1:8000/api/v1/message/message/'+ '?keyword='+this.keyword + '&size=' + this.count + '&page=' + this.currentPage,
        	data:Qs.stringify(params),
        }).then((res)=>{
        	if(res.data.code == 200){
            this.items = res.data.data;
            this.totalPage = res.data.count;
        	}else{
        		this.$message({
        			type: 'warning',
        			message: res.data.msg
        		});
        	}
        }).catch((error)=>{})
       //  this.$axios.get('http://127.0.0.1:8000/api/v1/message/message/').then((reponse) =>{
       //   this.items = reponse.data.data;
       //  },function(reponse){
       // }).catch(() => {})
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
        let params={
          message: this.ruleForm.message,
          user: this.ruleForm.user,
          id: this.id
        }
        var method = '';
        var url = '';
        if(this.type=='add'){
          method = 'post';
          url = 'http://127.0.0.1:8000/api/v1/message/message/';
        }else{
          method = 'put'
          url = 'http://127.0.0.1:8000/api/v1/message/message/'

        }
        this.axios({
        	method: method,
        	url:	url,
        	data:Qs.stringify(params),
        }).then((res)=>{
        	if(res.data.code == 200){
            this.dialogVisible = false
            this.id = ''
        		this.onGetData();
            this.onReset()
        	}else{
        		this.$message({
        			type: 'warning',
        			message: res.data.msg
        		});
        	}
        }).catch((error)=>{})
      },
      onDelet(id,type){
      	let Url  = '';
      	Url = 'http://127.0.0.1:8000/api/v1/message/message/' + id+'/';
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
      			url:	Url,
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
      onReset(){
        this.dialogVisible = false
        for(let item in this.ruleForm){
          this.ruleForm[item]=''
        }
      }


  }
}


</script>
<style scoped lang="less">
.main{
  width: 100%;
  height: 100%;
  position: absolute;
  //background-color: lightskyblue;
}
.head{
  margin-top: 10px;
  margin-left: 10px;
}
.weather{
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 0px;
  //background-color: #0074D9;
  color: steelblue;
}
.page{
  margin-top: 20px;
  margin-left: 1350px;
}
</style>

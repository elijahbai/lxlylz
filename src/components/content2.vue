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
					:data="tableData"
					border
					style="width: 100%">
					<el-table-column prop="id" label="id" width="100"></el-table-column>
					<el-table-column prop="id" label="id" ></el-table-column>
					<el-table-column prop="id" label="id"></el-table-column>
					<el-table-column prop="id" label="id"></el-table-column>
					<el-table-column label="ID">
						</el-table-column>
					</el-table-column>
					<el-table-column  label="id" width="300" align="center">
					</el-table-column>
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
				<div class="block">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// import axios from 'axios'
export default{
	name:'iotType',
	data(){
		return{
			curType:'type',
			tableData: [],
			currentPage:1,
			count:15,
			totalPage:1,
			dialogVisible:false,
			dialogVisibleInfo:false,
			type:'add',
			id:'',
			}
		},
		mounted(){
			this.$store.commit('getSecondChildren','');
			this.$store.commit('getThiredChildren','');
			this.onGetData();
		},
		methods:{
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
				if(this.curType == 'type'){
					this.$refs.upload.clearFiles();
				}
				this.dialogVisible = false;
				this.dialogVisibleInfo = false;
				this.id = '';
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
	background: purple;
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
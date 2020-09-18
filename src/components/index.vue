<template>
	<div class="main">
		<div class="leftbox">
			<div class="lup">
				<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column prop="date" label="data"></el-table-column>
				<el-table-column prop="week" label="data"></el-table-column>
				<el-table-column prop="wea" label="天气状况"></el-table-column>
				<el-table-column prop="tem" label="温度"></el-table-column>
				<el-table-column prop="win" label="风向"></el-table-column>
				<el-table-column prop="win_speed" label="风级"></el-table-column>
				<el-table-column prop="air_tips" label="tips"></el-table-column>
			</el-table>
			</div>
		</div>
		<div class="rightbox"></div>
	</div>
</template>

<script >
	import Qs from 'qs';
	export default{
		name: 'index',
		data(){
			return{
				tableData: [],
				data: '',
				week:'',
				wea:'',
				tem:'',
				win_speed:'',
				air_tips:'',
			}
		},
		mounted(){
			this.getWeather();

		},
		methods:{
			getWeather () {
				this.$axios.get('https://www.tianqiapi.com/api/?appid=91536352 &appsecret=Py9Zs0RD&version=v1&cityid=310100' ).then((reponse) =>{
					this.tableData = reponse.data.data;
					console.log(this.tableData);				
				},function(reponse){
					console.log("test");
					}).catch(() => {})
			},

		}
	}

	
</script>
<style scoped lang="less">
	
</style>
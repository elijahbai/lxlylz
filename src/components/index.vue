<template>
	<div class="main">
		<div class="leftbox">
			<div>
				<el-table
				:data="tableData"
				border
				style="width: 98.5%"
        class="weather">
				<el-table-column prop="date" label="data"></el-table-column>
				<el-table-column prop="week" label="data"></el-table-column>
				<el-table-column prop="wea" label="天气状况"></el-table-column>
				<el-table-column prop="tem" label="温度"></el-table-column>
				<el-table-column prop="win" label="风向"></el-table-column>
				<el-table-column prop="win_speed" label="风级"></el-table-column>
        <el-table-column prop="air_level" label="空气质量"></el-table-column>
				<el-table-column prop="air_tips" label="air_tips" ></el-table-column>
			</el-table>
			</div>
		</div>
		<div class="rightbox">
      <span>{{date}}</span>
      </br>
      <span>{{tem1}}</span>
    </div>
    <div class="chart" id="chart"></div>
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
				tableData: [],
				date: [],
				week:'',
				wea:'',
				tem:'',
				win_speed:'',
				air_tips:'',
        chart: null,
        tem1: [],
        day: [],
			}
		},
		mounted(){
        Highchart.setOptions({
            global: {
                useUTC: false
            }
        });
        this.onGetchart();
		},
		methods:{
			getWeather() {
				this.$axios.get('https://www.tianqiapi.com/api/?appid=91536352 &appsecret=Py9Zs0RD&version=v1&cityid=310100' ).then((reponse) =>{
					this.tableData = reponse.data.data;
          this.day[0] = this.tableData[0].day;
          this.day[1] = this.tableData[1].day;
          this.day[2] = this.tableData[2].day;
          this.day[3] = this.tableData[3].day;
          this.day[4] = this.tableData[4].day;
          this.day[5] = this.tableData[5].day;
          this.day[6] = this.tableData[6].day;
          this.date[0] = this.tableData[0].date;
          this.date[1] = this.tableData[1].date;
          this.date[2] = this.tableData[2].date;
          this.date[3] = this.tableData[3].date;
          this.date[4] = this.tableData[4].date;
          this.date[5] = this.tableData[5].date;
          this.date[6] = this.tableData[6].date;
          this.tem1[0] = parseInt(this.tableData[0].tem1);
          this.tem1[1] = parseInt(this.tableData[1].tem1);
          this.tem1[2] = parseInt(this.tableData[2].tem1);
          this.tem1[3] = parseInt(this.tableData[3].tem1);
          this.tem1[4] = parseInt(this.tableData[4].tem1);
          this.tem1[5] = parseInt(this.tableData[5].tem1);
          this.tem1[6] = parseInt(this.tableData[6].tem1);
					console.log(this.tem1);
          console.log(this.date);
				},function(reponse){
					console.log("test");
					}).catch(() => {})
			},
      onGetchart(){
        this.getWeather();
        this.chart = Highchart.chart('chart', {
          xAxis: {
            categories: this.date,
            //categories: [ "2020-09-18", "2020-09-19", "2020-09-20", "2020-09-21", "2020-09-22", "2020-09-23", "2020-09-24" ],
            //categories: [this.day[0], this.day[1], this.day[2],this.day[3], this.day[4], this.day[5],this.day[6]],
          },
          yAxis: {
            title: {
              text: 'temperature'
            }
          },
          title: {
            text: '温度变化曲线'
          },
          plotOptions: {
            series: {
              allowPointSelect: true
            }
          },
          credits:{enabled:false,},
          series: [{
            showInLegend: false,
            //data: [ 23, 23, 28, 26, 21, 23, 25 ],
            data: this.tem1,
            //data: [20, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, ]
            //data: [parseInt(this.tem1[0]),parseInt(this.tem1[1]),parseInt(this.tem1[2]),parseInt(this.tem1[3]),parseInt(this.tem1[4]),parseInt(this.tem1[5]),parseInt(this.tem1[6])]
          }]
        });
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
  .weather{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    //background-color: #0074D9;
    color: steelblue;
  }
  .chart{
    margin-top: 20px;
    margin-left: 10px;
    width: 1360px;
    height: 300px;
  }
</style>

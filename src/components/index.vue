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
<!--       <span>{{date}}</span></br>
      <span>{{tem1}}</span> -->
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
        this.getWeather();
        //this.onGetchart();
		},
		methods:{
			getWeather() {
				this.$axios.get('https://www.tianqiapi.com/api/?appid=91536352 &appsecret=Py9Zs0RD&version=v1&cityid=310100' ).then((reponse) =>{
					this.tableData = reponse.data.data;
          for(var i=0;i<7;i++){
            this.date[i] = this.tableData[i].date
            this.tem1[i] = parseInt(this.tableData[i].tem1)
          }
          console.log(this.tem1);
          console.log(this.date);
          //console.log(this.date[2])
          this.onGetchart();
				},function(reponse){
					console.log("test");
					}).catch(() => {})
			},
      onGetchart(){
        console.log(this.tem1);
        console.log(this.date);
        console.log(this.date[2]);
        this.chart = Highchart.chart('chart', {
          xAxis: {
            type: 'datetime',
            title: {
              text :null
            },
            categories: this.date,
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
          tooltip: {
              //headerFormat: '<b>{xAxis.categories}</b><br>',
              pointFormat: ' {point.y:.0f} ℃'
          },
          series: [{
            showInLegend: false,
            data: this.tem1,
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

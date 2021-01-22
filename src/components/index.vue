<template>
  <div class="flex-between main">
    <div>
      <el-select  style="margin-left: 10px;margin-top: 10px; " v-model="id"  placeholder="请选择城市名称">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button class="searchbox" type="primary" size="small" icon="el-icon-search" @click="onCheck()" >{{$t('home.search')}}
      </el-button>
    </div>
   <div class="flex leftbox">
    <div class="daytable">
      <el-table
        :data="tableData"
        border
        style="width: 96.5%"
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
 <div class="chart" id="hourschart"></div>
  </div>
<div class="flex rightbox">
  <div class="hourtable">
    <el-table
    :data="hoursData"
    border
    style="width: 96.5%"
    class="weather">
    <el-table-column prop="day" label="具体时间"></el-table-column>
    <el-table-column prop="wea" label="天气状况"></el-table-column>
    <el-table-column prop="tem" label="温度"></el-table-column>
    <el-table-column prop="win" label="风向"></el-table-column>
    <el-table-column prop="win_speed" label="风级"></el-table-column>
    </el-table>
  </div>
  <div class="chart" id="chart"></div>
  </div>


</div>
</template>

<script >
  import Highchart from 'highcharts'
  import Vue from 'vue'
  import Qs from 'qs';
  export default{
    name: 'index',
    components:{
      Highchart,
    },
    data(){
     return{
      textword:'',
      tableData: [],
      hoursData: [],
      date: [],
      options: [{
        id: '101020200',
        name: '闵行'
      },{
        id: '101021300 ',
        name: '浦东'
        },{
        id: '101181502 ',
        name: '临颍县'
      },{
        id: '101010300',
        name: '朝阳'
      },{
        id: '101180402',
        name: '鄢陵'
      },{
        id:'101190101',
        name: '南京'
      }],
      id: '',
      week:'',
      wea:'',
      tem:'',
      win_speed:'',
      air_tips:'',
      chart: null,
      hourschart: null,
      tem1: [],
      day: [],
      hours: [],
      tem2: [],
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
      onCheck(){
        let id = this.id;
        let parmas = {
          appid: '91536352',
          appsecret: 'Py9Zs0RD',
          version: 'v1',
          cityid: id,
        }
        this.$http.get('https://www.tianqiapi.com/api/?appid=91536352&appsecret=Py9Zs0RD&version=v1&cityid='+ id).then((response) => {
            // 响应成功回调
            console.log(response)
        }, (response) => {
            // 响应错误回调
        });
        // this.$api.weather(parmas).then(res =>{
        //   console.log('passed here')
        //   console.log(res.data.data)
        // }).catch(() => {console.log("something wrong")})
        // this.axios({
        // 	method: 'get',
        // 	url:	'https://www.tianqiapi.com/api/?appid=91536352 &appsecret=Py9Zs0RD&version=v1&cityid='+ id,
        // 	data: '',
        // }).then((res)=>{
        //   console.log("passed here")
        //   console.log(res)
        //   this.tableData = res.data.data;
        //    this.hoursData = res.data.data[0].hours;
        //    for(var i=0;i<this.tableData.length;i++){
        //     this.date[i] = this.tableData[i].date
        //     //console.log(this.date[i])

        //     this.tem1[i] = parseInt(this.tableData[i].tem)
        //     //console.log(this.tem1[i])
        //   }
        //   for (var i=0;i<this.hoursData.length;i++){
        //     this.hours[i] = this.hoursData[i].day;
        //     this.tem2[i] = parseInt(this.hoursData[i].tem);
        //   }
        //     //console.log(this.hoursData);
        //     this.onGetchart();
        //     this.onGethourschart();
        // 	if(res.data.code == 200){
        //     console.log("passed here")
        // 	}else{
        // 		this.$message({
        // 			type: 'warning',
        // 			message: res.data.msg
        // 		});
        // 	}
        // }).catch((error)=>{})

       //  this.$axios.get('https://www.tianqiapi.com/api/?appid=91536352 &appsecret=Py9Zs0RD&version=v1&cityid='+ id ).then((reponse) =>{

       //   this.tableData = reponse.data.data;
       //   console.log(reponse.data.data)
       //   this.hoursData = reponse.data.data[0].hours;
       //   for(var i=0;i<this.tableData.length;i++){
       //    this.date[i] = this.tableData[i].date
       //    //console.log(this.date[i])

       //    this.tem1[i] = parseInt(this.tableData[i].tem)
       //    //console.log(this.tem1[i])
       //  }
       //  console.log(this.date)
       //  console.log(this.tem1)
       //  for (var i=0;i<this.hoursData.length;i++){
       //    this.hours[i] = this.hoursData[i].day;
       //    this.tem2[i] = parseInt(this.hoursData[i].tem);
       //  }
       //  console.log(this.tem1);
       //   console.log(this.date);
       //    //console.log(this.hoursData);
       //    this.onGetchart();
       //    this.onGethourschart();
       //  },function(reponse){
       //   //console.log("test");
       // }).catch(() => {})
      },
     getWeather() {
			 this.$axios.get('https://devapi.qweather.com/v7/weather/7d?key=a04d5e4537274fbd8d3a8634dedaacae&location=101020200' ).then((reponse) =>{
			   console.log(reponse)
				 this.tableData = reponse.data.data;
			   this.hoursData = reponse.data.data[0].hours;
			   for(var i=0;i<this.tableData.length;i++){
			    this.date[i] = this.tableData[i].date
			    this.tem1[i] = parseInt(this.tableData[i].tem)
			  }
			  for (var i=0;i<this.hoursData.length;i++){
			    this.hours[i] = this.hoursData[i].day;
			    this.tem2[i] = parseInt(this.hoursData[i].tem);
			  }
			    //console.log(this.hoursData);
			    this.onGetchart();
			    this.onGethourschart();
			  },function(reponse){
			   console.log("test");
			 }).catch(() => {})
     //  this.$axios.get('https://www.tianqiapi.com/api/?appid=91536352 &appsecret=Py9Zs0RD&version=v1&cityid=101020200' ).then((reponse) =>{
     //   this.tableData = reponse.data.data;
     //   this.hoursData = reponse.data.data[0].hours;
     //   for(var i=0;i<this.tableData.length;i++){
     //    this.date[i] = this.tableData[i].date
     //    this.tem1[i] = parseInt(this.tableData[i].tem)
     //  }
     //  for (var i=0;i<this.hoursData.length;i++){
     //    this.hours[i] = this.hoursData[i].day;
     //    this.tem2[i] = parseInt(this.hoursData[i].tem);
     //  }
     //    //console.log(this.hoursData);
     //    this.onGetchart();
     //    this.onGethourschart();
     //  },function(reponse){
     //   console.log("test");
     // }).catch(() => {})
    },
    onGetchart(){
      //console.log(this.tem1);
      //console.log(this.date);
      //console.log(this.date[2]);
      this.chart = Highchart.chart('chart', {
        xAxis: {
          type: 'datetime',
          title: {
            text :null
          },
          categories: this.hours,
        },
        yAxis: {
          title: {
            text: 'temperature'
          }
        },
        title: {
          text: '一天温度变化曲线'
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
            data: this.tem2,
          }]
        });
    },
    onGethourschart(){
      //console.log(this.tem1);
      //console.log(this.date);
      //console.log(this.date[2]);
      this.chart = Highchart.chart('hourschart', {
        xAxis: {
          type: 'hourtime',
          title: {
            text :null
          },
          categories: this.date,
        },
        yAxis: {
          gridLineWidth: 0,
          title: {
            text: 'temperature'
          }
        },
        title: {
          text: '一周温度变化曲线'
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
.leftbox{
  margin-bottom: 20px;
}
.daytable{
  height: 360px;
  width: 960px;
  margin-bottom: 100px;
}
.hourtable{
  width: 960px;
}
.weather{
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 0px;
  //background-color: #0074D9;
  color: steelblue;
}
.chart{
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 10px;
  width: 760px;
  height: 400px;
}
</style>

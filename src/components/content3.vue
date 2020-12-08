<template>
  <div class="main">
    <div class="flex head">
      <el-input placeholder="请输入查询内容" clearable style="width: 200px;margin-right: 10px;"></el-input>
      <el-button @click="onGetData()">搜索</el-button>
      <el-button @click="onadd()">新增</el-button>
    </div>
    <div class="tablxbox">
     <el-table
     :data="items"
     border
     style="width: 96.5%"
     class="weather">
     <el-table-column prop="id" label="ID"></el-table-column>
     <el-table-column prop="message" label="消息"></el-table-column>
     <el-table-column prop="user" label="用户"></el-table-column>
    <el-table-column  label="操作" min-width="200" align="left" fixed="right">
      <template slot-scope="scope">
        <el-button @click="onEdit(scope.row)" type="warning" >编辑</el-button>
        <el-button @click="onDelet(scope.row.id,'apply')" type="danger" >删除</el-button>
      </template>
    </el-table-column>
   </el-table>
    </div>
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
      textword:'',
      items:[],
    }
  },
  mounted(){
    this.onGetData();
      //this.onGetchart();
    },
    methods:{
      onGetData(){
        let id = this.id;
        this.$axios.get('http://127.0.0.1:8000/api/v1/message/message/').then((reponse) =>{
         this.items = reponse.data.data;
        },function(reponse){
       }).catch(() => {})
      },



  }
}


</script>
<style scoped lang="less">
  .head{
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>

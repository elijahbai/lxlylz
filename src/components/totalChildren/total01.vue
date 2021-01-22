<template>
  <div class="main">
    <div class="head">
      <el-button @click="onback()">返回</el-button>
    </div>
    <div>
      <h3 v-if="tab==1">首页</h3>
      <h3 v-else-if="tab==2">新闻页</h3>
      <h3 v-else>个人中心</h3>
      <el-button @click="tabchange(1)" data-id="1">首页</el-button>
      <el-button @click="tabchange(2)" data-id="2">新闻页</el-button>
      <el-button @click="tabchange(3)" data-id="3">个人中心</el-button>
    </div>
  </div>
</template>
<script >
  import Qs from 'qs';
  export default{
    name: 'index',
    components:{

    },
    data(){
      return{
        keyword: '',
        id: '',
        tittle: '',
        tab: 1,

    }
  },
  mounted(){
   // this.onGetData();
      //this.onGetchart();
    },
    methods:{
      tabchange(e){
        this.tab = e
      },
      onback(){
				this.$store.commit('getSecondChildren', '');
				this.$router.push('/main/content4')
      },



  }
}


</script>
<style></style>

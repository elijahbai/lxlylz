<template>
  <div class="main">
    <div class="head">
      <el-button @click="onback()">返回</el-button>
    </div>
  </div>
</template>
<script >
  import Qs from 'qs';
  export default{
    name: 'index',
    components:{
      Highchart,
    },
    data(){
      return{
        keyword: '',
        id: '',
        tittle: '',


    }
  },
  mounted(){
   // this.onGetData();
      //this.onGetchart();
    },
    methods:{
      onback(){
				// this.$store.commit('getSecondChildren', '');
				// this.$router.push('/main/content3')
      },



  }
}


</script>
<style></style>

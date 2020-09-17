<template>
  <div class="loginBox flex">
		<div class="leftBox">
			<div>
				<p>登陆测试</p>
				<p>welcome !</p>
			</div>
			<div class="loginInnerBox">
			  <br>
			  <input type="text" class="ipt mT15" placeholder="用户名" name="用户名" v-model="username"><br>
			  <input type="password" class="ipt mT15" placeholder="密码" name="密码" v-model="password" @keyup.enter="loginSubmit()"><br>
			  <button class="btnSubmit" @click="loginSubmit()">登 录</button>
			</div>
		</div>
  	<div>
			<img src="" alt="">
		</div>
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
      username:'',
      password:'',
      verification:'',
			loginUrl:'',
			id:'',
			card:'',
    }
  },
	components:{

  },
  mounted(){
		//this.onNoBack();
		this.$router.push({path:'/main/index'});
  },
  methods:{
    loginSubmit(){
			if(!this.username){
				this.$message({
					type:'warning',
					message:"请输入用户名"
				})
			}else if(!this.password) {
				this.$message({
					type:'warning',
					message:"请输入密码"
				})
			}else{
				this.onLoginIn()
			}
    },
    onLoginIn(){
			this.$router.push({path:'/main'});
			// let params = {
			// 	username	:	this.username ,
			// 	password	:	this.password ,
			// };
			// this.$api.login(params).then((res)=>{
			// 	if(res.code == 200){
			// 		this.$store.commit("getPermission",res.data.permission);
			// 		// this.$store.commit("getAdmin",this.username);
			// 		this.$store.commit("getAdminId",res.data['user_id']);
			// 		// this.$store.commit("getCurIndex",'1');
			// 		this.$cookie.set('curIndex','0');
			// 		this.$store.commit("getToken",res.data['token']);
			// 		sessionStorage.setItem('state', JSON.stringify(this.$store.state));
			// 		if(this.$route.query.redirect){
			// 			this.$router.push({path:this.$route.query.redirect});
			// 		}else{
			// 			this.$router.push({path:'/home/mainApi'});
			// 		}
			// 	}
			// })
		},
		onNoBack(){
			history.pushState(null, null, document.URL);
			window.addEventListener('popstate', function () {
				history.pushState(null, null, document.URL);
			});
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped  lang="less">
.loginBox{
	width:1340px;
	height:100%;
	padding-left: 100px;
	background-color: #f5f5fc;
	.systemName{
		font-size: 24px;
		color:#FFFFFF;
	}
	.loginInnerBox{
		width:400px;
		height:300px;
		margin-top: 50px;
	}
	.ipt{
		width: 360px;
		height: 56px;
		background-color: #FFFFFF;
		color:#f29441;
		text-indent: 20px;
		font-size: 16px;
		border-radius: 10px;
		border: 1px solid #f29441;
		margin-top: 30px;
		outline: none;
	}
	.btnSubmit{
		width: 360px;
		height: 56px;
		color: white;
		font-size: 16px;
		border: transparent;
		border-radius: 10px;
		margin-top: 40px;
		background-color:#f29441;
		cursor: pointer;
		outline: none;
	}
	img{
		width: 100%;
		height: 100%;
	}
	.leftBox{
		margin-right: 303px;
		margin-top: 208px;
	}
	p{
		font-weight:500;
		margin-top:30px;
		color:#f29441;
		font-size: 36px;
	}
}
</style>

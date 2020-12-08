<!--此处为1级页面-->
<template>
	<el-container class="container">
		<el-aside width="240px"  class='homeContent'>
			<div>
        <img class="ima" src="../assets/ly.png" alt="" width="100px" height="100px">
				<ul class="ltBox">
					<li class="userName">
						lxlylz
					</li>
					<li class="posi">
						Shanghai
					</li>
				</ul>
        <el-button style="margin-left: 145px;margin-bottom: -12px;" @click="changeLanguage()">{{$t('language.name')}}</el-button>
				<ul style="margin-top: 41px;" class="flex titBox">
					<li style="border-right:  1px solid #e8e8e8;" class="flex flex-column flex_center">
						<p>{{$t('home.time')}}</p>
						<p class="value">{{this.dataTime}}</p>
					</li>
					<li class="flex flex-column flex_center">
						<p>{{$t('home.weather')}}</p>
						<p class="value">晴朗多云</p>
					</li>
				</ul>
			</div>
			<div class="homeLeft" ref="homeLeft">
				<el-menu
					unique-opened
					:default-active="$store.state.curIndex"
					class="content"
					@open="handleOpen"
					@close="handleClose"
					background-color="#20293c"
					text-color="#ffffff"
					active-text-color="#a2c41f"
          >
					<router-link :to="v.url" v-if="v.url" v-for="(v,k,index) in authConfig" :key="index">
						<el-menu-item  :index="index.toString()" @click="onSaveIndex(index)" class="menuBox">
							<!-- <i style="display: none;">{{index.toString()}}</i> -->
							<i :class="authConfig[k]['iconFont']"></i>
							<span slot="title">{{authConfig[k]["ctrName"]}}</span>
						</el-menu-item>
					</router-link>
				</el-menu>
				<!-- <el-menu
					unique-opened
					:default-active="$store.state.curIndex"
					class="el-menu-vertical-demo"
					:collapse="isCollapse"
					@open="handleOpen"
					@close="handleClose"
					background-color="#1e282c"
					text-color="#8aa4af"
					active-text-color="#ffffff">
					<ul>
						<li v-for="(item,index) in authConfig">
							<router-link :to="item.url" v-if="item.url" :key="index">
								<el-menu-item  :index="item['order'].toString()" @click="onSaveIndex(item['order'])">
									<i style="display: none;">{{index.toString()}}</i>
									<i :class="item['icon']"></i>
									<span slot="title">{{item["name"]}}</span>
								</el-menu-item>
							</router-link>
							<el-submenu :index="item['order'].toString()" :key="index" v-if="!item.url">
								<template slot="title"  :index="item['order']">
									<i :class="item['icon']" ></i>
									<span v-show="!isCollapse">{{item["name"]}}</span>
								</template>
								<el-menu-item-group v-for="(v2,index2) in item.child" :key="v2['order']">
									<router-link :to="v2['url']" v-if="v2.url">
										<el-menu-item :index="item['order']+'-'+v2['order']" @click="onSaveIndex(item['order']+'-'+v2['order'])">
										{{v2['name']}}
										</el-menu-item>
									</router-link>
								</el-menu-item-group>
							</el-submenu>
						</li>
					</ul>
				</el-menu> -->
			</div>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	import Qs from 'qs';
	import {authconfig} from "../config/authConfig";
	import {ipConfig} from '@/config/ipConfig'
	export default {
		name: 'home',
		data () {
			return {
				checkValue:'',
				isCollapse:false,
				isShow:false,
				isShowMoney:false,
				liShow:false,
				showRight:'',
				authConfig:authconfig,
				nowData:'',
				dataTime:'0000-00-00 00:00:00',
				value:true,
				url:ipConfig.urlXHL,
				defaultActive:'0',
				data: [],
			}
		},
		created(){
			//this.onCheckIsLogin();
			//this.onGetHomeList();
		},
		mounted(){
			this.onGetNowData();
			//this.onIndexAuth();
			this.onNoBack();
			this.onSetIndex();
		},

		methods:{
      changeLanguage(){
          this.$i18n.locale=='zh'?this.$i18n.locale='en':this.$i18n.locale='zh'   //设置中英文模式
          localStorage.setItem('languageSet',this.$i18n.locale)   //将用户设置存储到localStorage以便用户下次打开时使用此设置
      },
			onCheckIsLogin(){
				if(!this.$store.state.admin){
					this.$router.push('/');
				}
			},
			onWatchActive(){
				let lastTime = new Date().getTime();
				let timeOut = 1000 * 60 * 10 ;  //10分钟超时
				document.onmousemove = function(e){
					lastTime = new Date().getTime();
				}
				this.Time = setInterval(()=>{
					let currentTime = new Date().getTime(); //更新当前时间
					if(currentTime - lastTime > timeOut){ //判断是否超时
						console.log("超时");
					}
				},1000);
			},
			onIndexAuth(){
				this.authConfig = authconfig;
			},
			handleOpen(key, keyPath) {
			  console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
			  console.log(key, keyPath);
			},
			onGetNowData(){
				this.Time = setInterval(()=>{
					this.dataTime = new Date().getFullYear() + '-' + this.onRuleTime((new Date().getMonth()+1)) + '-' + this.onRuleTime(new Date().getDate()) + ' ' +
													this.onRuleTime(new Date().getHours())  + ':' + this.onRuleTime(new Date().getMinutes())  + ':' + this.onRuleTime(new Date().getSeconds()) ;
				},1000)
			},
			onGetHomeList(){
				this.$api.mainMenuList('').then(res=>{
					this.authConfig = res.data;
					let PermissionMuenID = [];
					let authConfig = res.data;
					for(let item in authConfig){
						if(authConfig[item]['url'] != null){
							PermissionMuenID.push(authConfig[item]['id']);
						}
						if(authConfig[item]['child'].length != 0){
							let authConfig_child = authConfig[item]['child'];
							for(let itemA in authConfig_child){
								if(authConfig_child[itemA]['url'] != null){
									PermissionMuenID.push(authConfig_child[itemA]['id']);
								}
								if(authConfig_child[itemA]['child'].length != 0){
									let authConfig_child_child = authConfig_child[itemA]['child'];
									for(let itemB in authConfig_child_child){
										PermissionMuenID.push(authConfig_child_child[itemB]['id']);
									}
								}
							}
						}
					}
					this.$store.commit("getPermissionMenuID",PermissionMuenID);
					sessionStorage.setItem('state', JSON.stringify(this.$store.state));
				})
			},
			onRuleTime(time){
				if(time <10){
					return '0'	+ time;
				}else{
					return  time;
				}
			},
			logOut(){
				this.$api.logout().then((res)=>{
					sessionStorage.removeItem('state')
					this.$router.push('/');
				})
			},
			onNoBack(){
				history.pushState(null, null, document.URL);
				window.addEventListener('popstate', function () {
						history.pushState(null, null, document.URL);
				});
			},
			onSetIndex(){
				let curIndex = this.$cookie.get('curIndex');
				if(curIndex){
					this.$store.commit("getCurIndex",curIndex);
				}else{
					this.$store.commit("getCurIndex",'0');
				}
			},
			onSaveIndex(val){
				this.$cookie.set('curIndex',val);
				if(!isNaN(val)){
					val = val + '';
				}
				this.$store.commit("getCurIndex",val);
			},

		},
	}
</script>
<style scoped lang="less">
.el-aside {
	background: #f8f8f8;
	border-right: 1px solid #e8e8e8;
  height: 948px;
}
.container{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;

	.ltBox{
		margin-top: 51px;
		li{
			text-align: center;
			margin-bottom: 10px;
		}
		.userName{
			font-size: 16px;
			color: #1e1e1e;
		}
		.posi{
			font-size: 12px;
			color: #9397a0;
		}
	}
	.titBox{
		border-top: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
		text-align: center;
		li{
			width: 50%;
			height: 95px;
			color: #000000;
			font-size: 14px;
		}
		.value{
			color: #9397a0;
			margin-top: 10px;
		}
	}

}
.el-main {
	color: #0074D9;
	width: 100%;
	padding: 0;
	position: relative;
	background-color: #f8f8f8;
}
.ima{
  margin-top: 20px;
  margin-left: 60px;
}
.menuBox{
	//width: 100px;
	border-radius: 8px;
	background-color: #1673b1;
	color: #FFFFFF;
	text-align: center;
	border-bottom: 2px solid #0e5584;
	cursor: pointer;
	border-radius: 4px;
	//margin: 0 auto;
	//margin-bottom: 10px;
	i{
		font-size: 40px;
	}
}
</style>

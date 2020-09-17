import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
  	permission:{},
  	admin:'',
  	admin_id:'',
  	permissionMenuID:[],
		token:'',
		curIndex:'',
  },
  mutations: {
   
    "getPermission" : function (state,val) {
      state.permission = val;
    },
  	
  	"getAdmin" : function (state,val) {
  	  state.admin = val;
  	},
  	
  	"getAdminId" : function (state,val) {
  	  state.admin_id = val;
  	},
		
		"getCurIndex" : function (state,val) {
		  state.curIndex = val;
		},
		
  	"getPermissionMenuID" : function (state,val) {
  	  state.permissionMenuID = val;
  	},
		
		"getToken" : function (state,val) {
		  state.token = val;
		},
		
  },
})
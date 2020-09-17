import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import VeeValidate from 'vee-validate';
//import store from './store/store';
import VueCookie from 'vue-cookie';
//import './assets/icon/iconfont.css';
import Print from 'vue-print-nb';
Vue.use(Print);
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(VeeValidate,{
	xxxx:'xxxx',
	fieldsBagName: 'veefields'
});

import api from '@/request/api.js' // 导入api接口
Vue.prototype.$api = api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store,
  components: { App },
  template: '<App/>'
})

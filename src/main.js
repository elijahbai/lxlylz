import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import VeeValidate from 'vee-validate';
import store from './store/store';
import VueCookie from 'vue-cookie';
import Print from 'vue-print-nb';
import echarts from 'echarts'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n=new VueI18n({
    locale:localStorage.getItem('languageSet')||'zh',   //从localStorage里获取用户中英文选择，没有则默认中文
    messages:{
        'zh':require('./components/language/zh'),
        'en':require('./components/language/en')
    }
})

//Vue.component(VTable.name, VTable);
Vue.use(Print);
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(VeeValidate,{
	xxxx:'xxxx',
	fieldsBagName: 'veefields'
});
Vue.prototype.$axios = axios
//Vue.prototype.$echarts = echarts
import api from '@/request/api.js' // 导入api接口
Vue.prototype.$api = api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

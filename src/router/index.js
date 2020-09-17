import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import home from '@/pages/home'

import index from '@/components/index'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'home',
      component: home,
      children:[
        {path: 'index',name: 'index',component: index},
      ]
    }
  ]
})

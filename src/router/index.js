import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import home from '@/pages/home'

import index from '@/components/index'
import content1 from '@/components/content1'
import content2 from '@/components/content2'
import content3 from '@/components/content3'
import content4 from '@/components/content4'
import total01 from '@/components/totalChildren/total01'

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
          {path: 'content1',name: 'content1',component: content1},
          {path: 'content2',name: 'content2',component: content2},
          {path: 'content3',name: 'content3',component: content3},
          {path: 'content4',name: 'content4',component: content4},
					// {path: 'total01',name: 'total01',component: total01},
        ]
    },
    {
      path: '/total01',
      name:  'total01',
      component: total01
    },
  ]
})

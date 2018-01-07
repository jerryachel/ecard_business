import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import register from '@/views/login/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})

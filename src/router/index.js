import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import register from '@/views/login/register'
import resetPassword from '@/views/login/resetPassword'
import index from '@/views/index/index'
Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'index',
      component: index,
      //redirect:'/register'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    }
  ]
})

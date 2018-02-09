import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import register from '@/views/login/register'
import resetPassword from '@/views/login/resetPassword'
import index from '@/views/index/index'
import personal from '@/views/personal/personal'
import account from '@/views/account/account'
import notification from '@/views/notification/notification'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      meta:{
        requiresAuth:true
      },
      redirect:'/index'
    },
  	{
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        requiresAuth:false
      }
    },{
      path: '/register',
      name: 'register',
      component: register,
      meta:{
        requiresAuth:false
      }
    },{
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
      meta:{
        requiresAuth:false
      }
    },{
      path: '/personal',
      name: 'personal',
      component: personal,
      meta:{
        requiresAuth:true
      }
    },{
      path: '/account',
      name: 'account',
      component: account,
      meta:{
        requiresAuth:true
      }
    },{
      path: '/notification',
      name: 'notification',
      component: notification,
      meta:{
        requiresAuth:true
      }
    }
  ]
})

import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import axios from '../service/axios.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user_info:Cookies.get('user_info') ? JSON.parse(Cookies.get('user_info')) : '',
		user_account:''
	},
	mutations:{
		SAVE_INFO:(state,obj)=> {
			state.user_info = obj
			Cookies.set('user_info',state.user_info)
			console.log(obj)
			/*if (obj.info == state.user_info) {
				return
			}else{
				state.user_info = obj.info
				//是否保持登录
				if (obj.isKeepLogin) {
					Cookies.set('user_info',state.user_info,{ expires: 7 })   
				}else{
					Cookies.set('user_info',state.user_info)
				}
			}*/
		},
		SAVE_ACCOUNT:(state,data)=>{
			state.user_account = data
			//Cookies.set('avatar',state.user_account)
		},
		SET_AVATAR:(state,data)=>{
			state.user_account.avatarUrl = data
		},
		REMEMBER_ACCOUNT:(state,data)=>{
			Cookies.set('rememberMe',data)
		},
	},
	actions: {
		//session
		login:({ commit },obj) => {
			commit('SAVE_INFO',obj)
	    },
	    //用户基本信息
	    user_account:({ commit,state },session)=>{
	    	axios.get('/userOperation/userInfo.do',{
                session:true,
                params: {
                    userId: state.userId
                },
                showLoading:false
            }).then((data)=>{
                commit('SAVE_ACCOUNT',data.data)
            })
	    },
	    //头像
	    setAvatar:({ commit },url) => {
			commit('SET_AVATAR',url)
	    },
	    //登录前是否记住账号
	    rememberMe:({ commit },data) => {
			commit('REMEMBER_ACCOUNT',data)
	    },
	}
})
export default store
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user_info:Cookies.get('user_info') ? JSON.parse(Cookies.get('user_info')) : '',
		avatar:Cookies.get('avatar') ? JSON.parse(Cookies.get('avatar')) : ''
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
		SAVE_AVATAR:(state,avatarUrl)=>{
			state.avatar = avatarUrl
			Cookies.set('avatar',state.avatar)
		}
	},
	actions: {
		login:({ commit },obj) => {
			commit('SAVE_INFO',obj)
	    },
	    avatar:({ commit },avatarUrl)=>{
	    	commit('SAVE_AVATAR',avatarUrl)
	    }
	}
})
export default store
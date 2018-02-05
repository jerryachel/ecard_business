<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from './service/axios.js'
export default {
    name: 'app',
    mounted(){
        //有session时获取用户账号信息
        if (this.$store.state.user_info.session) {        
            this.$store.dispatch('user_account',this.$store.state.user_info.session)
        }else {
        //无session时验证路由权限
            if (this.$route.meta.requiresAuth) {
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style lang="scss">
html,body,#app{
    min-width: 1000px;
    width:100%;
    height:100%;
    font-family: "Microsoft YaHei";
    font-size:14px;
    color: #333;
    background: #F2F6FA;
}
.el-button--primary{
    background-color: $blue;
    border-color: $blue;
    &:focus,&:hover{
      background-color: $blue_hover;
      border-color: $blue_hover;
    }
}
</style>

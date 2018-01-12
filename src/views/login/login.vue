<template>
	<div class="login">
		<login-nav></login-nav>
	</div>
</template>

<script>
import loginNav from './header.vue'
export default {
	data () {
		return {
			msg: ''
		}
	},
	components:{
		loginNav:loginNav
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../assets/css/index.scss';
.login{

}
</style>

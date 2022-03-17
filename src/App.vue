<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'App',
	mounted() {
		const session = sessionStorage.getItem('project');
		if(session) {
			this.createTodoFromSession(JSON.parse(session))
			this.$router.push('/todo');
			return
		}
		this.$router.push('/')
	},
	methods: {
		...mapActions({
			createTodoFromSession: 'todos/createTodoFromSession',
		})
	}
}
</script>
<style>
body {
	margin: 0;
	padding: 0;
	background-color: #F8F9FC;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}
</style>

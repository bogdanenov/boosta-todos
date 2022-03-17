<template>
	<div class="todo">
		<div class="todo__header mb-4">
			<div class="todo__name" @click.prevent="toHome">
				<img class="mr-3" src="../assets/logo.png" alt="logo">
				<h2 v-if="!stateRename" @click.prevent="stateRename = true">{{todo.name}}</h2>
				<div class="todo__change" v-else>
					<my-form-group 
						:id="'name'"
						:type="'text'"
						:classInput="'form-control'"
						:placeholder="'Enter project name'"
						:value="todo.name"
						:f="changeNameProject"
					></my-form-group>
					<my-button class="btn-link mt-2" @click.prevent="stateRename = false">Save</my-button>
				</div>
			</div>
			<div class="btn-group" role="group">
				<my-button type="button" class="btn-secondary" @click="exportConfig(todo)">Export</my-button>
			</div>
		</div>
		<todo-list :list="todo.taskList"></todo-list>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'Todo',
	components: {
		TodoList
	},
	data() {
		return {
			stateRename: false
		}
	},
	mounted() {
		document.title = this.todo.name;
	},
	methods: {
		...mapActions({
			setCurrentTasks: 'todos/setCurrentTasks',
			setCurrentPath: 'todos/setCurrentPath',
			exportConfig: 'todos/exportConfig',
			changeNameProject: 'todos/changeNameProject',
		})
	},
	computed: {
		...mapGetters({
			todo: 'todos/getTodo',
		})
	},
}

</script>

<style lang="css" scoped>
.todo {
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.todo__header {
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
}
.todo__change {
	display: flex;
	justify-content: center;
	align-items: center;
}
.todo__name {
	display: flex;
	align-items: center;
}
.todo__name img {
	height: 40px;
}
.todo__name h2 {
	transition: text-decoration .3s ease;
	margin: 0;
}
.todo__name h2:hover {
	text-decoration: underline;
	cursor: pointer;
}
</style>

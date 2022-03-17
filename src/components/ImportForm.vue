<template>
  <form class="card" @submit.prevent="createProject">
		<div class="btn-group mb-3" role="group">
			<my-button  
				:class="[stateNewProject ? 'btn-secondary' : 'btn-dark']" 
				@click.prevent="changeStateNewProject(false)">Import</my-button>
			<my-button 
				:class="[stateNewProject ? 'btn-dark' : 'btn-secondary']" 
				@click.prevent="changeStateNewProject(true)">New Project</my-button>
		</div>
		<my-form-group 
			:id="'file'" 
			:type="'file'"
			:classInput="'form-control-file'"
			:placeholder="'file'"
			:f="createTodoFromConfig"
			v-if="!stateNewProject">
			Select config
		</my-form-group>
		<my-form-group 
			:id="'name'"
			:type="'text'"
			:classInput="'form-control'"
			:placeholder="'Enter project name'"
			:f="createTodoFromInput"
			v-else>
			Name project
		</my-form-group>
		<my-button type="submit" class="btn btn-primary" 
			:disabled="!todo.name" 
		>Create</my-button>
	</form>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import MyFormGroup from './UI/MyFormGroup.vue';

export default defineComponent ({
  components: { MyFormGroup },
  name: 'ImportForm',
	data() {
		return {
			stateNewProject: false,
		}
	},
	computed: {
		...mapGetters({
			todo: 'todos/getTodo'
		})
	},
	methods: {
		createProject() {
			this.$router.push('/todo');
			this.updateTodo(this.todo);
		},
		changeStateNewProject(value) {
			this.clearTodo();
			this.stateNewProject = value
		},
		...mapActions({
			createTodoFromConfig: 'todos/createTodoFromConfig',
			createTodoFromInput: 'todos/createTodoFromInput',
			updateTodo: 'todos/updateTodo',
			clearTodo: 'todos/clearTodo',
		})
	}
})
</script>

<style scoped>

	form {
		background-color: #FFF;
		width: 350px;
	}
	.card {
		padding: 25px;
	}
	.btn-group {
		display: flex;
		justify-content: space-between;
	}
	.btn-group button {
		width: 50%;
	}
	
</style>

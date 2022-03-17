<template>
  <div class="list">
		<div class="options mb-4">
			<div class="search">
				<my-form-group 
					:id="'search'" 
					:type="'text'"
					:classInput="'form-control'"
					:placeholder="'Enter task name'"
					:value="searchText"
					:f="updateSearchText"
					>
					Search:
				</my-form-group>
			</div>
			<div class="filter">
				<label class="my-1 mr-2" for="filter">Filter</label>
				<select class="custom-select my-1 mr-sm-2" id="filter" v-model="filter">
					<option selected value="-1">All</option>
					<option value="1">Done</option>
					<option value="0">In progress</option>
				</select>
			</div>
		</div>
		<transition-group name="list">
			<div class="empty" v-if="!list.length">List is empty</div>
			<div class="list-group-item" 
				v-for="(value) in list" :key="value.id" 
				:class="{'list-group-item-secondary': value.completed}"
				v-show="value.name.toLowerCase().includes(searchText.toLowerCase())
				&& filter == -1 || filter == value.completed"
				@click="openModal(value)">
				<span :class="{'done': value.completed}">{{value.name}}</span>
				<my-button class="btn-link" 
					@click.stop="setState(value.id)">{{value.completed ? 'Cancel' : "Mark as done" }}</my-button>
			</div>
		</transition-group>
		<my-button type="button" class="btn-primary mt-4" @click="newTask">New Task</my-button>
	</div>
	<teleport to='body'>
		<div class="modal fade" 
			:class="{'show': modalState, 'd-block': modalState}" 
			id="modal" tabindex="-1" role="dialog" 
			aria-labelledby="modalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="modalLabel" 
							v-if="!stateRename" @click.prevent="stateRename = true">
							{{task.name}}</h5>
						<div class="todo__change" v-else>
							<my-form-group 
								:id="'name_task'"
								:type="'text'"
								:classInput="'form-control'"
								:placeholder="'Enter task name'"
								:value="task.name"
								:f="changeSelectedTaskName"
							></my-form-group>
							<my-button class="btn-link mt-2" @click.prevent="stateRename = false">Save</my-button>
						</div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" 
							@click="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>Create: <span>{{date}}</span></p>
						<p>Last modified: <span class="text-secondary">{{modified}}</span></p>
						<p>Status: <span :class="[task.completed ? 'text-success' : 'text-warning']">
							{{task.completed ? "Done" : "In process"}}</span>
						</p>
						<div class="form-group">
							<label for="comment">Description</label>
							<textarea class="form-control" id="comment" rows="3" 
								:value="task.comment" @input="changeTaskComment"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<my-button class="btn-danger" 
							@click.prevent="removeTask(task.id)">Delete task</my-button>
						<my-button class="btn-secondary" 
							@click.prevent="closeModal">Close</my-button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade" :class="{'show': modalState, 'd-none': !modalState}"></div>
	 </teleport>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import moment from "moment";
import Swal from 'sweetalert2'
import MyButton from './UI/MyButton.vue';

export default defineComponent ({
  components: { MyButton },
  name: 'TodoList',
	props: {
		list: Array
	},
	data() {
		return {
			modalState: false,
			stateRename: false,
			searchText: '',
			filter: -1
		}
	},
	computed: {
		date() {
			return moment.unix(this.task.date).format("MM/DD/YYYY HH:mm:ss");
		},
		modified() {
			return moment.unix(this.task.lastModified).fromNow();
		},
		...mapGetters({
			todo: 'todos/getTodo',
			task: 'todos/getTask',
		})
	},
	methods: {
		updateSearchText(e) {
			this.searchText = e.target.value;
		},
		removeTask(id) {
			this.deleteTask(id)
			this.closeModal();
		},
		setState(id) {
			this.changeTaskState(id);
		},
		openModal(task) {
			this.modalState = true;
			this.changeSelectedTask(task);
		},
		closeModal() {
			this.modalState = false;
			this.changeSelectedTask({});
		},
		newTask() {
			this.searchText = ''
			Swal.fire({
				title: 'Enter a new task',
				input: 'text',
				inputAttributes: {
					autocapitalize: 'off'
				},
				showCancelButton: true,
				confirmButtonText: 'Save',
				showLoaderOnConfirm: true,
				preConfirm: (value) => {
					this.addNewGlobalTask(value);
				}
			})
		},
		...mapActions({
			changeTaskState: 'todos/changeTaskState',
			changeSelectedTask: 'todos/changeSelectedTask',
			changeSelectedTaskName: 'todos/changeSelectedTaskName',
			changeTaskComment: 'todos/changeTaskComment',
			deleteTask: 'todos/deleteTask',
			addNewGlobalTask: 'todos/addNewGlobalTask'
		})
	}
})
</script>

<style scoped>
.list {
	width: 100%;
}
.todo__change {
	display: flex;
	justify-content: center;
	align-items: center;
}
.list-group-item {
	cursor: pointer;
	transition: background-color .3s ease;
	display: flex;
	justify-content: space-between;
	align-items: center;
	opacity: .7;
	transition: opacity .3s ease;
}

.list-group-item:hover {
	opacity: 1;
}
.done {
	text-decoration: line-through;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

import moment from "moment";
import { readFiles } from "./../../utils/files";

function updateSession(todo) {
	sessionStorage.setItem("project", JSON.stringify(todo));
}

export default {
	state: {
		todo: {
			name: "",
			taskList: [],
		},
		selectedTask: {},
	},
	mutations: {
		updateTodo(state, todo) {
			state.todo = todo;
			updateSession(state.todo);
		},
		updateSelectedTask(state, task) {
			state.selectedTask = task;
		},
		updateGlobalTask(state, task) {
			state.todo.taskList.push(task);
			updateSession(state.todo);
		},
		updateName(state, name) {
			state.todo.name = name;
			document.title = state.todo.name;
			updateSession(state.todo);
		},
		updateTaskState(state, id) {
			state.todo.taskList.forEach((task) => {
				if (task.id === id) {
					const unix = moment().unix();
					task.lastModified = unix;
					task.completed = !task.completed;
				}
			});
			updateSession(state.todo);
		},
		updateTaskName(state, name) {
			state.selectedTask.name = name;
			state.todo.taskList.forEach((task) => {
				if (task.id === state.selectedTask.id) {
					const unix = moment().unix();
					task.lastModified = unix;
					task = state.selectedTask;
				}
			});
			updateSession(state.todo);
		},
		updateTaskComment(state, comment) {
			state.selectedTask.comment = comment;
			state.todo.taskList.forEach((task) => {
				if (task.id === state.selectedTask.id) {
					const unix = moment().unix();
					task.lastModified = unix;
					task = state.selectedTask;
				}
			});
			updateSession(state.todo);
		},
		deleteTask(state, id) {
			state.todo.taskList = state.todo.taskList.filter(
				(task) => task.id !== id
			);
			updateSession(state.todo);
		},
	},
	actions: {
		async createTodoFromConfig(ctx, e) {
			const files = e.target.files;
			const config = await readFiles(files);
			ctx.commit("updateTodo", config);
		},
		createTodoFromInput(ctx, e) {
			ctx.commit("updateTodo", {
				name: e.target.value,
				taskList: [],
			});
		},
		createTodoFromSession(ctx, todo) {
			ctx.commit("updateTodo", todo);
		},
		clearTodo(ctx) {
			ctx.commit("updateTodo", {
				name: "",
				taskList: [],
			});
		},
		updateTodo(ctx, todo) {
			ctx.commit("updateTodo", todo);
		},
		exportConfig(ctx, todo) {
			const dataStr =
				"data:text/json;charset=utf-8," +
				encodeURIComponent(JSON.stringify(todo));
			const a = document.createElement("a");
			a.setAttribute("href", dataStr);
			a.setAttribute("download", "config.json");
			a.click();
		},
		changeNameProject(ctx, e) {
			ctx.commit("updateName", e.target.value);
		},
		addNewGlobalTask(ctx, value) {
			const unix = moment().unix();
			const task = {
				id: unix,
				name: value,
				date: unix,
				lastModified: unix,
				completed: false,
				taskList: [],
				comment: "",
			};
			ctx.commit("updateGlobalTask", task);
		},
		changeTaskState(ctx, id) {
			ctx.commit("updateTaskState", id);
		},
		changeSelectedTask(ctx, task) {
			ctx.commit("updateSelectedTask", task);
		},
		changeSelectedTaskName(ctx, e) {
			ctx.commit("updateTaskName", e.target.value);
		},
		deleteTask(ctx, id) {
			ctx.commit("deleteTask", id);
		},
		changeTaskComment(ctx, e) {
			ctx.commit("updateTaskComment", e.target.value);
		},
	},
	getters: {
		getTodo(state) {
			return state.todo;
		},
		getTask(state) {
			return state.selectedTask;
		},
	},
	namespaced: true,
};

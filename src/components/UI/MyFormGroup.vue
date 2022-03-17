<template>
	<div class="form-group">
		<label :for="id" class="form-label">
			<slot></slot>
		</label>
		<input :value="value" :type="type" :class="classInput" :id="id" :placeholder="placeholder"
			@input.prevent="f">
	</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name:'my-form-group',
	props: {
		id: String,
		type: String,
		classInput: String,
		placeholder: String,
		f: Function,
		value: String,
	},
	methods: {
		updateInput(event) {
			this.$emit('update:value', event)
		}
	}
})
</script>
<template>
	<button type="button" class="btn">
		<slot></slot>
	</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name:'my-button'
})
</script>
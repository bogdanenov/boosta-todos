<template>
	<div class="home">
		<div class="logo mb-5">
			<img src="../assets/logo.png" alt="logo">
			<h1 class="logo__title">TODO</h1>
		</div>
		<import-form></import-form>
	</div>
</template>

<script>

import ImportForm from '@/components/ImportForm.vue';
export default {
  name: 'Home',
	components: {
		ImportForm
	},
	mounted() {
		document.title = "Import or create project"
	}
}

</script>

<style lang="css" scoped>
	.home {
		display: flex;
		justify-content: center;
		padding: 50px 0;
		flex-direction: column;
		align-items: center;
	}
	.logo {
		display: flex;
		flex-direction: column;
	}
	.logo__title {
		margin: 0;
		padding: 0;
		text-align: center;
	}
</style>

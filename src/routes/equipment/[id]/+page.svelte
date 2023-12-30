<script>
	import { page } from '$app/stores';
	import { equipment, categories } from '$lib/equipment.js';
	const id = $page.params.id;

	$: item = equipment.find((item) => item.id === id);
</script>

<h1 class="title">Equipment</h1>

<article class="equipment-item">
	<header><h2 style:--title="title-{item.id}">{item.name}</h2></header>
	<p style:--description="description-{item.id}">{item.description}</p>
	<footer>
		<div class="category-icons">
			{#each item.categories as catId, index}
				<iconify-icon icon={categories.find((cat) => cat.id === catId).icon} />
			{/each}
		</div>
	</footer>
</article>

<style>
	.equipment-item {
		& h2 {
			view-transition-name: var(--title);
		}
	}
</style>

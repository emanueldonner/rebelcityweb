<script>
	import { equipment, categories } from '$lib/equipment.js'; // Adjust the path as needed
	import 'iconify-icon';

	let selectedCategories = categories.map((cat) => cat.id); // Select all categories by default
	let filteredEquipment = filterEquipment();
	function onEquipmentClick(item) {
		console.log('Equipment clicked:', item.name);
	}

	function filterEquipment() {
		// Filter equipment based on selected categories
		const fEquipment = equipment.filter((item) => {
			// Return true if any of the item's categories are in selectedCategories
			return item.categories.some((cat) => selectedCategories.includes(cat));
		});

		console.log('fEquipment', fEquipment);
		return fEquipment;
	}

	function onCategorySelect(categoryId) {
		if (selectedCategories.includes(categoryId)) {
			selectedCategories = selectedCategories.filter((cat) => cat !== categoryId);
		} else {
			selectedCategories = [...selectedCategories, categoryId];
		}
		filteredEquipment = filterEquipment();
	}
	// Reactive statement to filter equipment based on selected categories
</script>

<h1 class="title">Equipment</h1>

<div class="grid">
	{#each categories as category}
		<button
			class="filter-button {selectedCategories.includes(category.id) ? '' : 'outline'}"
			on:click={() => onCategorySelect(category.id)}
		>
			<iconify-icon icon={category.icon} />
			{category.name}
		</button>
	{/each}
</div>

<div class="equipment-container">
	{#each filteredEquipment as item}
		<article class="equipment-item">
			<a href="/equipment/{item.id}">
				<header><h4 style:--title="title-{item.id}">{item.name}</h4></header>
				<p style:--description="description-{item.id}">{item.description}</p>
				<footer>
					<div class="category-icons">
						{#each item.categories as catId, index}
							<iconify-icon icon={categories.find((cat) => cat.id === catId).icon} />
						{/each}
					</div>
				</footer>
			</a>
		</article>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.filter-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.equipment-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
	}

	a {
		text-decoration: none;
	}

	.equipment-item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		& h4 {
			margin: 0;
			view-transition-name: var(--title);
		}
		& p {
			margin: 0;
			view-transition-name: var(--description);
		}
	}

	.category-icons {
		display: flex;
		gap: 0.5rem;
	}
</style>

<script>
	import '@picocss/pico';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	const navLinks = [
		{ name: 'Rules', href: '/rules' },
		{ name: 'Factions', href: '/factions' },
		{ name: 'Equipment', href: '/equipment' }
	];

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<nav class="container">
	<ul>
		<li><a href="/">Home</a></li>
	</ul>
	<ul>
		{#each navLinks as item}
			<li>
				<a href={item.href} class:active={$page.url.pathname.includes(item.href)}>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
<main class="container">
	<slot />
</main>

<style>
	.active {
		color: #ff0000;
	}
</style>

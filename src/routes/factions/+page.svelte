<script>
	import { factions } from '$lib/factions.js';
	import 'iconify-icon';

	function onFactionClick(faction) {
		console.log('Faction clicked:', faction.title);
	}
</script>

<h1 class="title">Factions</h1>
<div class="factions-container">
	{#each factions as faction}
		<!-- svelte-ignore a11y-interactive-supports-focus -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<article class="faction">
			<header>
				<iconify-icon class="icon" icon={faction.icon} alt={faction.title} />
				<h4 style="color: {faction.primaryColor};">
					{faction.title}
				</h4>
			</header>
			<p class="description">{faction.description}</p>
			<p class="benefits"><strong>Benefits:</strong> {faction.benefits}</p>
			<ul class="sub-factions">
				{#each faction.subFactions as subFaction}
					<li>{subFaction.title}</li>
				{/each}
			</ul>
		</article>
	{/each}
</div>

<style>
	.factions-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1rem;
	}

	.faction {
		max-width: 100%;
	}

	header {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	h4 {
		margin: 0;
	}
</style>

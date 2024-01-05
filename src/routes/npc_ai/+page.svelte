<script>
	import 'iconify-icon';
	import { npcAI } from '$lib/npc_AI.js';
</script>

<div class="container">
	<h1>NPC AI</h1>
	<h2>AI States</h2>
</div>
<div class="npc-ai-container container">
	{#each Object.entries(npcAI) as [state, details]}
		<article>
			<header>
				<iconify-icon icon={details.icon} />
				{state}
			</header>
			<div class="article-body">
				<p>
					<strong>Behavior:</strong>
					{state === 'Idle' ? details.behaviors.join(', ') : details.behavior}
				</p>
				<p><strong>Trigger:</strong> {details.trigger}</p>
			</div>
		</article>
	{/each}
</div>

<style>
	.npc-ai-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
	}

	article {
		flex: 1 1 300px;
		margin: 0;
		/* padding: 2rem; */
	}

	article header {
		display: flex;
		align-items: center;
		padding: 1rem 2rem;
		font-size: 1.2rem;
	}

	article header iconify-icon {
		margin-right: 0.5rem;
	}

	/* article .article-body {
		margin-top: 1rem;
		padding: 1rem;
	} */

	article .article-body p + p {
		margin-top: 0.5rem;
	}
</style>

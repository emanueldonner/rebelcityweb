<script>
	import { createAvatar } from '@dicebear/core';
	import { openPeeps } from '@dicebear/collection';

	// Function to generate a random string as seed
	export let seed;
	// Create an avatar with a random seed
	$: avatar = createAvatar(openPeeps, { seed }).toDataUriSync();
</script>

{#if seed}
	<div class="container avatar-container">
		<img class="avatar" src={avatar} alt="avatar" />
	</div>
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
	}
</style>

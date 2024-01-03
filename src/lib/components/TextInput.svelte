<script>
	export let value;
	export let type;
</script>

<div class="input-container">
	{#if type === 'number'}
		<input class="text-input" type="number" bind:value />
	{:else if type === 'textarea'}
		<textarea class="textarea-input" bind:value />
	{:else}
		<input class="text-input" type="text" bind:value />
	{/if}
</div>

<style>
	.input-container {
		border-radius: 0.25em;
		cursor: pointer;
		height: 3.3rem;
		position: relative;
	}
	.input-container:has(.textarea-input) {
		height: 7rem;
	}
	.textarea-input,
	.text-input {
		/* border: 1px solid #ccc; */
		border-radius: inherit;
		display: grid;
		inset: 1px;
		width: calc(100% - 2px) !important;
		height: calc(100% - 2px) !important;
		/* padding: 1em; */
		position: absolute;
		resize: none;
	}

	.input-container:before {
		background: var(--border-gradient);
		border-radius: inherit;
		content: '';
		inset: 0px;
		opacity: 0;
		position: absolute;
		transition: all 400ms;
		z-index: 0;
		animation: animatedgradient 3s ease alternate infinite;
		background-size: 300% 300%;
	}
	.input-container:hover:before,
	.input-container:has(input:focus):before,
	.input-container:has(textarea:focus):before {
		opacity: 1;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border: none;
	}
	@keyframes animatedgradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>

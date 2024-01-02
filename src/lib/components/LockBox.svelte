<script>
	import 'iconify-icon';
	export let lockState;
	export let lockId;

	$: lockIcon = lockState ? 'material-symbols:lock' : 'material-symbols:lock-open';
</script>

<div class="lock-box">
	<input id={lockId} type="checkbox" bind:checked={lockState} />
	<label for={lockId}>
		<iconify-icon class="lock-icon" icon={lockIcon} />
	</label>
</div>

<style>
	.lock-box {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 1.8rem;
		height: 1.8rem;
	}

	.lock-box label {
		cursor: pointer;
		margin: 0;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
	}

	.lock-box label .lock-icon {
		font-size: 1.4rem;
		transition: color 0.3s ease;
	}

	.lock-box input {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.lock-box input:checked + label {
		color: var(--highlight-color);
	}
</style>

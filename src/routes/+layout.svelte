<script>
	import '@picocss/pico';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const navLinks = [
		{ name: 'Rules', href: '/rules' },
		{ name: 'Factions', href: '/factions' },
		{ name: 'Research', href: '/research' },
		{ name: 'Equipment', href: '/equipment' },
		{ name: 'Character Creation', href: '/characters/creation' }
	];

	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function handleLinkClick() {
		isMobileMenuOpen = false;
	}

	onMount(() => {
		function handleResize() {
			if (window.innerWidth > 768) {
				isMobileMenuOpen = false;
			}
		}

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

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

<div class="nav-container container-fluid">
	<nav class="container">
		<ul>
			<li><a href="/">Home</a></li>
		</ul>

		<ul>
			<li>
				<button class="burger-menu" on:click={toggleMobileMenu}>
					<div class="burger-icon" class:open={isMobileMenuOpen}>
						<span></span><span></span>
					</div>
				</button>
			</li>
			<div class="desktop-menu">
				{#each navLinks as link}
					<li>
						<a href={link.href} class:active={$page.url.pathname.includes(link.href)}>
							{link.name}
						</a>
					</li>
				{/each}
			</div>
		</ul>
		{#if isMobileMenuOpen}
			<div class="mobile-menu-overlay">
				<div class="mobile-menu">
					{#each navLinks as link}
						<a
							class="menu-item"
							href={link.href}
							class:active={$page.url.pathname === link.href}
							on:click={handleLinkClick}>{link.name}</a
						>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
</div>
<main class="container-fluid">
	<slot />
</main>

<style>
	.nav-container {
		background: rgba(0, 0, 0, 0.8);
	}
	.active {
		color: var(--highlight-color);
	}

	.burger-menu {
		display: none;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.burger-icon {
		display: grid;
		gap: 8px;
		transform: rotate(0deg);
		transition: transform 0.3s ease;
	}

	.burger-icon span {
		display: block;
		width: 25px;
		height: 2px;
		background-color: var(--primary);
		transition: all 0.3s ease;
	}

	.burger-icon.open span:nth-child(1) {
		transform: translateY(5px) rotate(-45deg);
	}

	.burger-icon.open span:nth-child(2) {
		transform: translateY(-5px) rotate(45deg);
	}

	.mobile-menu-overlay {
		position: absolute;
		z-index: 10;
		top: 50px;
		left: 0;
		width: 100%;
		height: calc(100vh - 50px);
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		/* align-items: center; */
	}

	.mobile-menu {
		padding: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	.menu-item {
		display: block;
		font-size: 2.5rem;
	}

	@media (max-width: 768px) {
		nav .desktop-menu {
			display: none;
		}

		.burger-menu {
			display: block;
		}
	}
</style>

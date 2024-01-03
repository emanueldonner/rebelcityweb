<script>
	import { researchTree } from '$lib/research.js';
	import { researchTreeStore } from '$lib/stores.js';
	import { onMount, onDestroy } from 'svelte';
	import 'iconify-icon';

	$: researchTreeStore.set(researchTree);

	let projectElements = {};
	let lines = [];
	let modalContent = null;
	let sidebarExpanded = true;

	function updateLines() {
		lines = [];
		$researchTreeStore.forEach((project) => {
			const startElement = projectElements[project.title];
			if (startElement) {
				project.leads_to.forEach((dependentTitle) => {
					const endElement = projectElements[dependentTitle];
					if (endElement) {
						const startRect = startElement.getBoundingClientRect();
						const endRect = endElement.getBoundingClientRect();
						lines.push({
							x1: startRect.left + startRect.width / 2,
							y1: startRect.top + startRect.height / 2,
							x2: endRect.left + endRect.width / 2,
							y2: endRect.top + endRect.height / 2
						});
					}
				});
			}
		});
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateLines);
			setTimeout(updateLines, 0); // Delay to ensure elements are rendered
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateLines);
		}
	});
	// Group projects by branch and then by tier
	$: branches = $researchTreeStore.reduce((acc, project) => {
		if (!acc[project.branch]) {
			acc[project.branch] = {};
		}
		const branch = acc[project.branch];
		if (!branch[project.tier]) {
			branch[project.tier] = [];
		}
		branch[project.tier].push(project);
		return acc;
	}, {});

	const isUnlocked = (project) => {
		return project.depends_on?.every(
			(dependency) => $researchTreeStore.find((p) => p.title === dependency)?.completed
		);
	};

	function showProjectModal(project) {
		modalContent = project;
	}

	function hideProjectModal() {
		modalContent = null;
	}

	function uncompleteDependentProjects(projectTitle, currentTree) {
		currentTree.forEach((project) => {
			if (project.depends_on.includes(projectTitle) && project.completed) {
				project.completed = false; // Uncomplete the dependent project
				uncompleteDependentProjects(project.title, currentTree); // Recursive call for further dependencies
			}
		});
	}

	function isProjectUnlocked(project) {
		return project.depends_on?.every(
			(dependency) => $researchTreeStore.find((p) => p.title === dependency)?.completed
		);
	}

	function toggleProjectStatus(projectTitle) {
		researchTreeStore.update((currentTree) => {
			return currentTree.map((project) => {
				if (project.title === projectTitle) {
					// Check if the project is unlocked and not completed before toggling
					if (!project.completed && !isProjectUnlocked(project)) {
						return project; // Do not change the status if the project is locked
					}
					const newCompletedStatus = !project.completed;
					if (!newCompletedStatus) {
						uncompleteDependentProjects(projectTitle, currentTree);
					}
					return { ...project, completed: newCompletedStatus };
				}
				return project;
			});
		});
	}

	$: tierCompletionStatus = $researchTreeStore.reduce((acc, project) => {
		const { branch, tier, completed } = project;

		if (!acc[branch]) {
			acc[branch] = {};
		}
		if (acc[branch][tier] === undefined) {
			acc[branch][tier] = true; // Assume completed, will be falsified if any project is not completed
		}

		acc[branch][tier] = acc[branch][tier] && completed;
		return acc;
	}, {});

	$: totalPointsSpent = $researchTreeStore.reduce((total, project) => {
		if (project.completed) {
			return total + project.cost;
		}
		return total;
	}, 0);
</script>

<div class="main-container">
	<div class="container">
		<h1>Research Branches</h1>
		<div class="points-spent">
			<iconify-icon icon="material-symbols:experiment-outline"></iconify-icon>
			{totalPointsSpent}
		</div>
	</div>
	<div class="research-container">
		{#each Object.entries(branches) as [branchName, tiers]}
			<article class={`branch ${branchName}`}>
				<h2>{branchName}</h2>
				{#each Object.entries(tiers) as [tierName, projects]}
					<article
						class={`tier ${tierName} ${
							tierCompletionStatus[branchName] && tierCompletionStatus[branchName][tierName]
								? 'tier-complete'
								: ''
						}`}
					>
						<h3>{tierName}</h3>
						<div class="tier-group">
							{#each projects as project}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<button
									tabindex="0"
									class={`research-item ${isUnlocked(project) ? '' : 'locked'} ${
										project.completed ? 'completed' : ''
									}`}
									on:click={() => toggleProjectStatus(project.title)}
									on:mouseover={() => showProjectModal(project)}
									on:mouseleave={hideProjectModal}
									on:focus={() => showProjectModal(project)}
								>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<div bind:this={projectElements[project.title]} class="project-sphere"></div>
									<div class="title">{project.title}</div>
								</button>
							{/each}
						</div>
					</article>
				{/each}
			</article>
		{/each}
	</div>
</div>

<style>
	.research-container {
		flex-grow: 1;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		text-align: center;
		/* flex-direction: column; */
		background: transparent;

		padding: 1rem;
	}

	h2 {
		margin: 0.3rem 0;
		color: var(--primary);
	}
	h3 {
		text-transform: capitalize;
		margin: 0.3rem 0;
	}

	.branch {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		min-width: 40%;
		background-color: rgba(255, 255, 255, 0.02);
	}
	.tier {
		border: 1px dashed rgba(255, 255, 255, 0.08);
		background-color: rgba(255, 255, 255, 0.02);
		padding: 0.5rem 1rem;
	}
	.tier-complete {
		border: 1px solid var(--primary);
		background-color: var(--background);
		clip-path: none;
	}
	.tier-group {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.research-item {
		margin: 1em 0;
		padding: 1em 0.5rem;
		border-radius: 4px;
		/* background-color: rgb(138, 215, 215); */
		color: #eee;
		cursor: pointer;
		/* transition: all 0.2s ease-in-out; */
	}
	.research-item.locked {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.research-item.locked:hover {
		background-color: var(--primary);
	}

	.research-item .project-sphere {
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		background-color: transparent;
		border: 3px solid rgb(138, 215, 215);
		display: inline-block;
	}

	.research-item.locked .project-sphere {
		background-color: transparent !important;
		border: 3px solid rgb(194, 194, 194);
	}

	.research-item.completed .project-sphere {
		background-color: rgb(138, 215, 215);
		border-color: rgb(138, 215, 215);
	}
</style>

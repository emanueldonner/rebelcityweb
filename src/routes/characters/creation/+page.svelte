<script>
	import { character } from '$lib/stores.js'; // Adjust the path to your store file
	import { onMount } from 'svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import LockBox from '$lib/components/LockBox.svelte';
	import { faker } from '@faker-js/faker';
	import 'iconify-icon';

	let pointsTotal = 27;
	let pointsUsed = 0;

	let isLoading = false;

	let lockName = false;
	let lockAvatar = false;
	let lockAge = false;
	let lockBackground = false;
	let lockAppearance = false;
	let lockAdditionalNotes = false;
	let lockStats = false;
	let lockSkills = false;
	let lockAbilities = false;
	let lockInventory = false;

	// Subscribe to the character store
	let char;
	character.subscribe(($character) => {
		char = $character;
		calculatePointsUsed();
	});

	// Function to calculate the cost of a point in stats
	function calculatePointCost(stat) {
		if (stat <= 13) {
			return stat - 8;
		} else {
			return 5 + 2 * (stat - 13);
		}
	}

	// Function to calculate the points used based on current stats
	function calculatePointsUsed() {
		pointsUsed = Object.values(char.stats).reduce((total, stat) => {
			return total + calculatePointCost(stat);
		}, 0);
	}

	// Function to handle change in stats
	function updateStat(statName, newValue) {
		// First, calculate the cost if the new value is applied
		const tempStats = { ...char.stats, [statName]: newValue };
		const newPointsUsed = Object.values(tempStats).reduce((total, stat) => {
			return total + calculatePointCost(stat);
		}, 0);

		// Check if the new points used exceed the total allowed
		if (newPointsUsed <= pointsTotal) {
			// If within limit, apply the change
			char.stats[statName] = newValue;
			pointsUsed = newPointsUsed;
			character.set(char);
		} else {
			// If it exceeds, do not apply the change
			// Optionally, you could provide feedback to the user here
		}
	}

	function randomizeStats() {
		let newStats = { ...char.stats };
		let newPointsUsed = 0;

		do {
			Object.keys(newStats).forEach((stat) => {
				newStats[stat] = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
			});
			newPointsUsed = Object.values(newStats).reduce((total, stat) => {
				return total + calculatePointCost(stat);
			}, 0);
		} while (newPointsUsed > pointsTotal);

		char.stats = newStats;
		pointsUsed = newPointsUsed;
		character.set(char);
	}

	// generate random seed
	function generateRandomSeed(length = 10) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}
	// Function to randomize character
	const randomizeCharacter = async () => {
		isLoading = true;
		// Randomize basic information
		if (!lockAvatar) {
			char.avatar = await generateRandomSeed();
		}
		if (!lockName) {
			// Fetch random name
			const response = await fetch('https://randomuser.me/api/');
			const data = await response.json();
			let nickname_part1 = faker.word.adjective();
			let nickname_part2 = faker.word.noun();
			// capitalize first letter of nickname
			nickname_part1 = nickname_part1.charAt(0).toUpperCase() + nickname_part1.slice(1);
			nickname_part2 = nickname_part2.charAt(0).toUpperCase() + nickname_part2.slice(1);

			char.name = `${data.results[0].name.first} "${nickname_part1} ${nickname_part2}" ${data.results[0].name.last}`;
		}

		if (!lockAge) {
			char.age = Math.floor(Math.random() * (99 - 18 + 1) + 18);
		}

		// Randomize background and appearance
		if (!lockBackground) {
			char.background = faker.person.bio();
			// capitalize every word
			char.background = char.background.replace(/\w\S*/g, (w) =>
				w.replace(/^\w/, (c) => c.toUpperCase())
			);
		}
		// Randomize stats
		if (!lockStats) {
			await randomizeStats();
		}
		// Randomize other fields similarly...
		// Note: You'll need to define the logic for randomizing skills, abilities, inventory, etc.

		await character.set(char);
		isLoading = false;
	};
</script>

<div class="container">
	<h1>Character Creator</h1>
	<form>
		<div class="form-row">
			<button
				class="random-button"
				aria-busy={isLoading ? 'true' : 'false'}
				aria-label="Randomize Character"
				disabled={isLoading}
				on:click={randomizeCharacter}
			>
				{#if !isLoading}
					<iconify-icon icon="ri:dice-line"></iconify-icon>
				{/if}
				Randomize
			</button>
		</div>
		<!-- Character Basic Information -->
		<div class="form-row">
			<fieldset class="profile-picture">
				<div class="avatar-container">
					<Avatar seed={char.avatar} />
					<LockBox lockId="lockAvatar" bind:lockState={lockAvatar} />
				</div>
			</fieldset>
			<fieldset>
				<label>
					Name:
					<input type="text" bind:value={char.name} />
					<LockBox lockId="lockName" bind:lockState={lockName} />
				</label>
				<label>
					Age:
					<input type="number" bind:value={char.age} min="18" max="99" />
					<LockBox lockId="lockAge" bind:lockState={lockAge} />
				</label>
			</fieldset>
		</div>

		<div class="form-row">
			<fieldset>
				<label>
					Background:
					<textarea bind:value={char.background}></textarea>
					<LockBox lockId="lockBackground" bind:lockState={lockBackground} />
				</label>
			</fieldset>
		</div>

		<!-- Stats -->
		<div class="form-row">
			<fieldset>
				<legend>Stats (Points Used: {pointsUsed}/{pointsTotal})</legend>

				<table role="grid">
					<LockBox lockId="lockStats" bind:lockState={lockStats} />
					<thead>
						<tr>
							<th>Stat</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.keys(char.stats) as stat}
							<tr>
								<td>{stat.charAt(0).toUpperCase() + stat.slice(1)}</td>
								<td>
									<input
										type="number"
										min="8"
										max="15"
										bind:value={char.stats[stat]}
										on:change={() => updateStat(stat, char.stats[stat])}
									/>
								</td>
							</tr>
						{/each}
						// show total sum of stats
					</tbody>
				</table>
			</fieldset>

			<!-- Skills -->
			<fieldset>
				<legend>Skills</legend>
				<table>
					<thead>
						<tr>
							<th>Skill</th>
							<th>Rating</th>
							<th>Specializations</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.keys(char.skills) as skill}
							<tr>
								<td>{skill.charAt(0).toUpperCase() + skill.slice(1)}</td>
								<td>
									<input
										type="number"
										bind:value={char.skills[skill].rating}
										on:change={() =>
											updateField('skills', skill, {
												...char.skills[skill],
												rating: char.skills[skill].rating
											})}
									/>
								</td>
								<td>
									{#each char.skills[skill].specializations as specialization, index}
										<input
											type="text"
											bind:value={specialization}
											on:change={() => updateArrayField('skills', skill, index, specialization)}
										/>
									{/each}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</fieldset>
		</div>
		<div class="form-row">
			<!-- Abilities -->
			<fieldset>
				<legend>Abilities</legend>
				<div>
					<strong>Strengths:</strong>
					{#each char.abilities.strengths as strength, index}
						<label>
							Strength {index + 1}:
							<input
								type="text"
								bind:value={strength}
								on:change={() => updateArrayField('abilities', 'strengths', index, strength)}
							/>
						</label>
					{/each}
				</div>
				<div>
					<strong>Weaknesses:</strong>
					{#each char.abilities.weaknesses as weakness, index}
						<label>
							Weakness {index + 1}:
							<input
								type="text"
								bind:value={weakness}
								on:change={() => updateArrayField('abilities', 'weaknesses', index, weakness)}
							/>
						</label>
					{/each}
				</div>
			</fieldset>
			<!-- Inventory -->
			<fieldset>
				<legend>Inventory</legend>
				{#each Object.keys(char.inventory) as itemCategory}
					<div>
						<strong>{itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1)}:</strong>
						{#each char.inventory[itemCategory] as item, index}
							<label>
								{itemCategory.slice(0, -1)}
								{index + 1}:
								<input
									type="text"
									bind:value={item}
									on:change={() => updateArrayField('inventory', itemCategory, index, item)}
								/>
							</label>
						{/each}
					</div>
				{/each}
			</fieldset>
		</div>

		<div class="form-row">
			<!-- Additional Notes -->
			<fieldset>
				<label>
					Appearance:
					<textarea bind:value={char.appearance}></textarea>
				</label>
				<label
					>Additional Notes
					<textarea bind:value={char.additionalNotes}></textarea>
				</label>
			</fieldset>
		</div>

		<!-- Submit Button -->
		<button type="submit">Save Character</button>
	</form>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	.form-row {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 1rem;
		width: 100%;
		& fieldset {
			width: 100%;
			position: relative;
			& label {
				position: relative;
			}

			& input {
				width: 100%;
			}
		}
	}

	.random-button {
		/* background: transparent; */
		border: none;
		font-size: 1.6rem;
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: center;
	}

	.profile-picture {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.avatar-container {
		width: 180px;
		height: 180px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3px solid var(--primary);
		background-color: var(--background);
		position: relative;
	}

	table {
		width: 100%;
	}

	table tr td {
		padding: 0;

		& input {
			margin: 0;
		}
	}

	@media (max-width: 768px) {
		.form-row {
			flex-direction: column;
		}
	}
</style>

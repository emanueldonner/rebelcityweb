<script>
	import { character } from '$lib/stores.js'; // Adjust the path to your store file
	import { onMount } from 'svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import LockBox from '$lib/components/LockBox.svelte';
	import AbilityScoreBox from '$lib/components/AbilityScoreBox.svelte';
	import InputField from '$lib/components/TextInput.svelte';
	import { rollDice } from '$lib/utils.js';
	import { faker } from '@faker-js/faker';
	import 'iconify-icon';

	let pointsTotal = 0;
	// let pointsUsed = 0;

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
		// calculatePointsUsed();
	});

	// Function to calculate ability score modifier
	function calculateModifier(stat) {
		return Math.floor((stat - 10) / 2);
	}

	// // Function to calculate the cost of a point in stats
	// function calculatePointCost(stat) {
	// 	if (stat <= 13) {
	// 		return stat - 8;
	// 	} else {
	// 		return 5 + 2 * (stat - 13);
	// 	}
	// }

	// // Function to calculate the points used based on current stats
	// function calculatePointsUsed() {
	// 	pointsUsed = Object.values(char.stats).reduce((total, stat) => {
	// 		return total + calculatePointCost(stat);
	// 	}, 0);
	// }

	// // Function to handle change in stats
	// function updateStat(statName, newValue) {
	// 	// First, calculate the cost if the new value is applied
	// 	const tempStats = { ...char.stats, [statName]: newValue };
	// 	const newPointsUsed = Object.values(tempStats).reduce((total, stat) => {
	// 		return total + calculatePointCost(stat);
	// 	}, 0);

	// 	// Check if the new points used exceed the total allowed
	// 	if (newPointsUsed <= pointsTotal) {
	// 		// If within limit, apply the change
	// 		char.stats[statName] = newValue;
	// 		pointsUsed = newPointsUsed;
	// 		character.set(char);
	// 	} else {
	// 		// If it exceeds, do not apply the change
	// 		// Optionally, you could provide feedback to the user here
	// 	}
	// }

	// function randomizeStats() {
	// 	let newStats = { ...char.stats };
	// 	let newPointsUsed = 0;

	// 	do {
	// 		Object.keys(newStats).forEach((stat) => {
	// 			newStats[stat] = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
	// 		});
	// 		newPointsUsed = Object.values(newStats).reduce((total, stat) => {
	// 			return total + calculatePointCost(stat);
	// 		}, 0);
	// 	} while (newPointsUsed > pointsTotal);

	// 	char.stats = newStats;
	// 	pointsUsed = newPointsUsed;
	// 	character.set(char);
	// }

	// Function to roll 4d6 and drop the lowest
	function rollStat() {
		let rolls = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
		rolls.sort((a, b) => a - b); // Sort the rolls
		rolls.shift(); // Remove the lowest roll
		return rolls.reduce((total, current) => total + current, 0); // Sum the remaining rolls
	}

	// Function to calculate the total points from all stats
	function calculateTotalPoints() {
		return Object.values(char.stats).reduce((total, stat) => total + stat, 0);
	}

	// Function to randomize stats using the dice system
	function randomizeStats() {
		Object.keys(char.stats).forEach((stat) => {
			char.stats[stat] = rollStat();
		});
		pointsTotal = calculateTotalPoints();
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

<h1>Character Creator</h1>
<div class="container">
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
				<label for="name-input">
					Name:
					<InputField type="text" id="name-input" bind:value={char.name} />
					<LockBox lockId="lockName" bind:lockState={lockName} />
				</label>
				<label for="age-input">
					Age:
					<InputField type="number" id="age-input" bind:value={char.age} min="18" max="99" />
					<LockBox lockId="lockAge" bind:lockState={lockAge} />
				</label>
			</fieldset>
		</div>

		<div class="form-row">
			<fieldset>
				<label for="background-input">
					Background:
					<InputField type="textarea" id="background-input" bind:value={char.background} />
					<LockBox lockId="lockBackground" bind:lockState={lockBackground} />
				</label>
			</fieldset>
		</div>

		<!-- Stats -->
		<div class="form-row">
			<fieldset>
				<legend>Total Points: {pointsTotal}</legend>

				<div class="ability-score-container">
					{#each Object.keys(char.stats) as stat}
						<AbilityScoreBox
							statName={stat}
							statValue={char.stats[stat]}
							statModifier={calculateModifier(char.stats[stat])}
						/>
					{/each}
					<LockBox lockId="lockStats" bind:lockState={lockStats} />
				</div>
			</fieldset>
		</div>
		<div class="form-row">
			<!-- Skills -->
			<fieldset>
				<legend>Skills</legend>
				<table class="skill-table">
					<thead>
						<tr>
							<th>Prof</th>
							<th>Mod</th>
							<th>Skill</th>
							<th>Bonus</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.keys(char.skills) as skill}
							<tr>
								<td class="td-prof">
									<label for="prof-{skill}" class:active={char.skills[skill].proficient}>
										<iconify-icon
											icon={char.skills[skill].proficient
												? 'lucide:check-circle-2'
												: 'lucide:circle-dashed'}
										/>
									</label>
									<input
										id="prof-{skill}"
										type="checkbox"
										bind:checked={char.skills[skill].proficient}
									/>
								</td>
								<td class="td-mod">{char.skills[skill].ability.slice(0, 3).toUpperCase()}</td>
								<td class="td-skill" data-tooltip={char.skills[skill].description}>{skill}</td>
								<td class="td-bonus">
									{#if char.skills[skill].proficient}
										{#if calculateModifier(char.stats[char.skills[skill].ability.toLowerCase()]) >= 0}
											+{calculateModifier(char.stats[char.skills[skill].ability.toLowerCase()]) + 2}
										{:else}
											{calculateModifier(char.stats[char.skills[skill].ability.toLowerCase()]) + 2}
										{/if}
									{:else if calculateModifier(char.stats[char.skills[skill].ability.toLowerCase()]) >= 0}
										+{calculateModifier(char.stats[char.skills[skill].ability.toLowerCase()])}
									{:else}
										{calculateModifier(char.stats[char.skills[skill].ability.toLowerCase()])}
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
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
								<input type="text" bind:value={item} />
							</label>
						{/each}
					</div>
				{/each}
			</fieldset>
		</div>

		<div class="form-row">
			<!-- Additional Notes -->
			<fieldset>
				<label for="appearance-input">
					Appearance:
					<InputField type="textarea" id="appearance-input" bind:value={char.appearance} />
				</label>
				<label for="additional-notes-input">Additional Notes</label>
				<InputField type="textarea" id="additional-notes-input" bind:value={char.additionalNotes} />
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
		border: 1px solid var(--primary);
		border-image-source: var(--border-gradient);
		border-image-slice: 1;
		background-color: var(--background);
		position: relative;
	}

	.ability-score-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	table {
		max-width: 20rem;
	}
	table thead tr {
		border-bottom: 1px solid var(--primary);
	}
	table tr td,
	table tr th {
		padding: 0.3rem 0;
		border-bottom: none;

		& input {
			margin: 0;
		}
	}
	.td-prof {
		vertical-align: middle;
		text-align: center;
		& input {
			display: none;
		}
		& label {
			cursor: pointer;
			font-size: 1.2rem;
			margin: 0;
			margin-top: 4px;
			transition: all 0.2s ease-in-out;
			color: var(--background);
		}
		& label.active {
			color: var(--primary);
		}
	}
	.td-mod {
		font-family: 'Fira Sans Extra Condensed';
		font-weight: bold;
		color: #ffffff88;
	}
	.td-skill {
		font-size: 1.1rem;
	}
	.td-bonus {
		font-size: 1.2rem;
		font-weight: bold;
		text-align: right;
	}

	@media (max-width: 768px) {
		.form-row {
			flex-direction: column;
		}
	}
</style>

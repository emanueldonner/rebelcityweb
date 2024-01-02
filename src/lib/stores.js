import { writable } from 'svelte/store';

export const researchTreeStore = writable({});

export const character = writable({
	// Character Information
	name: '', // "Binki 'Shadow' Martinez"
	age: 0, // 28
	background: '', // "Former IT Specialist turned activist"
	factionAlignment: '', // "The Digital Front"
	personalGoals: [], // ["Expose corruption", "Ensure fair access to information"]

	// Stats
	stats: {
		strength: 0, // 10
		dexterity: 0, // 14
		constitution: 0, // 12
		intelligence: 0, // 16
		wisdom: 0, // 13
		charisma: 0 // 11
	},

	// Skills
	skills: {
		technicalSkills: {
			rating: 0, // 18
			specializations: [] // ["Hacking", "Surveillance Systems"]
		},
		socialSkills: {
			rating: 0, // 12
			specializations: [] // ["Encryption Communication", "Propaganda"]
		},
		strategicSkills: {
			rating: 0, // 14
			specializations: [] // ["Urban Tactics", "Resource Allocation"]
		},
		medicalSkills: {
			rating: 0, // 10
			specializations: [] // ["Basic First Aid"]
		},
		stealthSkills: {
			rating: 0, // 15
			specializations: [] // ["Covert Surveillance", "Infiltration"]
		}
	},

	// Abilities
	abilities: {
		strengths: [], // ["Technologically Savvy", "Strategic Thinker"]
		weaknesses: [] // ["Physically Average", "Less Effective in Direct Confrontations"]
	},

	// Inventory
	inventory: {
		communicationDevices: [], // ["Encrypted Smartphone", "Shortwave Radio"]
		firstAidKits: [], // ["Basic Medical Kit"]
		nonLethalEquipment: [], // ["Stealth Gear", "Electronic Jamming Devices"]
		otherItems: [] // ["Network of Informants", "Access to Restricted Digital Archives"]
	},

	// Additional Notes
	additionalNotes: '' // "Binki is known for their ability..."
});

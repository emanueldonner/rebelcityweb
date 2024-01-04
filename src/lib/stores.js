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
		Athletics: {
			description: 'Physical tasks like climbing, jumping, and swimming.',
			score: 0,
			proficient: false,
			ability: 'Strength'
		},
		Stealth: {
			description: 'Moving silently, hiding, and avoiding detection.',
			score: 0,
			proficient: false,
			ability: 'Dexterity'
		},
		'Sleight of Hand': {
			description:
				'Performing tasks that require dexterity and precision, such as pickpocketing or lockpicking.',
			score: 0,
			proficient: false,
			ability: 'Dexterity'
		},
		Acrobatics: {
			description: 'Maintaining balance, agility, and performing acrobatic stunts.',
			score: 0,
			proficient: false,
			ability: 'Dexterity'
		},
		Technology: {
			description: 'Handling modern gadgets, hacking, and IT skills.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Investigation: {
			description: 'Looking for clues, researching, and analyzing information.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Medicine: {
			description: 'Providing first aid, medical knowledge, and healthcare.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Mechanics: {
			description: 'Repairing, modifying, and creating mechanical devices.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Insight: {
			description: 'Judging motives and intentions, detecting lies or deception.',
			score: 0,
			proficient: false,
			ability: 'Wisdom'
		},
		'Urban Survival': {
			description: 'Navigating urban environments, finding resources.',
			score: 0,
			proficient: false,
			ability: 'Wisdom'
		},
		Perception: {
			description: 'Noticing subtle details, sensing danger, keen observation.',
			score: 0,
			proficient: false,
			ability: 'Wisdom'
		},
		Psychology: {
			description: 'Understanding human behavior, counseling, mental health awareness.',
			score: 0,
			proficient: false,
			ability: 'Wisdom'
		},
		Persuasion: {
			description: 'Convincing others, negotiation, inspiring people.',
			score: 0,
			proficient: false,
			ability: 'Charisma'
		},
		Intimidation: {
			description: 'Coercing others through threats or forceful tactics.',
			score: 0,
			proficient: false,
			ability: 'Charisma'
		},
		Deception: {
			description: 'Lying, disguising, and bluffing.',
			score: 0,
			proficient: false,
			ability: 'Charisma'
		},
		Communication: {
			description: 'Effective verbal and non-verbal communication, public speaking.',
			score: 0,
			proficient: false,
			ability: 'Charisma'
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

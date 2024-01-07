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
		intelligence: 0, // 10
		influence: 0, // 14
		agility: 0, // 12
		resilience: 0, // 16
		awareness: 0, // 13
		'tech aptitude': 0 // 11
	},

	// Skills
	skills: {
		Endurance: {
			description: 'Sustaining physical and mental efforts over long periods.',
			score: 0,
			proficient: false,
			ability: 'Resilience'
		},
		Hacking: {
			description: 'Gaining unauthorized access to systems and data.',
			score: 0,
			proficient: false,
			ability: 'Tech Aptitude'
		},
		Insight: {
			description: "Understanding people's motives and predicting behavior.",
			score: 0,
			proficient: false,
			ability: 'Awareness'
		},
		'Legal Knowledge': {
			description:
				'Knowledge of legal systems and civil rights, useful for navigating bureaucratic challenges.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Mechanics: {
			description: 'Repairing, creating, and modifying mechanical and electronic devices.',
			score: 0,
			proficient: false,
			ability: 'Tech Aptitude'
		},
		Negotiation: {
			description: 'Persuading, bargaining, resolving conflicts.',
			score: 0,
			proficient: false,
			ability: 'Influence'
		},
		Nimbleness: {
			description:
				'Performing agile movements and escaping constraints, reflecting quick reflexes and physical adaptability.',
			score: 0,
			proficient: false,
			ability: 'Agility'
		},
		Perception: {
			description:
				'Noticing details in the environment, detecting hidden threats or opportunities.',
			score: 0,
			proficient: false,
			ability: 'Awareness'
		},
		'Psychological Manipulation': {
			description: "Influencing others' thoughts and actions subtly.",
			score: 0,
			proficient: false,
			ability: 'Influence'
		},
		'Public Speaking': {
			description: 'Effectively communicating ideas to groups, inspiring others.',
			score: 0,
			proficient: false,
			ability: 'Influence'
		},
		'Research Analysis': {
			description: 'Gathering and interpreting information, understanding complex issues.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Sabotage: {
			description:
				'Disabling or destroying systems or structures strategically, including lockpicking.',
			score: 0,
			proficient: false,
			ability: 'Tech Aptitude'
		},
		'Sleight of Hand': {
			description:
				'Pickpocket, palm objects, and perform subtle movements with hands, often used for stealing or planting items without being noticed.',
			score: 0,
			proficient: false,
			ability: 'Agility'
		},
		Stealth: {
			description: 'Moving unseen and unheard, evading detection.',
			score: 0,
			proficient: false,
			ability: 'Agility'
		},
		Strategy: {
			description: 'Planning, logistics, tactical decision-making.',
			score: 0,
			proficient: false,
			ability: 'Intelligence'
		},
		Streetwise: {
			description:
				'Navigating urban environments, understanding local cultures and underground networks.',
			score: 0,
			proficient: false,
			ability: 'Awareness'
		},
		'Stress Resistance': {
			description: 'Maintaining composure and decision-making under pressure.',
			score: 0,
			proficient: false,
			ability: 'Resilience'
		},
		'Urban Survival': {
			description: 'Coping with harsh urban environments, finding resources.',
			score: 0,
			proficient: false,
			ability: 'Resilience'
		}
	},

	// Abilities
	abilities: {
		strengths: [], // ["Technologically Savvy", "Strategic Thinker"]
		weaknesses: [] // ["Physically Average", "Less Effective in Direct Confrontations"]
	},

	// Inventory
	inventory: {
		'communication devices': [], // ["Encrypted Smartphone", "Shortwave Radio"]
		'first aid kits': [], // ["Basic Medical Kit"]
		'non lethal equipment': [], // ["Stealth Gear", "Electronic Jamming Devices"]
		'other items': [] // ["Network of Informants", "Access to Restricted Digital Archives"]
	},

	// Additional Notes
	additionalNotes: '' // "Binki is known for their ability..."
});

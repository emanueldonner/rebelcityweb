export const npcAI = {
	Idle: {
		behaviors: ['Standing', 'Sitting', 'Patrolling'],
		trigger: "Random (e.g., dice roll or card draw at the start of NPC's turn)",
		icon: 'mdi:walk'
	},
	Suspicious: {
		behavior: 'Increases alertness, changes movement pattern towards the source of suspicion',
		trigger: 'Unusual noise, limited vision cone spotting, specific game events',
		icon: 'material-symbols:person-alert'
	},
	Alerted: {
		behavior: 'Actively seeks the player, calls for backup, or raises an alarm',
		trigger: 'Clear sight of a player, loud noise, specific game events',
		icon: 'ant-design:alert-filled'
	}
};

const {
	Client,
	CommandInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require('discord.js');

const { jobs } = require('@utils/utils');

const jobobj = Object.keys(jobs);
module.exports = {
	name: 'apply',
	description: 'Apply for a job in the tavern!',
	options: [
	],
	type: 'CHAT_INPUT',
	/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
	run: async (client, interaction) => {
		module.exports = jobs;
	},
};

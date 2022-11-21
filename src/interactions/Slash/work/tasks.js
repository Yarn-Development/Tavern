const {
	Client,
	CommandInteraction,
	MessageEmbed,
} = require('discord.js');
const tasks = require('@utils/Json/tasks.json');
const { getRandomInt } = require('@utils/utils');

module.exports = {
	name: 'tasks',
	description: 'Find out what tasks are available this week!',
	/**
     * @param { CommandInteraction } interaction
     * @param { Client } client
     */
	run: async (client, interaction) => {
		const newuser = client.db.fetch(`reg_${interaction.user.id}`);
		if (!newuser) {
			interaction.followUp({ content: `Greetings ${interaction.user.username}! It seems as if we haven't met before. You need to meet the bartender before trying to find some tasks. Do this by running either the /bartender command, or the t!bartender command. ` });
		}
		const randomtasks_1 = Math.floor(Math.random() * tasks.quotes.length);
		const randomtasks_2 = Math.floor(Math.random() * tasks.quotes.length);
		const randomtasks_3 = Math.floor(Math.random() * tasks.quotes.length);
		const embed = new MessageEmbed()
			.setTitle(`Tasks available for ${interaction.user.username}`)
			.setColor('BROWN')
			.setTimestamp()
			.setDescription('These tasks always change!')
			.addFields({name: 'Available tasks:', value: `\n➼${tasks.quotes[randomtasks_1]}\n➼${tasks.quotes[randomtasks_2]}\n➼ ${tasks.quotes[randomtasks_3]}`});
		interaction.followUp({ embeds: [embed] });
		client.db.set(`tasks_${interaction.user.id}`, [tasks.quotes[randomtasks_1], tasks.quotes[randomtasks_2], tasks.quotes[randomtasks_3]]);
	},
};

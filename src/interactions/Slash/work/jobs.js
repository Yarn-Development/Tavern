const {
	Client,
	CommandInteraction,
	MessageEmbed,
} = require('discord.js');
const { jobs } = require('@utils/utils');

module.exports = {
	name: 'jobs',
	description: 'Find out what tasks you can do to assist future travellers.',
	type: 'CHAT_INPUT',
	/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */

	run: async (client, interaction) => {
		const newuser = client.db.fetch(`reg_${interaction.user.id}`);
		if (!newuser) {
			interaction.followUp({ content: `Greetings ${interaction.user.username}! It seems as if we haven't met before. You need to meet the bartender before trying to find some tasks. Do this by running either the /bartender command, or the t!bartender command. ` });
		}
		else {
			const jobobj = Object.keys(jobs); // converts object into array to be handled later
			const embed = new MessageEmbed()
				.setTitle('Current Jobs Available')
				.setColor('BROWN')
				.setTimestamp();
			for (const property in jobobj) {
				embed.addField(`${jobobj[property]}`, `Cost: ${jobs[jobobj[property]].cost}\nEarns: ${jobs[jobobj[property]].earns}`, true);
			}
			embed.setFooter('2021 © Yarn Development | Tavern');
			interaction.followUp({ embeds: [embed] });
		}
	},
};

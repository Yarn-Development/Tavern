const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { capitalize } = require('@utils/utils.js');
module.exports = {
	name: 'inventory',
	description: 'Check your grape balance, and the items you have in store!',
	type: 'CHAT_INPUT',

	/** Functions needed to run command
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */

	run: async (client, interaction) => {
		const newuser = client.db.fetch(`reg_${interaction.user.id}`);

		if (!newuser) {
			interaction.followUp({
				content: `Greetings ${interaction.user.username}! It seems as if we haven't met before. You need to meet the bartender before trying to find some tasks. Do this by running either the /bartender command, or the t!bartender command. `,
			});
		} else {
			const storage = client.db.fetch(`bal_${interaction.user.id}.storage`);
			if (!storage) {
				interaction.followUp(
					'I could not find your chosen grape storage! Please run the /bartender command to choose between a global or per-guild economy!'
				);
			}
			const bal =
				client.db.get(`bal_${interaction.user.id}.global`) ||
				client.db.fetch(`bal_${interaction.user.id}.${interaction.guild.id}`);
			const embed = new MessageEmbed()
				.setTitle(`Inventory of ${interaction.user.username}`)
				.addFields({name: 'Registered At', value: new Date(newuser).toUTCString(), inline: false})
				.addFields({
					name: 'Grape Balance',
					value: `${bal.toString() ? bal.toString() : 'No balance.'}🍇  `,
					inline: true
		})
				.addFields({ name: 'Type of Storage', value: capitalize(storage), inline: true })
				.setColor('DARK_BUT_NOT_BLACK')
				.setTimestamp()
				.setFooter('2022 © Yarn Development | Tavern');

			interaction.followUp({ embeds: [embed] });
		}
	},
};

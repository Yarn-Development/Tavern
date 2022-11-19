const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'daily',
	description: 'Collect your daily reward!',
	type: 'CHAT_INPUT',
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	run: async (client, interaction) => {
		const timeout = 86400000;
		const RNG = 30;
		const jackpot = Math.floor(Math.random() * 1000 + 1000);
		const regular = Math.floor(Math.random() * 100 + 100);
		const dtime = client.db.fetch(`daily_${interaction.user.id}`)
			? client.db.fetch(`daily_${interaction.user.id}`)
			: client.db.fetch(`daily_${interaction.user.id}.${interaction.guild.id}`);
		const newuser = client.db.fetch(`reg_${interaction.user.id}`);
		if (!newuser) {
			interaction.followUp({
				content: `Greetings ${interaction.user.username}! It seems as if we haven't met before. You need to meet the bartender before trying to find some tasks. Do this by running either the /bartender command, or the t!bartender command. `,
			});
			client.db.set(`reg_${interaction.user.id}`, Date.now());
		}
		if (dtime !== null && timeout - (Date.now() - dtime) > 0) {
			const time = ms(timeout - (Date.now() - dtime));
			const timebed = new MessageEmbed()
				.setTitle('Slow down...')
				.setThumbnail(client.user.displayAvatarURL())
				.setDescription(
					`You have already claimed your daily reward for the day! Come back in about ${time.hours}h ${time.minutes}m ${time.seconds}s`
				);
			interaction.followUp({ embeds: [timebed] });
		} else {
			const min = Math.ceil(1);
			const max = Math.floor(30);
			const jack = Math.floor(Math.random() * (max - min) + min);
			if (jack == RNG) {
				const embed = new MessageEmbed()
					.setTitle('💰 JACKPOT 💰 ')
					.setDescription(
						'Congratulations Traveller! You got lucky today and struck the jackpot!'
					)
					.addField(
						'Overview',
						`Probability: 1/30\nEarned: ${jackpot.toString()} 🍇 `
					)
					.setColor('GOLD')
					.setTimestamp()
					.setFooter('2022 © Yarn Development | Tavern');
				interaction.followUp({ embeds: [embed] });
				const storage = client.db.fetch(`bal_${interaction.user.id}.storage`);
				if (!storage) {
					interaction.followUp(
						'I could not find your chosen grape storage! Please run the /bartender command to choose between a global or per-guild economy!'
					);
				} else if (storage === 'global') {
					client.db.set(`daily_${interaction.user.id}`, Date.now());
					client.db.add(`bal_${interaction.user.id}.global`, jackpot);
				} else if (storage === 'guild') {
					client.db.set(
						`daily_${interaction.user.id}.${interaction.guild.id}`,
						Date.now()
					);
					client.db.add(
						`bal_${interaction.user.id}.${interaction.guild.id}`,
						regular
					);
				}
			} else {
				const regbed = new MessageEmbed()
					.setTitle('Daily Reward')
					.setDescription(
						"Unfortunately you couldn't win the jackpot this time. Maybe next time?"
					)
					.addField(
						'Overview',
						`Jackpot Probability :1/30\nEarned: ${regular.toString()} 🍇`
					)
					.setColor('DARK_BUT_NOT_BLACK')
					.setTimestamp()
					.setFooter('2022 © Yarn Development | Tavern');
				interaction.followUp({ embeds: [regbed] });
				const storage = client.db.fetch(`bal_${interaction.user.id}.storage`);
				if (storage === 'global') {
					client.db.add(`bal_${interaction.user.id}.global`, regular);
				} else if (storage === 'guild') {
					client.db.add(
						`bal_${interaction.user.id}.${interaction.guild.id}`,
						regular
					);
				} else if (!storage) {
					interaction.followUp(
						'I could not find your chosen grape storage! Please run the /bartender command to choose between a global or per-guild economy!'
					);
				}
			}
		}
	},
};

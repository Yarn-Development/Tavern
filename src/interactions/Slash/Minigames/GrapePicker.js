const {
	Client,
	CommandInteraction,
	MessageButton,
	MessageActionRow,
	MessageEmbed,
} = require('discord.js');

module.exports = {
	name: 'grapepicker',
	description: 'Pick grapes',
	type: 1,
	options: [],
	default_permission: null,
	/*
	 *
	 * @param {Client} client
	 * @param  {CommandInteraction} interaction
	 */
	run: async (client, interaction) => {
		function random_number() {
			return Math.floor(Math.random() * 3);
		}
		const storage = client.db.fetch(`bal_${interaction.user.id}.storage`);
		const tasks = client.db.fetch(`tasks_${interaction.user.id}`);
		const newuser = client.db.fetch(`reg_${interaction.user.id}`);
		const step = ['Pick', 'Basket', 'Move'];
		const grapes_required = 10;
		let current_grapes = 0;
		if (!newuser) {
			interaction.followUp({
				content: `Greetings ${interaction.user.username}! It seems as if we haven't met before. You need to meet the bartender before trying to find some tasks. Do this by running either the /bartender command, or the t!bartender command. `,
			});
		}
		else {
			let next_step = random_number();
			const buttons = new Array(
				(pick = new MessageButton()
					.setCustomId('Pick')
					.setLabel('Pick')
					.setStyle('PRIMARY')),
				(basket = new MessageButton()
					.setCustomId('Basket')
					.setLabel('Basket')
					.setStyle('PRIMARY')),
				(move = new MessageButton()
					.setCustomId('Move')
					.setLabel('Move')
					.setStyle('PRIMARY')),
			);
			const GrapePick = new MessageEmbed()
				.setColor('GOLD')
				.setTitle('Grape picker!')
				.setDescription('Pick enough grapes before the timer runs out!')
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
				.addFields(
					{
						name: 'Grapes required',
						value: `${grapes_required}`,
						inline: true,
					},
					{
						name: 'Grapes picked',
						value: `${current_grapes}`,
						inline: true,
					},
					{
						name: 'Current step',
						value: `${step[next_step]}`,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter('2022 © Yarn Development | Tavern');
			const row = new MessageActionRow().addComponents(
				buttons[0],
				buttons[1],
				buttons[2],
			);
			function display() {
				return interaction.followUp({
					embeds: [GrapePick],
					components: [row],
				});
			}
			display().then((msg) => {
				const collector = interaction.channel.createMessageComponentCollector({
					componentType: 'BUTTON',
					time: 70000,
					max: 10,
				});
				const embed = msg.embeds[0];
				collector.on('collect', (i) => {
					if (i.user.id === interaction.user.id) {
						if (i.customId === buttons[next_step].customId) {
							current_grapes += 1;
							next_step = random_number();
							embed.fields[1] = {
								name: 'Grapes picked',
								value: `${current_grapes}`,
								inline: true,
							};
							embed.fields[2] = {
								name: 'Current step',
								value: `${step[next_step]}`,
								inline: true,
							};
							msg.edit({ embeds: [embed] });
							if (current_grapes === 10) {
								embed.title = 'Congratulations! You Win!';
								embed.description = 'You have earned 100 :grapes:!';
								embed.fields[0] = {
									name: 'This minigame has ended.',
									value: 'Thank you for playing!',
									inline: true,
								};
								embed.fields[1] = {
									name: 'Invite me to your server',
									value:
										'[here!](https://discord.com/oauth2/authorize?client_id=840249307030487050&permissions=8&scope=bot%20applications.commands)',
									inline: true,
								};
								embed.fields[2] = {
									name: 'To play again, do:',
									value: ' /grapepicker',
									inline: true,
								};
								row.components[0] = buttons[0].setDisabled(true);
								row.components[1] = buttons[1].setDisabled(true);
								row.components[2] = buttons[2].setDisabled(true);
								msg.edit({
									embeds: [embed],
									components: [row],
								});
								const storage = client.db.fetch(
									`bal_${interaction.user.id}.storage`,
								);
								if (storage === 'global') {
									client.db.add(`bal_${interaction.user.id}.global`, 100);
								}
								else if (storage === 'guild') {
									client.db.add(
										`bal_${interaction.user.id}.${interaction.guild.id}`,
										100,
									);
								}
								else if (!storage) {
									interaction.followUp(
										'I could not find your chosen grape storage! Please run the /bartender command to choose between a global or per-guild economy!',
									);
								}
							}
						}
					}
				});
				collector.on('end', (i) => {
					if (current_grapes !== 10) {
						embed.title =
							'Sorry, but you didn\'t pick enough grapes in time.\nPlease try again later.';
						embed.description = 'You have not earned any :grapes:.';
						embed.fields[0] = {
							name: 'This minigame has ended.',
							value: 'Thank you for playing!',
							inline: true,
						};
						embed.fields[1] = {
							name: 'Invite me to your server',
							value:
								'[Here :D](https://discord.com/oauth2/authorize?client_id=840249307030487050&permissions=8&scope=bot%20applications.commands)',
							inline: true,
						};
						embed.fields[2] = {
							name: 'To play again, do:',
							value: ' /grapepicker',
							inline: true,
						};
						row.components[0] = buttons[0].setDisabled(true);
						row.components[1] = buttons[1].setDisabled(true);
						row.components[2] = buttons[2].setDisabled(true);
						msg.edit({
							embeds: [embed],
							components: [row],
						});
					}
				});
			});
		}
	},
};

module.exports = async (client, interaction) => {
	if (interaction.isCommand()) {
		await interaction.deferReply({
			ephemeral: false,
		});

		const command = client.interactions.get(interaction.commandName);

		if (!command) {
			return interaction.reply({
				content: 'ERROR: Could not find the command specified!',
			});
		}

		command.run(client, interaction);
	}

	if (interaction.isContextMenu()) {
		await interaction.deferReply({
			ephemeral: false,
		});

		const command = client.interactions.get(interaction.commandName);
		if (command) command.run(client, interaction);
	}
};

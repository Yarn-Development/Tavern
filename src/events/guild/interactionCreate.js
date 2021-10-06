module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.interactions.get(interaction.commandName);

        const args = [];

        if (!command) return interaction.reply({
            content: "Something Went Wrong"
        });

        command.run(client, interaction, args);
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({
            ephemeral: false
        });

        const command = client.interactions.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
}
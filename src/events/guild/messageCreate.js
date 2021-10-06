module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases ?.includes(cmd.toLowerCase()));

    if (!command) return;

    await command.run(client, message, args);
}
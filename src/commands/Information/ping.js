module.exports = {
    name: 'ping',
    aliases: ['pong', 'latency'],
    description: 'Check the bot\'s ping!',
    run: async (client, message, args) => {
        message.channel.send({
            content: `My ping is \`${client.ws.ping}\``
        });
    },
};
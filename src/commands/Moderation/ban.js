const { Client, Message, Permissions } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['pong', 'latency'],
    description: 'Check the bot\'s ping!',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: 'You don\'t have permission.' });
        if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: 'I need the `Ban Members` permission.' });
        if (!args[0]) return message.reply({ content: 'Please specify a user.' });
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.filter(m => m.user.tag.toLowerCase().includes(args[0].toLowerCase()) || m.displayName.toLowerCase().includes(args[0].toLowerCase()) || m.user.username.toLowerCase().includes(args[0].toLowerCase())).first();
        const reason = args.slice(1).join(' ') || 'None specified';

        if (user.id === message.author.id) return message.reply({ content: 'I cannot ban you.' });
        if (user.id === client.user.id) return message.reply({ content: 'I cannot ban myself.' });

        message.guild.members.ban(user, { reason: reason }).then(async() => {
            message.reply({ content: `${user.user.tag} has been banned. **Reason**: ${reason}`});
        });
    },
};
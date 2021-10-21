const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'eval',
	run: async (client, message, args) => {
		if (message.author.bot) return;

		if (message.author.id !== '294870523438170112') {
			return message.channel.send(':x: Forbidden: This Command is Owner-Only!');
		}
		const input = args.join(' ');
		if (!input) return message.reply('Please provide code to eval');
		if (!input.toLowerCase().includes('token')) {
			const embed = new MessageEmbed();

			try {
				let output = eval(input);
				if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });

				embed
					.addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
					.addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
					.setColor('RANDOM');
			}
			catch (err) {
				embed
					.addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
					.addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
					.setColor('ORANGE');
			}

			message.channel.send({ embeds: [embed] });
		}
		else {
			message.channel.send('My token: ||nevergonnagiveyoupnevergonnaletyoudown|| Please dont hack me! :(');
		}
	},
};

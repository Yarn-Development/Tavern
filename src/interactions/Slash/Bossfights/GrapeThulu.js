const {
	Client,
	CommandInteraction,
	MessageButton,
	MessageActionRow,
	MessageEmbed,
} = require('discord.js');

module.exports = {
	name: 'grapethulu',
	description: 'Fight Grapethulu',
	type: 1,
	options: [],
	default_permission: null,
	/*
  *
  * @param {Client} client
  * @param  {CommandInteraction} interaction
  */
	run: async (client, interaction) => {
    	let button = new MessageButton()
      .setStyle("")
  const cps = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 50000, max:25 });
  let count = 0;
  cps.on("collect", i => {
    if(interaction.user.id === i.user.id) {

    }
  })
 }
}
const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

const { jobs } = require("@utils/utils")
module.exports = {
  name: 'apply',
  description: 'Apply for a job in the tavern!',
  type: 'CHAT_INPUT',
  /**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
  run: async (client, interaction) => {
  console.log("Hello World");

  module.exports = jobs
    const choices = new MessageEmbed()
    .setTitle("Jobs available in the Tavern")
    jobs.forEach(element => {
      choices.addField(``)
    })
},
};

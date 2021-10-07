const {
  Client,
  CommandInteraction,
} = require('discord.js');

module.exports = {
  name: 'apply',
  description: 'Apply for a job in the tavern!',
  type: 'CHAT_INPUT',
  /**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
  run: async (client, interaction) => {
    const jobs = [
      'Waitress/Waiter',
      '',
    ];
  },
};

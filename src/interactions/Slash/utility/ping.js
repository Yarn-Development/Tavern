const {
    Client,
    CommandInteraction
} = require("discord.js")
module.exports = {
    name: 'ping',
    description: 'Find out the bots connection to the tavern.',
    type:'CHAT_INPUT',
    /**  
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args) => {
        await interaction.reply({
            content: 'My ping is `' + client.ws.ping + '`!',
            ephemeral:true
        })
    }
}
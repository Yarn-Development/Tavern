const {
    Client,
    Interaction
} = require("discord.js")
module.exports = {
    name: 'ping',
    description: 'My ping.',
    type:'CHAT_INPUT',
    /**  
    * {param} {Client} client
    * {param} {Interaction} interaction
    * {param} {String[]} args
    */
    run: async (client, interaction, args) => {
        await interaction.reply({
            content: 'My ping is `' + client.ws.ping + '`!',
            ephemeral:true
        })
    }
}
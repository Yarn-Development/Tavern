const {
    Client,
    CommandInteraction
} = require("discord.js");
module.exports = {
    name:"jobs",
    description:"Find out what tasks you can do to assist future travellers.",
    type:"CHAT_INPUT",
/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */

run: async(client,interaction) => {
    const newuser = client.db.fetch(`reg_${interaction.user.id}`)
    if(!newuser){  
        interaction.followUp({content:`Greetings ${interaction.user.username}! It seems as if we haven't met before. You need to meet the bartender before trying to find some tasks. Do this by running either the /bartender command, or the t!bartender command. `})
        client.db.set(`reg_${interaction.user.id}`,Date.now())
    }
    else {
        const embed = new MessageEmbed()
        .setTitle(`Tasks available for ${interaction.user.username}`)
        .setColor("BROWN")
        .setTimestamp()
        .setDescription("These tasks change weekly!")
        .addField("Available tasks:","\n➼ Clean the floors\n➼Fetch the beer barrels\n➼ Converse with the innkeeper")
        .setFooter("2021 © Yarn Development | Tavern")
    }

    },
}
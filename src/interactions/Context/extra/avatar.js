const {
    Client,
    Interaction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "avatar",
    type: "USER",
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction
     */
    run: async (client, interaction) => {
        const user = interaction.user;

        const avatarEmbed = new MessageEmbed()
            .setTitle(`${user.tag}'s Avatar`)
            .setColor(user.displayHexColor)
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 4096
            }))

        interaction.followUp({
            embeds: [avatarEmbed]
        });
    }
}
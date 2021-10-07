const {
  Client,
  CommandInteraction,
  MessageButton,
  MessageActionRow,
  MessageEmbed,
} = require('discord.js');

module.exports = {
  name: 'bartender',
  description: 'Pay a visit to the bartender, and get setup with Tavern!',
  type: 'CHAT_INPUT',
  /**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
  run: async (client, interaction) => {
    const newuser = client.db.fetch(`reg_${interaction.user.id}`);
    const infobed = new MessageEmbed()
      .setTitle('What is Tavern?')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription('Tavern is a newly formed Economy Discord Bot Written in Discord.js v13, which creates a medieval game like setting to your everyday economy bot.\nThe bot mixes roleplay, interaction and... grapes? In order to provide an experience that a user can enjoy and use on a regular basis.\nGain the most experience, enjoy some (alcohol free) wine, or try your luck with the Exotic Waitress!\nThe choice is yours with Tavern.')
      .setColor('GOLD')
      .setTimestamp()
      .setFooter('2021 © Yarn Development | Tavern');
    if (!(newuser == null)) {
      const yesbutton = new MessageButton()
        .setCustomId('YesButton')
        .setLabel('YES')
        .setStyle('SUCCESS');
      const nobutton = new MessageButton()
        .setCustomId('NoButton')
        .setLabel('NO')
        .setStyle('DANGER');
      interaction.followUp({
        content: `Hello again Traveller ${interaction.user.username}! Would you like a reminder of how Tavern works?`,
        components: [
          new MessageActionRow()
            .addComponents(yesbutton, nobutton),
        ],
      });
      const yncoll = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
      yncoll.on('collect', (i) => {
        if (i.customId === 'YesButton') {
          if (i.user.id === interaction.user.id) {
            interaction.followUp({
              content: 'As you wish Traveller!',
              embeds: [
                infobed,
              ],
            });
          } else {
            interaction.followUp({ content: 'Sorry, but the bartender has not visited you, but you can pay a visit to him via the /bartender command.' });
          }
        } else if (i.customId === 'NoButton') {
          interaction.followUp({ content: 'Okay, feel free to explore the rest of Tavern.' });
        }
      });
    } else {
      const welcome = new MessageEmbed()
        .setTitle('Welcome!')
        .setDescription(`Welcome to Tavern, Traveller ${interaction.user.username}! It's a pleasure to meet you! Would you like to go through the introduction, or straight to configuration?  `);
      const rulechoice = new MessageButton()
        .setCustomId('RuleButton')
        .setLabel('Introduction')
        .setStyle('SUCCESS');
      const confchoice = new MessageButton()
        .setCustomId('SkipRules')
        .setLabel('Skip to Configuration')
        .setStyle('DANGER');
      interaction.followUp({
        embeds: [
          welcome,
        ],
        components: [
          new MessageActionRow()
            .addComponents(confchoice, rulechoice),
        ],
      });
      const rulecollector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
      rulecollector.on('collect', (i) => {
        if (i.customId === 'RuleButton') {
          const nextbtn = new MessageButton()
            .setCustomId('next')
            .setLabel('Continue to Configuration')
            .setStyle('PRIMARY');
          interaction.followUp({
            embeds: [infobed],
            components: [
              new MessageActionRow()
                .addComponents(nextbtn),
            ],
          });
          const cfgselector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
          cfgselector.on('collect', (f) => {
            if (f.customId === 'next') {
              const globalbtn = new MessageButton()
                .setCustomId('GlobalButton')
                .setLabel('Global Economy')
                .setStyle('PRIMARY');
              const guildbtn = new MessageButton()
                .setCustomId('GuildButton')
                .setLabel('Per-Guild Economy')
                .setStyle('PRIMARY');
              interaction.followUp({
                content: 'In Tavern you decide how you control your grapes.\nYou can either have a global, server-wide grape count, where all of your progress is continous regardless of the server,\nOr you can have a per guild grape count, where progress and achievement is only mapped to the specific server you are in.\nChoose wisely traveller, as this cannot be changed later!',
                components: [
                  new MessageActionRow()
                    .addComponents(guildbtn, globalbtn),
                ],
              });
              const cfgcollector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
              cfgcollector.on('collect', (g) => {
                if (g.customId === 'GlobalButton') {
                  client.db.set(`bal_${interaction.user.id}.storage`, 'global');
                  interaction.followUp({ content: 'Your grape count has been set to global, and your configuration is complete, enjoy the rest of Tavern!' });
                } else if (g.customId === 'GuildButton') {
                  interaction.followUp({ content: 'Your guild count has been set to Per-Guild, and with that your configuration is complete, enjoy the rest of Tavern!' });
                }
              });
            }
          });
        } else if (i.customId === 'SkipRules') {
          const globalbtn = new MessageButton()
            .setCustomId('GlobalButton')
            .setLabel('Global Economy')
            .setStyle('PRIMARY');
          const guildbtn = new MessageButton()
            .setCustomId('GuildButton')
            .setLabel('Per-Guild Economy')
            .setStyle('PRIMARY');
          interaction.followUp({
            content: 'In Tavern you decide how you control your grapes.\nYou can either have a global, server-wide grape count, where all of your progress is continous regardless of the server,\nOr you can have a per guild grape count, where progress and achievement is only mapped to the specific server you are in.\nChoose wisely traveller, as this cannot be changed later!',
            components: [
              new MessageActionRow()
                .addComponents(guildbtn, globalbtn),
            ],
          });
          const cfgcollector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
          cfgcollector.on('collect', (g) => {
            if (g.customId === 'GlobalButton') {
              client.db.set(`bal_${interaction.user.id}.storage`, 'global');
              client.db.set(`reg_${interaction.user.id}`, Date.now());
              interaction.followUp({ content: 'Your grape count has been set to global, and your configuration is complete, enjoy the rest of Tavern!' });
            } else if (g.customId === 'GuildButton') {
              client.db.set(`bal_${interaction.user.id}.storage`, 'guild');
              client.db.set(`reg_${interaction.user.id}`, Date.now());
              interaction.followUp({ content: 'Your guild count has been set to Per-Guild, and with that your configuration is complete, enjoy the rest of Tavern!' });
            }
          });
        }
      });
    }
  },
};

require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({
    intents: 513
});

client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();
client.config = require('./src/utils/Json/botconfig.json');

['command', 'event', 'interaction'].forEach(handler => {
    require(`./src/handlers/${handler}`)(client)
});

client.login(client.config.token);
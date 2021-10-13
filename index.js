require('module-alias/register') // allows module like paths to be used
require('dotenv').config(); // allows process,env to be used for enviroment variables
const { Client, Collection } = require('discord.js');
const client = new Client({
  intents: 513,
}); // initialiaze client to be used later
client.db = require('quick.db');
client.commands = new Collection(); // allows regular prefix commands to be fetched
client.aliases = new Collection(); // allows regular prefix aliases to be fetched
client.interactions = new Collection(); // alows slash commands and context menus to be fetched
client.config = require('./src/utils/Json/botconfig.json'); // alias for all parameters in specified file
['command', 'event', 'interaction'].forEach((handler) => {
  require(`./src/handlers/${handler}`)(client);
}); // initialiazes all handlers in array
client.login(); // no token specified in here, because it is in the env file

console.log("Hello World");
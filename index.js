//  runs express server to be hosted
const express = require('express');
const app = express();
app.get('/', (req, res) => {
	res.send('https://yarndev.co.uk/ is a cool site yknow');
});
app.listen(3000, () => {
	console.log('Tavern App Running at http://localhost:3000');
});
// allows module like paths to be used
require('module-alias/register');
// allows process.env to be used for enviroment variables
require('dotenv').config();

const { Client, Collection } = require('discord.js');
// initialiaze client to be used later
const client = new Client({
	intents: 513,
});
// global client variables
client.db = require('quick.db');
// allows regular prefix commands to be fetched
client.commands = new Collection();
// allows regular prefix aliases to be fetched
client.aliases = new Collection();
// alows slash commands and context menus to be fetched
client.interactions = new Collection();
// initialiazes config variables globally
client.config = require('./src/utils/Json/botconfig.json');
// alias for all parameters in specified file, initialiazes all handlers in array
['command', 'event', 'interaction'].forEach((handler) => {
	require(`./src/handlers/${handler}`)(client);
});
// no token specified in here, because it is in the env file
client.login().then(console.log('Logged in sucessfully!'));

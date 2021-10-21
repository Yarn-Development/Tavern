module.exports = (client) => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity('the stock of grapes', { type: 'WATCHING' });
};

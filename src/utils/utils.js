function RandomInt(maxint) {
	return Math.floor(Math.floor(Math.random * maxint));
}
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
async function CPSTest({ time, interaction, channel }) {
	let button = new MessageButton()
  const cps = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: time, max:25 });
  let count = 0
  cps.on("collect", i => {
    
  })

}
const jobs = {
	Alcoholic: {
		cost: 0,
		earns: 15,
	},
	Host: {
		cost: 1500,
		earns: 50,
	},
	Waitron: {
		cost: 5000,
		earns: 100,
	},
	Barback: {
		cost: 10000,
		earns: 200,
	},
	Chef: {
		cost: 20000,
		earns: 350,
	},
	Bartender: {
		cost: 35000,
		earns: 500,
	},
	WineProducer: {
		cost: 50000,
		earns: 750,
	},
	Mixologist: {
		cost: 75000,
		earns: 1000,
	},
	Barkeeper: {
		cost: 100000,
		earns: 1250,
	},
};
module.exports = {
	jobs,
	RandomInt,
	capitalize,
};

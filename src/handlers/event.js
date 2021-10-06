const fs = require("fs");
const ascii = require("ascii-table");



module.exports = async (client) => {
    const table = new ascii(`Events`);
        table.setHeading("Events", "Status");

const allevents = [];
    const load_dir = (dir) => {
        const event_files = fs.readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of event_files) {
            const event = require(`../events/${dir}/${file}`)
            let eventName = file.split(".")[0];
            allevents.push(eventName);
            client.on(eventName, event.bind(null, client));
        }
    }
    await ["client", "guild"].forEach(e => load_dir(e));
    for (let i = 0; i < allevents.length; i++) {
        try {
            table.addRow(allevents[i], "✔ Ready");
        } catch (e) {
            console.log(String(e.stack).red);
        }
    }
    console.log(table.toString());
}
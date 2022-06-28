const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const mysqlListener = require("./src/mysqlListener");

const {onRowUpdate} = require("./src/dsEvents");

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.login(config.token);

client.once('ready', () => {
	console.log("[ 🟡 ] " + client.user.tag + ' è online.');

  mysqlListener(client)
    .then(() => console.log('[ 🟣 ] In attesa di nuove righe dal database \n'))
    .catch((error) => console.error(error.sqlMessage != undefined ? "\n[ ❌ ] Impossibile connettersi al database\nCausa: "+error.sqlMessage + "\n" : "\n[ ❌ ] Impossibile connettersi al database\n"));
});


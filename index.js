const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const mysqlListener = require("./src/mysqlListener");

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.login(config.token);

client.once('ready', () => {
	console.log("[ ๐ก ] " + client.user.tag + ' รจ online.');

  mysqlListener(client)
    .then(() => console.log('[ ๐ฃ ] In attesa di nuove righe dal database \n'))
    .catch((error) => console.error(error.sqlMessage != undefined ? "\n[ โ ] Impossibile connettersi al database\nCausa: "+error.sqlMessage + "\n" : "\n[ โ ] Impossibile connettersi al database\n"));
});


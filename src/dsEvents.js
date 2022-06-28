const { Client, Intents } = require('discord.js');
const config = require('../config.json');


const onRowUpdate = (client, data) => {
    const guild = client.guilds.resolve(config.serverDiscordId);
    if(guild){
        if(data[config.userModel.discordIdColumn] != null){
            guild.members.fetch(data[config.userModel.discordIdColumn])
            .then((user) => {
                let newNick = data[config.userModel.nameColumn]
                if(newNick != undefined){
                    data[config.userModel.surnameColumn] != undefined ? newNick += " " + data[config.userModel.surnameColumn] : null;
                
                    user.setNickname(
                        newNick,
                        config.reasonRename != undefined ? config.reasonRename : ""
                    )
                    .then(() => console.log("[ 🟢 ] Rinominato " + user.user.tag + " in " + newNick + "\n"))
                    .catch(e => console.error("[ ❌ ] Impossibile rinominare: " + user.user.tag + "\nCausa: " + e.message + "\n"))
                }else{
                    console.error("[ ❌ ] Colonna del nome non trovata, controlla il config.json ")
                }
                
            })
            .catch(e => console.error("[ ❌ ] Utente non trovato: " + e.message))
        }else{
            console.error("[ ❌ ] Colonna del id discord dell'utente non trovata, controlla il config.json ")
        }
    }else{
        console.error("[ ❌ ] Server non trovato, controlla l'id")
    }
    

}

module.exports = {
    onRowUpdate
}
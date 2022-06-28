# Rename discord Bot
Un bot discord che cambia il nickname degli utenti in base a un database mysql.

## Per usarlo
- Installare nodeJs (versione 16 o maggiori)
- Avere un database mysql

## Configurazione
1. Creare un bot discord attraverso il [Discord Developer's Portal](https://discord.com/developers/applications)
2. Scaricare questa repository
3. Nella cartella del progetto eseguire `npm i` per installare le dipendenza
4. Completare il file `config.json` indicando i [dati necessari](#parametri-nel-configjson):
    ```json
    {
    "name": "Nome del bot",
    "token": "token del bot",
    "serverDiscordId": "id del server discord",
    "mysql": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "root",
        "schema": "nomeDatabase",
        "table": "users"
    },
    "userModel": {
        "nameColumn" : "name",
        "surnameColumn": "surname",
        "discordIdColumn" : "discord_id"
    },
    "reasonRename": "Inserire una ragione"
    }
    ```
5. [Invitare il bot nel server](#invitare-bot-nel-server)
6. Avviare il bot con `npm start`


## Parametri nel config.json

| **Chiave**              | **Tipo** | **Obbligatorio** | **Descrizione**                                                           | **OttenutoDa**                                                                                                                                                                                                                                   |
|-------------------------|----------|------------------|---------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name                    | String   | ❌                | Il nome del bot                                                           | [Discord Developer's Portal](https://discord.com/developers/applications)                                                                                                                                                                        |
| Token                   | String   | :white_check_mark:                | Token del bot                                                             | [Discord Developer's Portal](https://discord.com/developers/applications)                                                                                                                                                                        |
| ServerDiscordId         | String   | :white_check_mark:                | Id del server in cui trovare gli utenti                                   | [Abilitando la modalità sviluppatori su discord](https://discord.com/developers/docs/game-sdk/store#:~:text=Open%20up%20the%20Discord%20app,and%20enter%20your%20application%20ID) e facendo click tasto destro sull'icona del server desiderato |
| MySql Host              | String   | :white_check_mark:                | Ip del database mysql                                                     | Varie                                                                                                                                                                                                                                            |
| MySql User              | String   | :white_check_mark:                | Utente del database mysql (deve poter leggere le righe)                   | Varie                                                                                                                                                                                                                                            |
| MySql Password          | String   | :white_check_mark:                | Password dell'utente mysql specificato                                    | Devi ricordartela...                                                                                                                                                                                                                             |
| MySql Schema            | String   | :white_check_mark:                | Nome del database da osservare                                            | Se l'hai creato, dovresti saperlo                                                                                                                                                                                                                |
| MySql Table             | String   | :white_check_mark:                | Tabella che contiene gli utenti                                           | Se l'hai creata, dovresti saperla                                                                                                                                                                                                                |
| UserModel nameColumn    | String   | :white_check_mark:                | Nome della colonna del database che contiene il nome                      | Se l'hai creata, dovresti saperla                                                                                                                                                                                                                |
| UserModel surnameColumn | String   | ❌                | Nome della colonna del database che contiene il cognome                   | Se l'hai creata, dovresti saperla                                                                                                                                                                                                                |
| ReasonRename            | String   | ❌                | Ragione per aver modificato l'username (viene scritta nei log del server) | Dalla tua creatività                                                                                                                                                                                                                             |

## Invitare bot nel server
Il link per inviatare il bot nel server è composto da:
- clientID
- PermissionCode

_Ad esempio:_
```
https://discord.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=INSERT_PERMISSION_CODE
```

Il **client id** si trova nel [Discord Developer's Portal](https://discord.com/developers/applications) all'interno dell'app creata.

I **codice dei permessi** da dare al bot dovrebbe essere `201326592`:
- Change Nickname
- Manage Nicknames

Nel caso si voglia dare più permessi è possibile generarli con [questo sito](https://discordapi.com/permissions.html#201326592).

## Problemi
- Nel caso il programmi segnali che l'utente mysql non ha permessi, eseguire sul server mysql questi comandi:
    ```sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

    flush privileges;
    ```

## Copyright
Software realizzato da [Jonathan Caputo](mailto:jonathan-caputo@hotmail.com).

Ogni diritto riservato.

Per ogni dubbio o perplessità contattami o crea un issue.
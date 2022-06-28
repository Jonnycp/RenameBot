const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const config = require('../config.json')
const {onRowUpdate} = require("./dsEvents");

const mysqlListener = async (client) => {
    const connection = mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password
    });
  
    const instance = new MySQLEvents(connection, {
      startAtEnd: true,
      excludedSchemas: {
        mysql: true,
      },
    });
  
    await instance.start();
  
    instance.addTrigger({
      name: 'TEST',
      expression: '*',
      statement: MySQLEvents.STATEMENTS.ALL,
      onEvent: (event) => {
        if(event.table === config.mysql.table && event.schema === config.mysql.schema){
            const data = event.affectedRows[0].after;
            if(event.type === "INSERT" || event.type === "UPDATE"){
              onRowUpdate(client, data);
            }
        }
      },
    });
    
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

module.exports = mysqlListener;
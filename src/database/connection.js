const { Pool } = require("pg");

const database = new Pool({
      user: 'postgres',      
      host: 'localhost',         
      database: 'lab_commerce',     
      password: 'postgres',     
      port: 5432,   
    })
  

module.exports = database;

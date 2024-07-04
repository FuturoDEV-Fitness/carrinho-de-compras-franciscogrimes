const { Pool } = require("pg");

class Database {
  constructor() {
    this.database = new Pool({
      user: "postgres",
      host: "localhost",
      database: "lab_commerce",
      password: "pgData5432",
      port: 5432,
    });
  }
}

module.exports = Database;

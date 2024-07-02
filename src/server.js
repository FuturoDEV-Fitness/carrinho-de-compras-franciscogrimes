require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const connection = require("./database/connection")

const PORT_API = process.env.PORT_API 

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use(routes); // Prefixo para as rotas
    this.initializeServer(server);
  }

  middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log("Servidor conectado!");
    } catch (error){
      console.log("Erro ao inicializar o servidor");
      console.log(error)
    }
  }

  initializeServer(app) {
    app.listen(PORT_API, () => {
      console.log(`Servidor conectado na porta ${PORT_API}`);
    });
  }
}

module.exports = { Server };

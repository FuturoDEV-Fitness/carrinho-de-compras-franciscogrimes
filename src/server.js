const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const PORT_API = process.env.PORT_API;

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use(routes);
    this.initializeServer(server);
  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    // Database connection
    console.log("Banco de dados Conectado!");
  }

  async initializeServer(app) {
    app.listen(PORT_API, () => {
      console.log(`Servidor conectado na porta ${PORT_API}`);
    });
  }
}

module.exports = { Server };

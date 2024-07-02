const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const PORT_API = process.env.PORT_API || 3000;

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    server.use("/api", routes); // Prefixo para as rotas
    this.initializeServer(server);
  }

  middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    try {
      await Connection.authenticate();
      console.log("Servidor conectado!");
    } catch {
      console.log("Erro ao inicializar o servidor");
    }
  }

  initializeServer(app) {
    app.listen(PORT_API, () => {
      console.log(`Servidor conectado na porta ${PORT_API}`);
    });
  }
}

module.exports = { Server };

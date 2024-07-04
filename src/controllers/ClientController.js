const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lab_commerce",
  password: "pgData5432",
  port: 5432,
});

class ClientController {
  async create(request, response) {
    try {
      const dados = request.body;

      if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {
        return response.status(401).json({
          mensagem: "Todos os campos são obrigatórios",
        });
      }

      const client = await db.query(
        `INSERT INTO clients(name,email,cpf,contact)VALUES($1,$2,$3,$4)`,
        [dados.name, dados.email, dados.cpf, dados.contact]
      );

      return response.status(201).json(client.rows[0]);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível realizar o cadastro" });
    }
  }
}

module.exports = new ClientController();

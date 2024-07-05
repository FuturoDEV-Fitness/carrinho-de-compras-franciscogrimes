const db = require("../database/connection")

class ClientController{
  
  async create(request, response) {
    try {
      const dados = request.body;

      if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {
        return response.status(400).json({
          mensagem: "Todos os campos são obrigatórios",
        });
      }

       await db.query(
        `INSERT INTO clients(name,email,cpf,contact)VALUES($1,$2,$3,$4)`,
        [dados.name, dados.email, dados.cpf, dados.contact]
      );

      console.log("Cadastro Realizado!")
      return response.status(201).json({mensagem: `Cliente ${dados.name} inserido no banco`});
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json({ mensagem: "Não foi possível realizar o cadastro" });
    }
  }
}

module.exports = new ClientController();

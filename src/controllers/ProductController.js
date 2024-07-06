const db = require("../database/connection");

class ProductController {
  async create(request, response) {
    try {
      const dados = request.body;

      if (!dados.name || !dados.category_id) {
        return response.status(400).json({
          mensagem: "Os campos Nome e Id do cliente são obrigatórios!",
        });
      }

      await db.query(
        `INSERT INTO products(name,amount,color,voltage, description, category_id)VALUES($1,$2,$3,$4,$5,$6)`,
        [
          dados.name,
          dados.amount,
          dados.color,
          dados.voltage,
          dados.description,
          dados.category_id,
        ]
      );

      console.log("Cadastro Realizado!");
      return response
        .status(201)
        .json({ mensagem: `Produto ${dados.name} inserido no banco` });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ mensagem: "Não foi possível realizar o cadastro" });
    }
  }

  async list(request, response) {
    try {
      const dados = request.body;

      if (dados.name) {
        const resposta = await db.query(
          // "SELECT * FROM products WHERE name = $1",
          "SELECT * FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id WHERE p.name = $1",
          [dados.name]
        );
        if (resposta.rows.length > 0) {
          return response.status(200).json(resposta.rows);
        } else {
          return response.status(404).json({
            mensagem: "Nenhum produto encontrado.",
          });
        }
      } else {
        const resposta = await db.query("select * from products");

        if (resposta.rows.length > 0) {
          return response.status(200).json(resposta.rows);
        } else {
          return response
            .status(404)
            .json({ mensagem: "Nenhum produto encontrado." });
        }
      }
    } catch (error) {
      console.error("Erro ao visualizar os produtos:\n", error);
      response.status(500).json({
        mensagem:
          "Não foi possível visualizar os dado dos produtos cadastrados.",
      });
    }
  }
}
module.exports = new ProductController();

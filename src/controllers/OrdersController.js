const db = require("../database/connection");

class OrderController {
  async create(request, response) {
    const client = await db.connect(); // conecta ao banco de dados
    try {
      const dados = request.body;
      const { client_id, address, total, observations, items } = dados;

      // Verifica se os campos obrigatórios estão presentes
      if (
        !client_id ||
        !address ||
        !observations ||
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return response.status(400).json({
          mensagem:
            "Os campos client_id, address, total, observations e items são obrigatórios!",
        });
      }

      const result = await client.query(
        `INSERT INTO orders(client_id, address, total, observations) VALUES($1, $2, $3, $4) RETURNING id`,
        [client_id, address, total, observations]
      );

      const orderId = result.rows[0].id;

      for (const item of items) {
        const { product_id, amount, price } = item;
        await client.query(
          `INSERT INTO orders_items(order_id, product_id, amount, price) VALUES($1, $2, $3, $4)`,
          [orderId, product_id, amount, price]
        );
      }

      console.log("Pedido e itens cadastrados com sucesso!");
      return response
        .status(201)
        .json({ mensagem: "Pedido cadastrado com sucesso!" });
    } catch (error) {
      console.error("Erro ao cadastrar o pedido:\n", error);
      return response
        .status(500)
        .json({ mensagem: "Não foi possível cadastrar o pedido" });
    }
  }
}

module.exports = new OrderController();

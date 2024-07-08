const { Router } = require("express");

const ProductController = require("../controllers/ProductController");

const productsRoutes = new Router();

productsRoutes.post("/", ProductController.create);
productsRoutes.get("/", ProductController.list);

module.exports = productsRoutes;

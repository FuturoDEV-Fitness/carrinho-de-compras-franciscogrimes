const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");

const ordersRoutes = new Router();

ordersRoutes.post("/", OrdersController.create);

module.exports = ordersRoutes;

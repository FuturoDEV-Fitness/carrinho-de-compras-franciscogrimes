const { Router } = require("express");
const clientRoute = require("./clients.routes");

const routes = new Router();

// routes.use("/clients", clientRoute);

module.exports = routes;

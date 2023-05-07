const routes = require("express").Router();

const controller = require("../controllers");

routes.get("/", controller.homePageFunction);
routes.use(require("./contacts"));

module.exports = routes;

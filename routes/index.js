const routes = require('express').Router();

const controller = require('../controllers');

routes.get('/', controller.homePageFunction);

module.exports = routes;
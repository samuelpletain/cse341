const routes = require('express').Router();

const controller = require('../controllers');
const contacts = require('../controllers/contactsController')

routes.get('/', controller.homePageFunction);
routes.use(require('./contacts'));

module.exports = routes;
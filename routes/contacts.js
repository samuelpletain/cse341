const routes = require('express').Router();

const controller = require('../controllers/contactsController');

routes.get('/contacts', controller.getAllContacts);
routes.get('/contacts/:contactId', controller.getContactById);

module.exports = routes;
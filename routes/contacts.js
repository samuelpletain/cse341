const routes = require("express").Router();

const controller = require("../controllers/contactsController");

routes.get("/contacts", controller.getAllContacts);
routes.get("/contacts/:contactId", controller.getContactById);
routes.delete("/contacts/:contactId", controller.deleteContactById);
routes.put("/contacts/:contactId", controller.updateContactById);
routes.post("/contacts", controller.addContact);

module.exports = routes;

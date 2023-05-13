const db = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  // #swagger.summary = "This endpoint returns a list of all the contacts in the database."
  try {
    const contacts = await db.getDb().db("CSE341").collection("contacts").find({}).toArray();
    /* #swagger.responses[200] = {
            description: 'Returns an array of contact objects.',
            schema: [{ $ref: '#/definitions/Contact' }]
    } */
    res.send(contacts).status(200);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const getContactById = async (req, res) => {
  // #swagger.summary = "This endpoint returns the details of a single contact."
  /*  #swagger.parameters['contactId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  try {
    let id = req.params.contactId;
    try {
      id = new ObjectId(id);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    const contact = await db
      .getDb()
      .db("CSE341")
      .collection("contacts")
      .find({ _id: id })
      .toArray();
    /* #swagger.responses[200] = {
            description: 'Returns a contact object.',
            schema: { $ref: '#/definitions/Contact' },
    } */
    res.send(contact).status(200);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const addContact = async (req, res) => {
  // #swagger.summary = "This endpoint creates a new contact."
  /*  #swagger.parameters['contact'] = {
                in: 'body',
                description: 'A contact object',
                schema: { $ref: '#/definitions/Contact' },
                required: true
        } */
  try {
    const contact = req.body;
    const collection = db.getDb().db("CSE341").collection("contacts");
    const newContact = await collection.insertOne(contact);
    /* #swagger.responses[201] = {
            description: 'Returns an object containing the result of the insertion and a string representing a MongoDB ObjectId.',
            schema: {
                    acknowledged: true,
                    insertedId: "643f75ca2cec8ebd2a3cc16c"
                }
    } */
    res.status(201).send(newContact);
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const deleteContactById = async (req, res) => {
  // #swagger.summary = "This endpoint deletes a single contact."
  /*  #swagger.parameters['contactId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  try {
    let id = req.params.contactId;
    try {
      id = new ObjectId(id);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    await db.getDb().db("CSE341").collection("contacts").deleteOne({ _id: id });
    /* #swagger.responses[200] = {
            description: 'The specified contact has been deleted.',
    } */
    res.status(200).send();
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

const updateContactById = async (req, res) => {
  // #swagger.summary = "This endpoint updates the details of a single contact."
  /*  #swagger.parameters['contactId'] = {
                in: 'path',
                description: 'A MongoDB ObjectId',
                required: true
        } */
  /*  #swagger.parameters['contact'] = {
                in: 'body',
                description: 'An updated contact object',
                schema: { $ref: '#/definitions/Contact' },
                required: true
        } */
  try {
    const contact = req.body;
    let id = "";
    try {
      id = new ObjectId(req.params.contactId);
    } catch (err) {
      /* #swagger.responses[400] = {
            description: 'An invalid MongoDB ObjectId was provided.'
    } */
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    await db.getDb().db("CSE341").collection("contacts").updateOne({ _id: id }, { $set: contact });
    /* #swagger.responses[204] = {
                description: 'The specified contact has been edited.',
        } */
    res.status(204).send();
  } catch (err) {
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    res.status(500).json(err);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContactById,
  addContact
};

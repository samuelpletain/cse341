const db = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await db.getDb().db("CSE341").collection("contacts").find({}).toArray();
    res.send(contacts).status(200);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    let id = req.params.contactId;
    try {
      id = new ObjectId(id);
    } catch (err) {
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    const contact = await db
      .getDb()
      .db("CSE341")
      .collection("contacts")
      .find({ _id: id })
      .toArray();
    res.send(contact).status(200);
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = req.body;
    const collection = db.getDb().db("CSE341").collection("contacts");
    const newContact = await collection.insertOne(contact);
    res.status(201).send({ _id: newContact.insertedId });
  } catch (err) {
    next(err);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    let id = req.params.contactId;
    try {
      id = new ObjectId(id);
    } catch (err) {
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    await db.getDb().db("CSE341").collection("contacts").deleteOne({ _id: id });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const contact = req.body;
    let id = "";
    try {
      id = new ObjectId(req.params.contactId);
    } catch (err) {
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    await db.getDb().db("CSE341").collection("contacts").updateOne({ _id: id }, { $set: contact });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContactById,
  addContact
};

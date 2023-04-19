const db = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = (req, res, next) => {
  try {
    db.then(client => {
      let collection = client.db("CSE341").collection('contacts');
      collection.find({}).toArray().then((data) => {
        res.send(data).status(200);
      });
    });  
  } catch (err) {
    next(err);
  }
}

const getContactById = (req, res, next) => {
  try {
    let id = ""
    try {
      id = new ObjectId(req.params.contactId);
    } catch (err) {
      res.status(400).send("Please provide a valid contact id.");
      return;
    }
    db.then(client => {
      let collection = client.db("CSE341").collection('contacts');
      collection.find({_id: id}).toArray().then((data) => {
        res.send(data).status(200);      
      });
    });  
  } catch (err) {
    next(err);
  }  
}

module.exports = { getAllContacts, getContactById };
const connectionString = process.env.ATLAS_URI || "";

const MongoClient = require('mongodb').MongoClient

const db = MongoClient.connect(connectionString);

module.exports = db;

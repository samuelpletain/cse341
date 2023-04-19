const connectionString = process.env.ATLAS_URI || "";

const MongoClient = require('mongodb').MongoClient

try {
  const db = MongoClient.connect(connectionString);
} catch (err) {
  console.log(err.message);
}

module.exports = db;

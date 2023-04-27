var express = require('express');
var bodyParser = require('body-parser');
const db = require('./db/connection');
require("dotenv").config();

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/', require('./routes'));

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  }
});
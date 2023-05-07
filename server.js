var express = require("express");
const db = require("./db/connection");
require("dotenv").config();

var app = express();

const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use("/", require("./routes"));

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});

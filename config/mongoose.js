//include mongoose
const mongoose = require("mongoose");
const env = require("./environment");

//connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

//check if successfully connected to the database
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Error in connecting to the database")
);
db.once("open", function () {
  console.log("Successfully connected to the database");
});

//export database
module.exports = db;

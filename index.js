const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;

const db = require("./config/mongoose");

const bodyParser = require("body-parser");

//we load the db location from the JSON files
const config = require("config");

const morgan = require("morgan");

//require passport and JWT Strategy for auth
const passport = require("passport");
//use of JWT token
const passportJWT = require("./config/passport-jwt-strategy");

//do not show the log for test
if (config.util.getEnv("NODE_ENV") !== "test") {
  //use of morgan library for command line
  app.use(morgan("combined"));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(passport.initialize());
//use express router
app.use("/", require("./routes/index"));

app.get("/", (req, res) => {
  res.send(
    "<body style='background-color:cyan'><h1 style='text-align:center; font-size:50px'>Welcome to Hospital API </h1></body>"
  );
});
app.get("*", (req, res) => {
  res.send(
    "<body style='background-color:cyan'><h1 style='text-align:center; font-size:50px'>ERROR 404 </h1></body>"
  );
});

//server running on port 8000
app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app; //for testing

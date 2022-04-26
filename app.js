var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

var app = express();

function setVariables(req, res, next) {
  // passing variables
  res.locals.myCache = myCache;
  next();
}

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", setVariables, usersRouter);
app.use("/services", setVariables, servicesRouter);

module.exports = app;

const config = require("./../config");
var express = require("express");
const jwt = require("jsonwebtoken");
const { getData, createData } = require("./../utils/data");
var router = express.Router();

router.post("/login", function (req, res, next) {
  const {
    body: { username, password },
  } = req;
  const {
    locals: { myCache },
  } = res;
  if (username && password) {
    const { PRIVATE_KEY, USERNAME, PASSWORD } = config;

    if (username === USERNAME && password === PASSWORD) {
      var token = jwt.sign({ username, loginDate: new Date() }, PRIVATE_KEY);
      createData(myCache);
      res.status(200).json({
        status: "validated",
        token,
      });
    } else {
      res.status(500).send("user or password are wrong");
    }
  } else {
    res.status(500).send("fields can not be empty");
  }
});

module.exports = router;

const config = require("./../config");
var express = require("express");
const jwt = require("jsonwebtoken");
const { getData } = require("./../utils/data");
var router = express.Router();

router.post("/", function (req, res, next) {
  const { PRIVATE_KEY, USERNAME } = config;
  const {
    headers: { token },
    body: { sortField, sortMethod, pageSize, pageNumber },
  } = req;

  const {
    locals: { myCache },
  } = res;

  const { username } = jwt.verify(token, PRIVATE_KEY);
  if (USERNAME === username) {
    const data = getData(myCache, pageSize, pageNumber, sortField, sortMethod);

    res.status(200).json(data);
  } else {
    res.status(500).send("invalid token");
  }
});

module.exports = router;

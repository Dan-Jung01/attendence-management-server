var express = require("express");
var router = express.Router();
const { User } = require("../models");
const { Worktime } = require("../models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

/* GET home page. */
router.get("/current-user-status", function (req, res) {
  User.findAll({})
    .then((data) => {
      const userData = data.map((mData) => mData);
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

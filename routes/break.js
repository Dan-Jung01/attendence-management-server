var express = require("express");
var router = express.Router();
const { Break } = require("../models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

/* Post Leave period and reason */
router.post("/break", function (req, res) {
  const { start_date, end_date, today_date, user_name, user_id, reason } = req.body;

  Break.create({
    start_date: start_date,
    end_date: end_date,
    today_date: today_date,
    user_name: user_name,
    user_id: user_id,
    reason: reason,
    status: "DEFER",
  }).then((r) => res.json(r));
});

module.exports = router;

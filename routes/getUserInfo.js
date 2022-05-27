var express = require("express");
var router = express.Router();
const { User } = require("../models");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

/* Get User Info */
router.get("/userInfo", function (req, res, next) {
  User.findAll({ order: [[Sequelize.col("id"), "DESC"]] })
    .then((data) => {
      const userData = data.map((mData) => mData);
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Delete User Info */
router.delete("/userInfo/:userId", async function (req, res) {
  const test = req.params.userId;

  User.destroy({
    where: {
      id: { [Op.eq]: test },
    },
  })
    .then((r) => res.json(r))
    .catch((err) => {
      console.log(err);
    });
});

/* Edit User Info */
router.put("/userInfo", function (req, res) {
  const { user_name, user_id, phone, start_date } = req.body;

  User.update(
    {
      user_name: user_name,
      user_id: user_id,
      phone: phone,
      start_date: start_date,
    },
    {
      where: {
        user_id: user_id,
      },
    }
  ).then((r) => res.json(true));
});

module.exports = router;

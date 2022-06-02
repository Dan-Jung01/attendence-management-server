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

/* Get Certain User Info */
router.get("/userInfo/:userId", function (req, res, next) {
  const user_id = req.params.userId;

  User.findOne({
    attributes: ["break_cnt", "user_id"],
    where: {
      user_id: { [Op.eq]: user_id },
    },
  })
    .then((data) => {
      // const userData = data.map((mData) => mData);
      res.json(data);
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

/* Edit User Break Info */
router.put("/userInfo/break", function (req, res) {
  const { user_id, used_date_cnt } = req.body;

  User.update(
    {
      // break_cnt: break_cnt - used_date_cnt,
      // break_cnt: Sequelize.literal(`${break_cnt} - ${used_date_cnt}`),
      break_cnt: Sequelize.literal(`break_cnt - ${used_date_cnt}`),
    },
    {
      where: {
        user_id: user_id,
      },
    }
  ).then((r) => res.json(r));
});

module.exports = router;

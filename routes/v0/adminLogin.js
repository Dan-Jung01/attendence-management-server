var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../../models");
const { Sequelize } = require("sequelize");

/* POST user login */
router.post("/admin-login", function (req, res) {
  const user_id = req.body.user_id;
  const user_pwd = req.body.user_pwd;
  const Op = Sequelize.Op;

  //Verify body
  if (!user_id || !user_pwd) {
    res.status(400).json({
      error: true,
      message: "아이디와 비밀번호 모두 적어주세요",
    });
    return;
  }

  Admin.findAll({
    where: {
      user_id: { [Op.eq]: user_id },
    },
  })
    .then((users) => {
      if (users.length == 0) {
        res.status(401).json({
          error: true,
          message: "아이디 혹은 비밀번호가 맞지 않습니다",
        });
        return;
      }
      // Compare password hashes
      const user = users[0];
      return bcrypt.compare(user_pwd, user.user_pwd);
    })
    .then((match) => {
      if (!match) {
        res.status(401).json({
          error: true,
          message: "아이디 혹은 비밀번호가 맞지 않습니다",
        });
        return;
      }
      // Create and return JWT token
      const secretKey = "process.env.SECRETKEY";
      const expires_in = 60 * 60 * 24; // 1DAY
      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ user_id, exp }, secretKey);
      res.status(200).json({ token, token_type: "Bearer", expires_in });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

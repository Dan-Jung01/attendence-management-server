var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Sequelize } = require("sequelize");
require("dotenv").config();

/* POST user login */
router.post("/login", function (req, res) {
  const user_id = req.body.user_id;
  const user_pwd = req.body.user_pwd;
  const Op = Sequelize.Op;

  User.findAll({
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
      const user = users[0];

      // Compare password hashes
      const match = bcrypt.compareSync(user_pwd, user.user_pwd);

      if (match) {
        // Create and return JWT token
        const secretKey = process.env.SECRETKEY;
        const expires_in = 60 * 60 * 24; // 1DAY
        const exp = Date.now() + expires_in * 1000;
        delete user.user_pwd;
        const token = jwt.sign({ user, exp }, secretKey);

        res.status(200).json({ token, token_type: "Bearer", expires_in });
      } else {
        res.status(401).json({
          error: true,
          message: "아이디 혹은 비밀번호가 맞지 않습니다",
        });
        // return;
      }
      // return bcrypt.compare(user_pwd, user.user_pwd);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/login", function (req, res) {
  const token = req.query.token;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    //토큰이 존재하지 않으면 status 401 전송
    return res.status(401).send("need user token");
  }
  users
    .findOne({ where: { id: decoded.user_id } }) //토큰으로부터 userid 받아옴
    .then((result) => res.status(200).json(result.dataValues)); //해당하는 user정보 전송 }
});

module.exports = router;

// //Verify body
// if (!user_id || !user_pwd) {
//   res.status(400).json({
//     error: true,
//     message: "아이디와 비밀번호 모두 적어주세요",
//   });
//   return;
// }

var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Sequelize } = require("sequelize");
require("dotenv").config();

/* POST Login */
router.post("/login", async function (req, res) {
  const user_id = req.body.user_id;
  const user_pwd = req.body.user_pwd;
  const Op = Sequelize.Op;

  try {
    const matchUser = await User.findAll({
      where: {
        user_id: { [Op.eq]: user_id },
      },
    });

    if (matchUser.length === 0) {
      res.status(401).json({
        error: true,
        message: "아이디 혹은 비밀번호가 맞지 않습니다",
      });
      return;
    }

    const user = matchUser[0];
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
      return;
    }
  } catch (err) {
    console.log(err);
  }
});

/* GET User Token Info */
router.get("/login", async function (req, res) {
  const { token } = req.query;
  const decoded = jwt.verify(token, process.env.SECRETKEY);

  try {
    if (!decoded) {
      //토큰이 존재하지 않으면 status 401 전송
      return res.status(401).send("need user token");
    }

    const decodedToken = await User.findOne({ where: { user_id: decoded.user.user_id } }); //토큰으로부터 userid 받아옴
    delete decodedToken.dataValues.user_pwd;
    res.json(decodedToken.dataValues);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

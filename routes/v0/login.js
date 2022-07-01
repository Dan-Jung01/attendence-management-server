var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const Op = Sequelize.Op;

/* POST Login */
router.post("/login", async function (req, res) {
  const { user_id, user_pwd } = req.body;

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
      user.user_pwd = undefined;
      const token = jwt.sign(user.dataValues, secretKey, {
        expiresIn: "1 day",
      });

      res.status(200).json({ token, token_type: "Bearer" });
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
router.get("/check-type", async function (req, res) {
  const { user_id } = req.query;
  console.log(user_id);

  await User.findOne({
    attributes: ["type"],
    where: {
      user_id: { [Op.eq]: user_id },
    },
    raw: true,
  }).then((userType) => {
    console.log(userType);
    res.json(userType);
  });

  // const decoded = jwt.verify(token, process.env.SECRETKEY);

  // try {
  //   if (!decoded) {
  //     //토큰이 존재하지 않으면 status 401 전송
  //     return res.status(401).send("need user token");
  //   }

  //   const decodedToken = await User.findOne({ where: { user_id: decoded.user.user_id } }); //토큰으로부터 userid 받아옴
  //   delete decodedToken.dataValues.user_pwd;
  //   res.json(decodedToken.dataValues);
  // } catch (err) {
  //   console.log(err);
  // }
});

module.exports = router;

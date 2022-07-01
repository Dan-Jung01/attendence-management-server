import { Router } from "express";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Sequelize } from "sequelize";
import { User } from "../../../models";

require("dotenv").config();

const router = Router();
const Op = Sequelize.Op;

/* POST Login */
router.post("/", async function (req, res) {
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
    const match = compareSync(user_pwd, user.user_pwd);

    if (match) {
      // Create and return JWT token
      const secretKey = process.env.SECRETKEY;
      user.user_pwd = undefined;
      const token = sign(user.dataValues, secretKey, {
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
});

module.exports = router;

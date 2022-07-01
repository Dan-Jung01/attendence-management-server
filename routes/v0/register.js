var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");

router.post("/register", function (req, res, next) {
  const { user_id, user_pwd, user_name, start_date, phone, break_cnt, type } = req.body;

  // Vertify body
  if (!user_id || !user_pwd) {
    res.status(400).json({
      error: true,
      message: "아이디 또는 비밀번호가 입력되지 않았습니다",
    });
    return;
  }

  const queryUsers = User.findAll({
    where: { user_id: user_id },
  });

  queryUsers.then((users) => {
    if (users.length > 0) {
      res.status(409).json({
        error: true,
        message: "User already exists",
      });
      return;
    }

    // Insert user into DB
    const saltRounds = 10;
    const hash = bcrypt.hashSync(user_pwd, saltRounds);
    return User.create({
      user_id: user_id,
      user_pwd: hash,
      user_name: user_name,
      start_date: start_date,
      phone: phone,
      break_cnt: break_cnt,
      type: type,
    }).then(res.status(201).json({ success: "true", message: "User created" }));
  });
});

module.exports = router;

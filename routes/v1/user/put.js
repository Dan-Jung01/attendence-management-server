import { Router } from "express";
import { User } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", async function (req, res) {
  const { user_name, user_id, phone, start_date, break_cnt } = req.body;

  try {
    User.update(
      {
        user_name: user_name,
        user_id: user_id,
        phone: phone,
        start_date: start_date,
        break_cnt,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    ).then((r) => res.json(r));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

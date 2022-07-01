import { Router } from "express";
import { User } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", function (req, res) {
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

import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", function (req, res) {
  const { user_id, today_date, is_miss } = req.body;

  if (is_miss) {
    Worktime.update(
      {
        state_miss_check: 1,
      },
      {
        where: {
          user_id: user_id,
          today_date: today_date,
        },
      }
    ).then((r) => res.json(r));
  } else {
    Worktime.update(
      {
        state_miss_check: 0,
      },
      {
        where: {
          user_id: user_id,
          today_date: today_date,
        },
      }
    ).then((r) => res.json(r));
  }
});

module.exports = router;

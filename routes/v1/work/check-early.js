import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", function (req, res) {
  const { user_id, today_date, is_early } = req.body;

  if (is_early) {
    Worktime.update(
      {
        state_early_check: 1,
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
        state_early_check: 0,
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

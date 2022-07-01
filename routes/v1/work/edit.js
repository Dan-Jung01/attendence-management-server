import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", function (req, res) {
  const { off_work, on_work, today_date, user_id } = req.body;

  Worktime.update(
    {
      on_work: on_work,
      off_work: off_work,
    },
    {
      where: {
        user_id: user_id,
        today_date: today_date,
      },
    }
  ).then((r) => res.json(r));
});

module.exports = router;

import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.put("/", function (req, res, next) {
  const { off_work, today_date, user_name, total_work } = req.body;

  Worktime.update(
    {
      off_work: off_work,
      total_work: total_work,
    },
    {
      where: {
        user_name: user_name,
        today_date: today_date,
      },
    }
  ).then((r) => res.json(r));
});

module.exports = router;

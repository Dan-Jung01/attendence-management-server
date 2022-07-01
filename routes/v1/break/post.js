import { Router } from "express";
import { Sequelize } from "sequelize";
import { Break } from "../../../models";

const router = Router();

router.post("/", function (req, res) {
  const { start_date, end_date, today_date, used_date_cnt, user_name, user_id, reason } = req.body;

  Break.create({
    start_date: start_date,
    end_date: end_date,
    today_date: today_date,
    used_date_cnt: used_date_cnt,
    user_name: user_name,
    user_id: user_id,
    reason: reason,
    status: "DEFER",
  }).then((r) => res.json(r));
});

module.exports = router;

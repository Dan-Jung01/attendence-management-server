import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.post("/", function (req, res) {
  const { on_work, today_date, user_name, user_id } = req.body;

  // const findDupl = Worktime.findOne({
  //   where: {
  //     [Op.or]: [{ user_name: user_name }, { today_date: today_date }],
  //   },
  // });

  // if (findDupl === null) {
  //   // 시간 생성
  // } else {
  //   // 에러 처리
  // }

  Worktime.create({
    on_work: on_work,
    today_date: today_date,
    user_name: user_name,
    off_work: "00:00:00",
    user_id: user_id,
    state_late: 0,
    state_early_check: 0,
    state_miss_check: 0,
    state_absence: 0,
  }).then((r) => res.json(r));
});

module.exports = router;

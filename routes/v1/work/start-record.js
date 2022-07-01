import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", async function (req, res, next) {
  const { user_name, today_date } = req.query;

  try {
    const findWorkTime = await Worktime.findOne({
      where: {
        user_name: { [Op.eq]: user_name },
        today_date: { [Op.eq]: today_date },
      },
      raw: true,
    });

    res.json(findWorkTime);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

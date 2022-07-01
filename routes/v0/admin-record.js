import { Router } from "express";
import { Worktime, sequelize } from "../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", function (req, res, next) {
  const { startDate, endDate } = req.query;

  if (startDate && endDate) {
    Worktime.findAll({
      attributes: ["id", "user_id", "on_work", "off_work", "today_date", "user_name"],
      where: { today_date: { [Op.between]: [startDate, endDate] } },
      order: sequelize.col("id"),
    }).then((data) => {
      const workData = data.map((mData) => mData).reverse();
      res.json(workData);
    });
  } else {
    Worktime.findAll({
      attributes: ["id", "user_id", "on_work", "off_work", "today_date", "user_name"],
      order: sequelize.col("id"),
    }).then((data) => {
      const workData = data.map((mData) => mData).reverse();
      res.json(workData);
    });
  }

  // .catch((err) => {
  //   console.log(err);
  // });
});

module.exports = router;

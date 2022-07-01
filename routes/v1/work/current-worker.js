import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", function (req, res, next) {
  const { today_date } = req.query;

  Worktime.findAll({
    attributes: ["user_name", "on_work", "off_work"],
    where: {
      today_date: { [Op.eq]: today_date },
      off_work: { [Op.eq]: "00:00:00" },
    },
  })
    .then((data) => {
      const workData = data.map((mData) => mData).reverse();
      res.json(workData);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

import { Router } from "express";
import { Worktime } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", function (req, res, next) {
  const { user_id } = req.query;

  Worktime.findAll({
    attributes: ["today_date", "on_work", "off_work"],
    where: {
      user_id: { [Op.eq]: user_id },
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

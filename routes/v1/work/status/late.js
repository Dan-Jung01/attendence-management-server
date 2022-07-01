import { Router } from "express";
import { Worktime } from "../../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", function (req, res, next) {
  const { user_id } = req.query;

  Worktime.findAll({
    attributes: ["id", "today_date", "on_work"],
    where: {
      user_id: { [Op.eq]: user_id },
      state_late: { [Op.eq]: 1 },
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

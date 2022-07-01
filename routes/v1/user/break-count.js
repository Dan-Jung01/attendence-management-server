import { Router } from "express";
import { User } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/:user_id", function (req, res, next) {
  const { user_id } = req.params;

  User.findOne({
    attributes: ["break_cnt", "user_id"],
    where: {
      user_id: { [Op.eq]: user_id },
    },
  })
    .then((data) => {
      // const userData = data.map((mData) => mData);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

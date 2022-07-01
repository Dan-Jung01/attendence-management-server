import { Router } from "express";
import { User } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.delete("/:table_id", async function (req, res) {
  const { table_id } = req.params;

  User.destroy({
    where: {
      id: { [Op.eq]: table_id },
    },
  })
    .then((r) => res.json(r))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

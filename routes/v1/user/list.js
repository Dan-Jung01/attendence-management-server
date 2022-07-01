import { Router } from "express";
import { User } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", function (req, res, next) {
  User.findAll({ order: [[Sequelize.col("id"), "DESC"]] })
    .then((data) => {
      const userData = data.map((mData) => mData);
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

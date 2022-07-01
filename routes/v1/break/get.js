import { Router } from "express";
import { Break } from "../../../models";
import { Sequelize } from "sequelize";

const router = Router();
const Op = Sequelize.Op;

router.get("/", function (req, res) {
  Break.findAll({ order: [[Sequelize.col("id"), "DESC"]] })
    .then((data) => {
      const userData = data.map((mData) => mData);
      console.log(userData);
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

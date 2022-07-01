import { Router } from "express";
// import {authorization} from "../../middlewares/authorization";

const router = Router();
router.use("/auth", require("./auth"));
router.use("/break", require("./break"));
router.use("/user", require("./user"));
router.use("/work", require("./work"));

module.exports = router;

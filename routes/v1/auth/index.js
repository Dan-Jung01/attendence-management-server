import { Router } from "express";
// import {authorization} from "../../../middlewares/authorization";

const router = Router();
router.use("/sign-in", require("./sign-in"));
router.use("/sign-up", require("./sign-up"));

// router.use(authorization({}));

module.exports = router;

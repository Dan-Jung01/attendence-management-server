import { Router } from "express";

const router = Router();

router.use("/health-check", require("./health-check"));
router.use("/v1", require("./v1"));

// router.all("/robots.txt", (req, res) => {
//   res.type("text/plain");
//   res.send("User-agent: *\nDisallow: /");
// });

module.exports = router;

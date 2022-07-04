import { Router } from "express";

const router = Router();
router.all("/", (req, res) => {
  res.json({ code: "success", server_id: "B:443" });
});

module.exports = router;

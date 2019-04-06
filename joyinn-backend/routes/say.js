const express = require("express");
const router = express.Router();
const query = require("../utils/query");
const { all_personal_says } = require("../query/sql-words");

/* GET all says */
router.get("/", async (req, res, next) => {
  const data = await query(all_personal_says);
  res.json({
    code: data ? 0 : 1,
    says: data
  });
});

module.exports = router;

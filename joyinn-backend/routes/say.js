const express = require("express");
const router = express.Router();
const query = require("../utils/query");
const {
  all_personal_says,
  post_say,
  get_one_say
} = require("../query/sql-words");

/* GET all says */
router.get("/", async (req, res) => {
  const data = await query(all_personal_says);
  res.json({
    code: data ? 0 : 1,
    msg: "get all says",
    says: data
  });
});

router.get("/getone", async (req, res) => {
  const { id } = req.query;
  const data = await query(get_one_say, [parseInt(id)]);
  res.json({
    code: data ? 0 : 1,
    msg: "get one say",
    say: data[0]
  });
});

router.post("/", async (req, res) => {
  const { photo, say_text } = req.body;
  const uid = req.user.uid;
  console.log(req.user);

  const photoNum = JSON.parse(photo).length;
  console.log("photoNum", photoNum);
  let type;
  if (photoNum === 0) type = 0;
  else if (say_text === "") type = 1;
  else type = 2;
  const insertResult = await query(post_say, [type, say_text, photo, uid, 1]);
  res.json({
    code: 0,
    msg: "insert success",
    insertId: insertResult.insertId
  });
});

module.exports = router;

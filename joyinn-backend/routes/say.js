const express = require("express");
const router = express.Router();
const query = require("../utils/query");
const {
  all_personal_says,
  post_say,
  get_one_say,
  get_say_reply,
  post_say_reply,
  get_one_say_reply
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
// get one say
router.get("/getone", async (req, res) => {
  const { id } = req.query;
  const data = await query(get_one_say, [parseInt(id)]);
  res.json({
    code: data ? 0 : 1,
    msg: "get one say",
    say: data[0]
  });
});
// post one say
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
// get one say's all replies
router.get("/reply", async (req, res) => {
  const { say_id } = req.query;
  const data = await query(get_say_reply, [parseInt(say_id)]); // inject say_id
  res.json({
    code: data ? 0 : 1,
    msg: "success",
    replies: data
  });
});
// post a reply to a say
router.post("/reply", async (req, res) => {
  const { say_id, uid, reply } = req.body;
  const insertResult = await query(post_say_reply, [reply, uid, say_id]);
  const getInstantReply = await query(get_one_say_reply,[insertResult.insertId]);
  res.json({
    code: 0,
    msg: "post success",
    reply: getInstantReply[0]
  });
});

module.exports = router;

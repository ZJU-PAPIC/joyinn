var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const myconfig = require("../myconfig");
const query = require("../utils/query");
const {
  my_user_info,
  my_user_info_with_password
} = require("../query/sql-words");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
router.get("/getuserinfo", async (req, res) => {
  console.log(req.user);
  const userinfo = await query(my_user_info, [req.user.aud]);
  res.json({
    code: 0,
    user: userinfo[0]
  });
});
router.post("/login", async function(req, res, next) {
  const { username, password } = req.body;
  const userinfo_pw = await query(my_user_info_with_password, [username]);
  console.log(userinfo_pw);

  if (userinfo_pw.length === 0) {
    res.json({
      code: 4001,
      msg: "no such user"
    });
  } else if (password === userinfo_pw[0].password) {
    const token = jwt.sign(
      {
        iss: "joyinn",
        aud: username
      },
      myconfig.jwtSecret,
      {
        // 授权时效1day
        expiresIn: 60 * 60 * 24
      }
    );
    const userinfo = await query(my_user_info, [username]);
    res.json({
      code: 0,
      msg: "login ok",
      token,
      user: userinfo[0]
    });
  } else {
    res.json({
      code: 4002,
      msg: "wrong password"
    });
  }
});

module.exports = router;

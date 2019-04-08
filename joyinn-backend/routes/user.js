var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const myconfig = require("../myconfig");
const query = require("../utils/query");
const { uniqueUid } = require("../utils/generateString");
const { randomAvatar } = require("../utils/avatar");

const {
  my_user_info,
  my_user_info_with_password,
  is_exist_user,
  register_user
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
router.post("/register", async (req, res) => {
  // 暂时需要邀请码
  const preInviteCode = "PAPIC2019XYZ";
  const { username, password, inviteCode, nickname, gender } = req.body;
  if (preInviteCode !== inviteCode) {
    res.json({
      code: 4002,
      msg: "邀请码错误"
    });
    return;
  }
  if (
    username.length < 6 ||
    username.length > 15 ||
    password.length < 8 ||
    password.length > 20
  ) {
    res.json({
      code: 4003,
      msg: "用户名或密码不符合规范"
    });
    return;
  }
  const existUser = await query(is_exist_user, [username]);
  if (existUser[0].count !== 0) {
    res.json({
      code: 4001,
      msg: "已有该用户"
    });
    return;
  }
  // start to register
  // generate uid
  const uid = uniqueUid();
  console.log("generate uid:", uid);
  // generate avatar
  const avatar = randomAvatar;
  console.log("generate avatar:", avatar);
  // insert into user
  const regUser = await query(register_user, [
    uid,
    nickname,
    gender,
    username,
    password,
    avatar
  ]);
  console.log('regUser result:',regUser);
  
  res.json({
    code: 0,
    msg: "注册成功",
    // insertId: regUser[0].insertId
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
        aud: username,
        uid: userinfo_pw[0].uid
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

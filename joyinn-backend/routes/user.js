var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const myconfig = require("../myconfig");
const query = require("../utils/query");
const md5 = require("md5");
const mailit = require("../utils/mail");
const { uniqueUid } = require("../utils/generateString");
const { randomAvatar } = require("../utils/avatar");

const {
  my_user_info,
  my_user_info_with_password,
  is_exist_user,
  is_exist_valid_user,
  is_exist_unvalid_user,
  register_user,
  register_fill_userinfo,
  update_logintime,
  get_user_validcode,
  get_user_password,
  update_user_validcode,
  update_user_validStatus,
  update_user_basicinfo,
  update_user_password
} = require("../query/sql-words");

router.get("/getuserinfo", async (req, res) => {
  console.log(req.user);
  const userinfo = await query(my_user_info, [req.user.aud]);
  res.json({
    code: 0,
    user: userinfo[0]
  });
});
router.post("/updatepassword", async (req, res) => {
  const uid = req.user.uid;
  const { oldpassword, newpassword } = req.body;
  if (newpassword.length < 8 || newpassword.length > 20) {
    res.json({
      code: 4001,
      msg: "密码格式有误"
    });
    return;
  }
  const userinfo_pw = await query(get_user_password, [uid]);
  if (md5(oldpassword) !== userinfo_pw[0].password) {
    res.json({
      code: 4002,
      msg: "旧密码错误"
    });
    return;
  }
  await query(update_user_password, [md5(newpassword), uid]);
  res.json({
    code: 0
  });
});
router.post("/updatebasicinfo", async (req, res) => {
  const uid = req.user.uid;
  const {
    nick_name,
    gender,
    introduction,
    true_name,
    mobile,
    website_url
  } = req.body;
  await query(update_user_basicinfo, [
    nick_name,
    gender,
    introduction,
    true_name,
    mobile,
    website_url,
    uid
  ]);
  res.json({
    code: 0
  });
});
router.post("/register", async (req, res) => {
  const { username, password, nickname, gender } = req.body;

  if (
    username.length < 6 ||
    username.length > 15 ||
    password.length < 8 ||
    password.length > 20
  ) {
    res.json({
      code: 4001,
      msg: "用户名或密码不符合规范"
    });
    return;
  }
  const existRegUser = await query(is_exist_user, [username]);
  if (existRegUser[0].count !== 0) {
    res.json({
      code: 4002,
      msg: "该用户已完成注册"
    });
    return;
  }
  const existUnvalidUser = await query(is_exist_unvalid_user, [username]);
  if (existUnvalidUser[0].count !== 0) {
    res.json({
      code: 4003,
      msg: "浙大邮箱尚未验证成功"
    });
    return;
  }
  const existValidUser = await query(is_exist_valid_user, [username]);
  if (existValidUser[0].count !== 0) {
    // start to register
    // generate avatar
    const avatar = randomAvatar;
    console.log("generate avatar:", avatar);
    // generate md5 password
    const md5password = md5(password);
    // insert into user
    await query(register_fill_userinfo, [
      md5password,
      nickname,
      gender,
      0,
      avatar,
      username
    ]);
    await query(update_user_validStatus, [2, username]);
    res.json({
      code: 0,
      msg: "注册成功"
    });
    return;
  }

  res.json({
    code: 4004,
    msg: "未知错误"
  });
});
router.post("/login", async function(req, res, next) {
  const { username, password } = req.body;
  const userinfo_pw = await query(my_user_info_with_password, [username]);
  const md5_pw = md5(password);
  console.log(md5_pw);
  
  if (userinfo_pw.length === 0) {
    res.json({
      code: 4001,
      msg: "no such user"
    });
  } else if (md5_pw === userinfo_pw[0].password) {
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
    // update last login time
    await query(update_logintime, [userinfo_pw[0].uid]);
    // get userinfo
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
router.post("/mailtozju", async function(req, res) {
  const { mailAddr, username } = req.body;
  if (username.length < 6 || username.length > 15) {
    res.json({
      code: 4002,
      msg: "用户名不符合规范"
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
  const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@zju.edu.cn$/;
  if (!reg.test(mailAddr)) {
    res.json({
      code: 4003,
      msg: "非浙大邮箱"
    });
    return;
  }
  // send checkmail
  const title = "JOYINN验证码";
  const validcode = Math.ceil(Math.random() * 1000000);
  const body = "验证码是：<b>" + validcode + "</b>";
  mailit(mailAddr, title, body);

  const existUnvalidUser = await query(is_exist_unvalid_user, [username]);
  if (existUnvalidUser[0].count !== 0) {
    await query(update_user_validcode, [mailAddr, validcode, username]);
  } else {
    // generate uid
    const uid = uniqueUid();
    await query(register_user, [uid, username, validcode, 0, mailAddr]);
  }
  res.json({
    code: 0,
    msg: "验证码邮件已发送"
  });
});
router.post("/checkvalidcode", async function(req, res) {
  const { mailAddr, username, validcode } = req.body;
  if (
    username === "" ||
    username === undefined ||
    validcode === "" ||
    validcode === undefined
  ) {
    res.json({
      code: 4002,
      msg: "请正确填写"
    });
    return;
  }
  const prevalidcode = await query(get_user_validcode, [username, mailAddr]);
  if (prevalidcode[0].validcode !== validcode) {
    res.json({
      code: 4001,
      msg: "验证码错误"
    });
    return;
  } else {
    await query(update_user_validStatus, [1, username]);
  }
  res.json({
    code: 0
  });
});

module.exports = router;

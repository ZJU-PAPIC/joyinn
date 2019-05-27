const all_personal_says =
  "SELECT id,type,say_text,photo,post_time,uid,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM personal_say NATURAL JOIN user \
WHERE valid=1 \
ORDER BY post_time DESC";

const get_one_say =
  "SELECT id,type,say_text,photo,post_time,uid,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM personal_say NATURAL JOIN user \
WHERE valid=1 && id=? \
LIMIT 1";

const my_user_info_with_password =
  "SELECT uid,nick_name,gender,user_name,password,avatar,last_login_time,credit \
FROM user \
WHERE user_name = ? AND regvalid=2";

const my_user_info =
  "SELECT uid,nick_name,gender,user_name,avatar,last_login_time, \
  credit,email,mobile,introduction,true_name,fans_number,follows_number, \
  title_name,website_url,auth_level \
FROM user \
WHERE user_name = ? AND regvalid=2";

const post_say =
  "INSERT INTO personal_say (type,say_text,photo,uid,post_time,valid) \
VALUES \
(?,?,?,?,now(),?)";

const is_exist_user =
  "SELECT COUNT(*) AS count \
FROM user \
WHERE user_name=? AND regvalid=2";

const is_exist_valid_user =
  "SELECT COUNT(*) AS count \
FROM user \
WHERE user_name=? AND regvalid=1";

const is_exist_unvalid_user =
  "SELECT COUNT(*) AS count \
FROM user \
WHERE user_name=? AND regvalid=0";

const register_user =
  "INSERT INTO user \
(uid,user_name,validcode,regvalid,email) \
VALUES \
(?,?,?,?,?)";

const update_logintime =
  "UPDATE user \
SET last_login_time = now() \
WHERE uid=?";

const get_say_reply =
  "SELECT id,reply,uid,say_id,datetime,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM say_reply NATURAL JOIN user \
WHERE say_id=? \
ORDER BY datetime";

const post_say_reply =
  "INSERT INTO say_reply \
(reply,uid,say_id,datetime) \
VALUES \
(?,?,?,now())";

const get_one_say_reply =
  "SELECT id,reply,uid,say_id,datetime,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM say_reply NATURAL JOIN user \
WHERE id=?";

const get_user_validcode =
  "SELECT validcode \
FROM user \
WHERE user_name=? AND email=?";

const update_user_validcode =
  "UPDATE user \
SET email=?,validcode=? \
WHERE user_name=?";

const update_user_validStatus =
  "UPDATE user \
SET regvalid=? \
WHERE user_name=?";

const register_fill_userinfo =
  "UPDATE user \
SET password=?,nick_name=?,gender=?,credit=?,avatar=? \
WHERE user_name=?";

const update_user_avatar = "UPDATE user \
SET avatar=? \
WHERE uid=?";

const update_user_basicinfo =
  "UPDATE user \
SET nick_name=?,gender=?,introduction=?,true_name=?,mobile=?,website_url=?\
WHERE uid=?";

const get_user_password = "SELECT password FROM user WHERE uid=?";

const update_user_password="UPDATE user SET password=? WHERE uid=?";

module.exports = {
  // user
  my_user_info,
  my_user_info_with_password,
  get_user_validcode,
  get_user_password,
  update_user_validcode,
  update_user_validStatus,
  is_exist_user,
  is_exist_valid_user,
  is_exist_unvalid_user,
  register_user,
  register_fill_userinfo,
  update_logintime,
  update_user_avatar,
  update_user_basicinfo,
  update_user_password,
  // personal_say
  all_personal_says,
  get_one_say,
  post_say,
  // say_reply
  get_say_reply,
  post_say_reply,
  get_one_say_reply
};

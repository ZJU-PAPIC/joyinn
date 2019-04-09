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
WHERE user_name = ?";

const my_user_info =
  "SELECT uid,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM user \
WHERE user_name = ?";

const post_say =
  "INSERT INTO personal_say (type,say_text,photo,uid,post_time,valid) \
VALUES \
(?,?,?,?,now(),?)";

const is_exist_user = "SELECT COUNT(*) AS count \
FROM user \
WHERE user_name=?";

const register_user =
  "INSERT INTO user \
(uid,nick_name,gender,user_name,password,avatar,credit) \
VALUES \
(?,?,?,?,?,?,0)";

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
(reply,uid,say_id) \
VALUES \
(?,?,?)";

const get_one_say_reply = 
"SELECT id,reply,uid,say_id,datetime,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM say_reply NATURAL JOIN user \
WHERE id=?"

module.exports = {
  all_personal_says,
  get_one_say,
  my_user_info,
  my_user_info_with_password,
  post_say,
  is_exist_user,
  register_user,
  update_logintime,
  get_say_reply,
  post_say_reply,
  get_one_say_reply
};

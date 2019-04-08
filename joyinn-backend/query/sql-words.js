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

module.exports = {
  all_personal_says,
  get_one_say,
  my_user_info,
  my_user_info_with_password,
  post_say
};

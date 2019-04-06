const all_personal_says =
  "SELECT id,type,say_text,photo,post_time,uid,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM personal_say NATURAL JOIN user \
WHERE valid=1 \
ORDER BY post_time DESC";

const my_user_info_with_password =
"SELECT uid,nick_name,gender,user_name,password,avatar,last_login_time,credit \
FROM user \
WHERE user_name = ?";

const my_user_info = 
"SELECT uid,nick_name,gender,user_name,avatar,last_login_time,credit \
FROM user \
WHERE user_name = ?";

module.exports = {
  all_personal_says,
  my_user_info,
  my_user_info_with_password
};

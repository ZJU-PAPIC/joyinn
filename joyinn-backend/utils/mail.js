const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.163.com",
  service: "smtp.163.com",
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: "zju_joyinn@163.com",
    pass: "wangjk99"
  }
});

// send mail with defined transport object
const mailit = (targetAddr, title, mailbody) => {
  let mailOptions = {
    from: "zju_joyinn@163.com", // sender address
    to: targetAddr, // list of receivers
    subject: title,
    html: mailbody // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  });
};

module.exports = mailit;

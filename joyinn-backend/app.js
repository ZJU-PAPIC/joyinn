var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var sayRouter = require("./routes/say");
var uploadRouter = require("./routes/upload");

const expressJWT = require("express-jwt");
const myconfig = require("./myconfig");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// 设置允许跨域访问该服务.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// jwt auth
app.use(
  expressJWT({
    secret: myconfig.jwtSecret
  }).unless({
    path: ["/user/login","/user/register"] //除了这个地址，其他的URL都需要验证
  })
);
// log debug
app.use((req, res, next) => {
  console.log("----------------log debug----------------");
  console.log("reqbody:", req.body);
  console.log("reqparam:", req.query);
  console.log("-----------------------------------------");

  next();
});
// router
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use('/say',sayRouter); //个人动态
app.use('/upload',uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const query = require("../utils/query");
const { uniqueUid } = require("../utils/generateString");

const {
  update_user_avatar
} = require("../query/sql-words");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const fileurl = "public/uploads/img";
    console.log(file);

    cb(null, fileurl);
  },
  filename: function(req, file, cb) {
    const filenameArr = file.originalname.split(".");
    cb(null, Date.now() + "." + filenameArr[filenameArr.length - 1]);
  }
});

const upload = multer({ storage: storage });

router.post("/photo", upload.single("file"), function(req, res, next) {
  console.log("upload photo");
  console.log(req.file);

  res.json({
    msg: "ok",
    filename: req.file.filename
  });
});

const storage_avatar = multer.diskStorage({
  destination: function(req, file, cb) {
    const fileurl = "public/uploads/avatar";
    console.log(file);
    cb(null, fileurl);
  },
  filename: function(req, file, cb) {
    const filenameArr = file.originalname.split(".");
    const uniqueFilename = uniqueUid();
    cb(null, uniqueFilename + "." + filenameArr[filenameArr.length - 1]);
  }
});

const upload_avatar = multer({ storage: storage_avatar });

router.post("/avatar", upload_avatar.single("file"), async (req, res) => {
  const uid = req.user.uid;
  await query(update_user_avatar,[req.file.filename,uid])
  res.json({
    code: 0,
    msg: "ok",
    filename: req.file.filename
  });
});

module.exports = router;

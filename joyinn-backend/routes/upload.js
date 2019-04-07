const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const fileurl = "public/uploads/img";
    console.log(file);

    cb(null, fileurl);
  },
  filename: function(req, file, cb) {
    const filenameArr = file.originalname.split('.');
    cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
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

module.exports = router;

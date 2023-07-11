require("dotenv").config();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "userPictures";
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const username = req.body.userName;
    const date = new Date().toISOString().slice(0, 10);
    const filename = `${username}-${date}.png`;
    cb(null, filename);
  },
maxAge: null,
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") &&
    /\.(png|jpe?g)$/i.test(file.originalname)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PNG, JPG, and JPEG images are allowed."
      )
    );
  }
};

module.exports = multer({ storage, fileFilter });

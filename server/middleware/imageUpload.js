const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage(); // Use memory storage to store image as binary data

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

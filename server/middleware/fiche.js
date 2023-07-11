require("dotenv").config();

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

let counter = 0;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "fiche";
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    const filenameParts = originalFilename.split(".");
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const extension = path.extname(originalFilename);
    const counterPadded = (counter + 1).toString().padStart(2, "0");
    const filename = `${filenameParts[0]}-${counterPadded}-${crypto
      .randomBytes(4)
      .toString("hex")}${extension}`;
    counter++;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" &&
    /\.pdf$/i.test(file.originalname)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."));
  }
};

module.exports = multer({ storage, fileFilter });

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
const storage = new GridFsStorage({
  url: "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net/work",
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;

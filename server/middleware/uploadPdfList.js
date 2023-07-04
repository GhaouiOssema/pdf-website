const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine for GridFs
const storage = new GridFsStorage({
  url: "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net/work",
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "files",
    };
  },
});

// Set up the multer upload for multiple files
const uploadPdfList = multer({ storage, limits: { files: 10 } }).array(
  "files",
  10
);

module.exports = uploadPdfList;

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Set up GridFS storage
const storage = new GridFsStorage({
  url: "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net/work",
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "DOEFile ",
    };
  },
});

const upload = multer({ storage });

// Middleware to handle file upload
const uploadFilesMiddleware = upload.array("files", Infinity);
module.exports = uploadFilesMiddleware;

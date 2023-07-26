const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const conn = mongoose.connection;

// Initialize GridFS stream
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("userProfileImage");
});

// Create storage engine for GridFS
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the uploaded file is a PNG, JPG, or JPEG image
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

const upload = multer({ storage, fileFilter });

const multer = require("multer");
const path = require("path");
const fs = require("fs");

let counter = 1; // Start counter at 1

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder;
    if (file.fieldname === "selectedFile") {
      destinationFolder = "pdfFiles";
    } else if (file.fieldname === "selectedImage") {
      destinationFolder = "pdfImages";
    } else if (file.fieldname === "selectedInfo") {
      destinationFolder = "ficheTechnique";
    }
    const destinationPath = path.join(
      __dirname,
      "..",
      "uploads",
      destinationFolder
    );

    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const currentDate = new Date().toISOString().slice(0, 10);
    const paddedCounter = counter.toString().padStart(2, "0");

    const encryptedDate = Buffer.from(currentDate).toString("base64");
    const firstPartOfFileName = originalName.substring(
      0,
      originalName.lastIndexOf(".")
    );

    const filename = `${firstPartOfFileName}-${paddedCounter}-${encryptedDate}${extension}`;
    counter++; // Increment counter for the next file
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, PNG, JPG, and JPEG files are allowed."
      )
    );
  }
};

// Initialize multer upload
module.exports = multer({
  storage,
  fileFilter,
});

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const PDF = require("../models/PDF");
const fs = require("fs");
const path = require("path");

const FETCH = require("../middleware/fetchAllFiles");

// Initialize GridFS
let gfs;
const connection = mongoose.connection;
connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Your other controller logic goes here
module.exports = {
  async uploadPdf(req, res) {
    try {
      // Handle file upload logic here using multer middleware
      // Access the uploaded file using req.file and save it to GridFS
      const file = req.file;

      if (!file) {
        throw new Error("No file provided");
      }

      const pdf = new PDF({
        filename: file.originalname,
        path: file.filename,
        title: req.body.title,
        publicOrPrivate: req.body.publicOrPrivate,
      });

      const savedPdf = await pdf.save();
      FETCH();
      res.json({ file: savedPdf });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const PDF = require("../models/PDF");

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
      const file = req.file;

      if (!file) {
        throw new Error("No file provided");
      }

      const originalFilename = file.originalname;

      const lastPdf = await PDF.findOne()
        .sort({ _id: -1 })
        .select("filename path")
        .exec();

      let counter = 1;
      let newTitle = `${originalFilename.substring(
        0,
        originalFilename.lastIndexOf(".")
      )}_${counter.toString().padStart(2, "0")}.pdf`;

      if (lastPdf) {
        const lastFilename = lastPdf.filename;
        const lastCounter = parseInt(
          lastFilename.substring(
            lastFilename.lastIndexOf("_") + 1,
            lastFilename.lastIndexOf(".pdf")
          ),
          10
        );

        if (
          originalFilename.substring(0, originalFilename.lastIndexOf(".")) ===
          lastFilename.substring(0, lastFilename.lastIndexOf("_"))
        ) {
          counter = lastCounter + 1;
        }

        newTitle = `${originalFilename.substring(
          0,
          originalFilename.lastIndexOf(".")
        )}_${counter.toString().padStart(2, "0")}.pdf`;
      }

      const pdf = new PDF({
        filename: newTitle,
        path: file.path,
        title: req.body.title,
        publicOrPrivate: req.body.publicOrPrivate,
      });

      const savedPdf = await pdf.save();
      res.json({ file: savedPdf });
      await FETCH();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

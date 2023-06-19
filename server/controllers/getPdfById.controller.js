const PDF = require("../models/PDF");
const { ObjectId } = require("mongoose");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

module.exports = {
  async getPdfDataById(req, res) {
    const id = req.params.id;

    try {
      const pdf = await PDF.findById(id);
      if (!pdf) {
        return res.status(404).json({ error: "PDF not found." });
      }

      res.status(200).json({ pdf });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve PDF data." });
    }
  },
  async getPdfFile(req, res) {
    try {
      const connection = mongoose.connection;
      connection.once("open", () => {
        const gfs = Grid(connection.db, mongoose.mongo);
        gfs.collection("uploads");

        gfs.findOne({ _id: req.params.id }, (err, file) => {
          if (!file) {
            return res.status(404).json({ message: "PDF not found" });
          }

          // Send the original path to the client
          const filePath = file.filename;
          res.json({ filePath });
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};

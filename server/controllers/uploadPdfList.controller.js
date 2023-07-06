const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/USER");
const Folder = require("../models/FOLDER");
const FETCH = require("../middleware/fetchDOE");
const { GridFSBucket } = require("mongodb");

const DOE = require("../models/DOE");
const PDF = require("../models/PDF");

module.exports = {
  async uploadPdfList(req, res) {
    const { fileName } = req.body;

    try {
      const files = req.files;

      if (!files) {
        return res.status(400).json({ message: "No files were uploaded." });
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const bucket = new GridFSBucket(mongoose.connection.db, {
          bucketName: "DOEFILES",
        });

        const uploadedFileIds = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const uploadStream = bucket.openUploadStream(file.originalname, {
            contentType: file.mimetype,
          });

          uploadStream.write(file.buffer);
          uploadStream.end();

          uploadedFileIds.push(uploadStream.id);
        }
        const updatedDOE = await DOE.findOneAndUpdate(
          { fileName },
          {
            $push: { files: { $each: uploadedFileIds } },
            $inc: { Tnumber: uploadedFileIds.length },
            $set: { fileName },
          },
          { new: true, upsert: true }
        );

        await PDF.updateMany(
          { title: fileName },
          { $set: { DOE: uploadedFileIds } }
        );

        await updatedDOE.save();

        await session.commitTransaction();
        session.endSession();

        await FETCH(files.length);

        return res.json({
          message: "Files uploaded successfully.",
          updatedDOE,
        });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  },
};

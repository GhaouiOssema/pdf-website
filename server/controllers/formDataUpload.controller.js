require("dotenv").config();

const PDF = require("../models/PDF"); // Import the PDF model
const Folder = require("../models/FOLDER");
const jwt = require("jsonwebtoken");
const User = require("../models/USER");
const fs = require("fs");
const mongoose = require("mongoose");
const { Readable } = require("stream");

module.exports = {
  uploadData: async (req, res) => {
    const requiredFiles = ["selectedFile"];
    const missingFiles = requiredFiles.filter((field) => !req.files[field]);

    if (missingFiles.length > 0) {
      console.log({ error: `Missing file(s): ${missingFiles.join(", ")}` });
      return res.status(400).json({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
    }

    const { buffer, originalname } = req.files.selectedFile[0];

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      const pdf = new PDF({
        mainPdf: {
          fileId: null, // Will be updated with the GridFS file ID later
          filename: originalname,
        },
        title: req.body.title[1],
        pdfDetails: {
          pdfModel: req.body.input,
          PAT: req.body.input1 && req.body.input1,
          installationDate: (req.body.input2 && req.body.input2) || "",
        },
        user: userId,
      });

      // Save the PDF document first to get the ID generated by MongoDB
      await pdf.save();

      // Create a readable stream from the file buffer
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      // Create a new GridFS bucket using mongoose
      const { connection } = mongoose;
      const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "pdfFiles", // Replace "pdfFiles" with your preferred bucket name
      });

      // Create an upload stream with metadata
      const uploadStream = gfs.openUploadStream(originalname, {
        metadata: { user: userId },
      });

      // Pipe the readable stream into the upload stream
      readableStream.pipe(uploadStream);

      // Listen for the finish event to get the GridFS file ID
      uploadStream.once("finish", async () => {
        // Update the mainPdf field with the GridFS file ID
        pdf.mainPdf.fileId = uploadStream.id;
        await pdf.save();

        res.status(200).json({ message: "Form uploaded successfully!" });
      });

      // Listen for errors during the upload
      uploadStream.once("error", (error) => {
        console.error(error);
        res.status(500).send("Error occurred while uploading the form.");
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while uploading the form.");
    }
  },
  uploadImage: async (req, res) => {
    const requiredFiles = ["selectedImage"];
    const missingFiles = requiredFiles.filter((field) => !req.files[field]);
    if (missingFiles.length > 0) {
      console.log({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
      return res.status(400).json({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      const pdf = await PDF.findOne({ user: userId })
        .sort({ createdAt: -1 })
        .limit(1);

      if (!pdf) {
        return res.status(404).json({ error: "PDF not found" });
      }

      const { buffer, originalname } = req.files.selectedImage[0];

      // Create a readable stream from the file buffer
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      // Create a new GridFS bucket using mongoose
      const { connection } = mongoose;
      const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "imageFiles", // Replace "imageFiles" with your preferred bucket name
      });

      // Create an upload stream with metadata
      const uploadStream = gfs.openUploadStream(originalname, {
        metadata: { user: userId },
      });

      // Pipe the readable stream into the upload stream
      readableStream.pipe(uploadStream);

      // Listen for the finish event to get the GridFS file ID
      uploadStream.once("finish", async () => {
        // Update the pdfImage field with the GridFS file ID
        pdf.pdfImage = {
          fileId: uploadStream.id,
          filename: originalname,
        };
        await pdf.save();

        res.status(200).json({ message: "Image uploaded successfully!" });
      });

      // Listen for errors during the upload
      uploadStream.once("error", (error) => {
        console.error(error);
        res.status(500).send("Error occurred while uploading the image.");
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while uploading the image.");
    }
  },
  uploadFileInfo: async (req, res) => {
    const requiredFiles = ["selectedInfo"];
    const missingFiles = requiredFiles.filter((field) => !req.files[field]);
    if (missingFiles.length > 0) {
      console.log({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
      return res.status(400).json({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      // Create a new GridFS bucket using mongoose
      const { connection } = mongoose;
      const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "fileInfoFiles", // Replace "fileInfoFiles" with your preferred bucket name
      });

      // Delete the previous PDF file info if it exists
      await gfs.delete({ "metadata.user": userId });

      const { buffer, originalname } = req.files.selectedInfo[0];

      // Create a readable stream from the file buffer
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      // Create an upload stream with metadata
      const uploadStream = gfs.openUploadStream(originalname, {
        metadata: { user: userId },
      });

      // Pipe the readable stream into the upload stream
      readableStream.pipe(uploadStream);

      // Listen for the finish event to get the GridFS file ID
      uploadStream.once("finish", async () => {
        // Find the PDF document for the user
        const pdf = await PDF.findOne({ user: userId })
          .sort({ createdAt: -1 })
          .limit(1);

        if (!pdf) {
          return res.status(404).json({ error: "PDF not found" });
        }

        // Update the pdfFileInfo field with the GridFS file ID and filename
        pdf.pdfFileInfo = {
          fileId: uploadStream.id,
          filename: originalname,
        };
        await pdf.save();

        res.status(200).json({ message: "PDF uploaded successfully!" });
      });

      // Listen for errors during the upload
      uploadStream.once("error", (error) => {
        console.error(error);
        res.status(500).send("Error occurred while uploading the PDF.");
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while uploading the PDF.");
    }
  },

  uploadDOE: async (req, res) => {
    const requiredFiles = ["selectedDOE"];
    const missingFiles = requiredFiles.filter((field) => !req.files[field]);
    if (missingFiles.length > 0) {
      console.log({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
      return res.status(400).json({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      // Create a new GridFS bucket using mongoose
      const { connection } = mongoose;
      const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "doeFiles", // Replace "doeFiles" with your preferred bucket name
      });

      // Use Promise.all to process multiple files concurrently
      await Promise.all(
        req.files.selectedDOE.map(async (file) => {
          // Create a readable stream from the file buffer
          const readableStream = new Readable();
          readableStream.push(file.buffer);
          readableStream.push(null);

          // Create an upload stream with metadata
          const uploadStream = gfs.openUploadStream(file.originalname, {
            metadata: { user: userId },
          });

          // Pipe the readable stream into the upload stream
          readableStream.pipe(uploadStream);

          // Listen for the finish event to get the GridFS file ID
          return new Promise((resolve, reject) => {
            uploadStream.once("finish", () => {
              resolve(uploadStream.id);
            });

            // Listen for errors during the upload
            uploadStream.once("error", (error) => {
              reject(error);
            });
          });
        })
      );

      // Find the PDF document for the user
      const pdf = await PDF.findOne({ user: userId })
        .sort({ createdAt: -1 })
        .limit(1);

      if (!pdf) {
        return res.status(404).json({ error: "PDF not found" });
      }

      // Update the doeFiles field with the GridFS file IDs and filenames
      pdf.doeFiles = req.files.selectedDOE.map((file) => ({
        fileId: file.id,
        filename: file.originalname,
      }));
      await pdf.save();

      res.status(200).json({ message: "DOE files uploaded successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while uploading the DOE files.");
    }
  },
};

const PDF = require("../models/PDF");
const jwt = require("jsonwebtoken");
const { GridFSBucket, MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

module.exports = {
  async getFile(req, res) {
    try {
      const uri =
        "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net/work";
      const dbName = "work";
      const collectionName = "uploads";
      const outputDir = path.join(__dirname, "..", "files");

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db(dbName);
      const bucket = new GridFSBucket(db, { bucketName: collectionName });

      // Fetch all files from the GridFS bucket
      const files = await bucket.find().toArray();

      // Return the files data as a response
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch files" });
    }
  },
};

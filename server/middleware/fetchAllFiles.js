const { GridFSBucket, MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

async function fetchAllFiles() {
  try {
    const uri =
      "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net/work";
    const dbName = "work";
    const collectionName = "uploads";
    const outputDir = path.join(__dirname, "..", "files");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: collectionName });

    const files = await db
      .collection(`${collectionName}.files`)
      .find()
      .toArray();

    if (files.length === 0) {
      console.log("No files found in the database.");
      return;
    }

    for (const file of files) {
      const filePath = path.join(outputDir, file.filename);
      const downloadStream = bucket.openDownloadStream(file._id);

      const writeStream = fs.createWriteStream(filePath);
      downloadStream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      console.log(
        `File '${file.filename}' downloaded and saved to '${filePath}'.`
      );
    }

    console.log("All files downloaded successfully.");

    client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = fetchAllFiles;

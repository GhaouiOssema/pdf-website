const { GridFSBucket, MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

async function fetchLastFile() {
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

    const existingFiles = fs.readdirSync(outputDir);
    const existingFilenames = existingFiles.map((file) =>
      path.basename(file, path.extname(file))
    );

    const file = await db
      .collection(`${collectionName}.files`)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .next();

    if (!file) {
      console.log("No files found in the database.");
      return;
    }

    const title = file.filename.substring(0, file.filename.lastIndexOf("."));
    const fileExt = path.extname(file.filename);
    let uniqueFilename = `${title}_01`; // Start with counter 01

    if (existingFilenames.includes(uniqueFilename)) {
      let counter = 2; // Start with counter 2

      while (existingFilenames.includes(uniqueFilename)) {
        uniqueFilename = `${title}_${counter.toString().padStart(2, "0")}`;
        counter++;
      }
    }

    const finalFilename = `${uniqueFilename}${fileExt}`;
    const filePath = path.join(outputDir, finalFilename);
    const downloadStream = bucket.openDownloadStream(file._id);

    const writeStream = fs.createWriteStream(filePath);
    downloadStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(
      `File '${file.filename}' downloaded and saved as '${finalFilename}'.`
    );

    console.log("File downloaded successfully.");

    client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = fetchLastFile;

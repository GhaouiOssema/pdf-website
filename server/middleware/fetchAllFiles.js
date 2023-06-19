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

    const existingFiles = fs.readdirSync(outputDir);
    const existingFilenames = existingFiles.map((file) =>
      path.basename(file, path.extname(file))
    );

    const files = await db
      .collection(`${collectionName}.files`)
      .find()
      .toArray();

    if (files.length === 0) {
      console.log("No files found in the database.");
      return;
    }

    const titleMap = new Map(); // Map to track existing titles and their counts

    const file = files[0]; // Fetch the first file
    const title = file.filename.substring(0, file.filename.lastIndexOf("."));
    const fileExt = path.extname(file.filename);
    let uniqueFilename = file.filename;

    if (existingFilenames.includes(title)) {
      const count = titleMap.has(title) ? titleMap.get(title) + 1 : 1;
      titleMap.set(title, count);
      const incrementField = count < 10 ? `0${count}` : count;
      uniqueFilename = `${title}_${incrementField}${fileExt}`;
    } else {
      titleMap.set(title, 1);
    }

    const filePath = path.join(outputDir, uniqueFilename);
    const downloadStream = bucket.openDownloadStream(file._id);

    const writeStream = fs.createWriteStream(filePath);
    downloadStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(
      `File '${file.filename}' downloaded and saved as '${uniqueFilename}'.`
    );

    console.log("One file downloaded successfully.");

    client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = fetchAllFiles;

const { GridFSBucket, MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

async function fetchLastFiles(count) {
  try {
    const uri =
      "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net/work";
    const dbName = "work";
    const bucketName = "files";
    const outputDir = path.join(__dirname, "..", "DOE");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName });

    const existingFiles = fs.readdirSync(outputDir);
    const existingFilenames = existingFiles.map((file) =>
      path.basename(file, path.extname(file))
    );

    const files = await db
      .collection(`${bucketName}.files`)
      .find()
      .sort({ _id: -1 })
      .limit(count)
      .toArray();

    if (files.length === 0) {
      console.log("No files found in the database.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
    }

    console.log("Files downloaded successfully.");

    client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = fetchLastFiles;

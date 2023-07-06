const fs = require("fs");
const path = require("path");

async function fetchLastFiles(files) {
  try {
    const outputDir = path.join(__dirname, "..", "DOE");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = file.filename.substring(0, file.filename.lastIndexOf("."));
      const fileExt = path.extname(file.filename);
      const finalFilename = `${title}${fileExt}`;
      const filePath = path.join(outputDir, finalFilename);

      const writeStream = fs.createWriteStream(filePath);
      const downloadStream = file.createReadStream();

      await new Promise((resolve, reject) => {
        downloadStream.pipe(writeStream);
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      console.log(
        `File '${file.filename}' downloaded and saved as '${finalFilename}'.`
      );
    }

    console.log("Files downloaded successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = fetchLastFiles;

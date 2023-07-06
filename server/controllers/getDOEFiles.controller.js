const { MongoClient, ObjectId } = require("mongodb");
const { GridFSBucket } = require("mongodb");

const url = "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net";
const dbName = "work";
const collectionName = "DOEFile";

module.exports = {
  async getFile(req, res) {
    try {
      // Get the ID of the PDF file.
      const id = req.params.id;
      console.log(id);

      const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Connect to the MongoDB server.
      await client.connect();

      const db = client.db(dbName);
      const bucket = new GridFSBucket(db);

      // Find the PDF file in the GridFS bucket.
      const file = await bucket.find({ _id: new ObjectId(id) }).toArray();

      // Check if the PDF file was found.
      if (file.length === 0) {
        res.status(404).send("PDF file not found.");
        return;
      }

      // Get the PDF file data.
      const data = [];
      const downloadStream = bucket.openDownloadStream(new ObjectId(id));
      downloadStream.on("data", (chunk) => {
        data.push(chunk);
      });
      downloadStream.on("end", () => {
        const fileData = Buffer.concat(data);
        res.contentType("application/pdf");
        res.send(fileData);
      });

      // Close the MongoDB client connection.
      await client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

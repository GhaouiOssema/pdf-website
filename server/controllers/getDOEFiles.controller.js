const { MongoClient } = require("mongodb");
const { GridFSBucket } = require("mongodb");

const url = "mongodb+srv://PDF01:lm3SxPP9ahk4owsH@cluster0.dtutsqg.mongodb.net";
const dbName = "work";
const collectionName = "DOEFile";

module.exports = {
  async getFile(req, res) {
    try {
      console.log("ddd");
      const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Connect to the MongoDB server.
      await client.connect();

      const db = client.db(dbName);
      const bucket = new GridFSBucket(db);

      // Find all files in the GridFS bucket.
      const files = await bucket.find().toArray();

      // Close the MongoDB client connection.
      await client.close();

      // Send the file names in the response.
      res.json({ files });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

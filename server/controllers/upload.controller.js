require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/USER");
const PDF = require("../models/PDF");
const Folder = require("../models/FOLDER");
const FETCH = require("../middleware/fetchAllFiles");

module.exports = {
  async uploadPdf(req, res) {
    try {
      const { publicOrPrivate, input, input1, input2 } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const file = req.file;

      // if (file) {
      //   // throw new Error("No file provided");
      //   console.log("single file");
      // }
      // res.status(200);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

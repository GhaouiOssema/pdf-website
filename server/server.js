const express = require("express");
const multer = require("multer");
var cors = require("cors");
const path = require("path");

// Create a connection to MongoDB
const connectDB = require("./config/Database.config");
connectDB();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(require("./routes"));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

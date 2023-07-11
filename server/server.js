require("dotenv").config();

const express = require("express");
var cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// Create a connection to MongoDB
const connectDB = require("./config/Database.config");
connectDB();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/userPictures", express.static(path.join(__dirname, "userPictures")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(require("./routes"));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

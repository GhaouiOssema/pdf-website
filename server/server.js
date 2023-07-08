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
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use(require("./routes"));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

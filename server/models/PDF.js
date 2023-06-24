const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  filename: String,
  path: String,
  title: String,
  owner: String,
  creationDate: { type: Date, default: Date.now },
  dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
});

module.exports = mongoose.model("PDFs", pdfSchema);

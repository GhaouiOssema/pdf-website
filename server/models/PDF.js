const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  mainPdf: {
    filename: String,
    data: String,
  },
  title: String,
  creationDate: { type: Date, default: Date.now },
  dossier: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  raports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Raport" }],
  pdfDetails: {
    pdfModel: String,
    PAT: String,
    installationDate: Date,
  },
  pdfImage: {
    filename: String,
    data: String,
  },
  fiche: {
    filename: String,
    data: String,
  },
  doeFiles: [
    {
      filename: String,
      data: String,
    },
  ],
});

module.exports = mongoose.model("PDFs", pdfSchema);

const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  adresse: {
    type: String,
    set: function (value) {
      if (value.startsWith("site:")) {
        return value;
      }
      return "site: " + value;
    },
  },
  code_postal: String,
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  content: [
    {
      subFolder: {
        name: String,
        type: { type: String, enum: ["folder"] },
        ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
        total: { type: Number, default: 0 },
        pdfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "PDFs" }],
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;

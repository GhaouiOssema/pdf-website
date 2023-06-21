const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  content: [
    {
      subFolder: {
        name: String, // Add a name field
        type: { type: String, enum: ["folder"] },
        ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
        total: { type: Number, default: 0 },
        pdfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "PDF" }],
      },
    },
  ],
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = { Folder, PDF };

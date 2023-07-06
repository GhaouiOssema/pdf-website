const mongoose = require("mongoose");

const doeFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const DOEFile = mongoose.model("DOEFile", doeFileSchema);

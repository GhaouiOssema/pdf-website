const mongoose = require("mongoose");
const { Schema } = mongoose;

const doeSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  pdf: { type: mongoose.Schema.Types.ObjectId, ref: "PDFs" },
  // Add other fields as per your requirements
});

const DOE = mongoose.model("DOE", doeSchema);

module.exports = DOE;

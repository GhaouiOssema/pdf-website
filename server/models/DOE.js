const mongoose = require("mongoose");
const { Schema } = mongoose;

const doeSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DOEFile",
    },
  ],
  Tnumber: {
    type: Number,
    default: 0,
  },
});

const DOE = mongoose.model("DOE", doeSchema);

module.exports = DOE;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
});

UserSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = this._id;
  }
  next();
});

module.exports = mongoose.model("UserAccount", UserSchema);

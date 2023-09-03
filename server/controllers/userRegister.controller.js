require("dotenv").config();
const User = require("../models/USER");
const bcrypt = require("bcryptjs");

module.exports = {
  async register(req, res) {
    try {
      const { userName, email, password, userRole } = req.body;
      let profileImageBase64 = null;

      if (req.file) {
        const { buffer } = req.file;
        profileImageBase64 = buffer.toString("base64");
      }

      const existingUser = await User.findOne({
        $or: [{ email }, { userName }],
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        profileImage: profileImageBase64,
        userName,
        email,
        password: hashedPassword,
        userRole,
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

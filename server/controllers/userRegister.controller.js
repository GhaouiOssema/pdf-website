require("dotenv").config();
const User = require("../models/USER");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

module.exports = {
  async register(req, res) {
    try {
      const { userName, email, password, userRole } = req.body;
      let profileImageBase64 = null;

      if (req.file) {
        const { filename, path: imagePath, buffer } = req.file;
        profileImageBase64 = buffer.toString("base64");
      }

      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { userName }],
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
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

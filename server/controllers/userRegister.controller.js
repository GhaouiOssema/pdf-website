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
      const { filename, path: imagePath } = req.file;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Delete the uploaded image
        fs.unlinkSync(imagePath);
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Rename the image file
      const fileExt = path.extname(filename);
      const newFilename = `${userName}-${Date.now()}${fileExt}`;
      const newImagePath = path.join(
        __dirname,
        "..",
        "userPictures",
        newFilename
      );

      fs.renameSync(imagePath, newImagePath);

      // Create a new user
      const user = new User({
        profileImage: newFilename,
        userName,
        email,
        password: hashedPassword,
        userRole,
      });

      await user.save();

      const token = jwt.sign({ userId: user.userId }, process.env.SECRET_TOKEN);

      res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

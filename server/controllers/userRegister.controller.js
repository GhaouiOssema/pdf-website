require("dotenv").config();

const User = require("../models/USER");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { userName, email, password, userRole } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
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

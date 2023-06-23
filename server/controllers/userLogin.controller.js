require("dotenv").config();

const User = require("../models/userAccount");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT token with expiration date
      const token = jwt.sign(
        {
          userId: user.userId,
          email: user.email,
          userName: user.userName,
          userRole: user.userRole,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "4d" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

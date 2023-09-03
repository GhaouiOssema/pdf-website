require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/USER");

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

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

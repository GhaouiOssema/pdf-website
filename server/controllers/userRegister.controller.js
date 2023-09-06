require("dotenv").config();

const User = require("../models/USER");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../middleware/sendEmail");

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

      const verificationJwtToken = jwt.sign(
        {
          userId: user.userId,
          email: user.email,
          password: hashedPassword,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "4d" }
      );

      user.verificationToken = verificationJwtToken;

      await user.save();

      await sendVerificationEmail(email, verificationJwtToken);

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

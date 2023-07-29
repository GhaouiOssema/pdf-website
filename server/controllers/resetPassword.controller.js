const User = require("../models/USER");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const sendResetEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "qrsolution548",
      pass: "pupihdlbdzdbkotr",
    },
  });

  const htmlTemplate = fs.readFileSync(
    path.join(__dirname, "../public/resetPassword.html"),
    "utf-8"
  );

  const emailContent = htmlTemplate.replace("{resetLink}", resetLink);

  const mailOptions = {
    from: "QR SOLUTION",
    to: email,
    subject: "Password Reset",
    html: emailContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetLink = `http://localhost:5173/reset-password?email=${encodeURIComponent(
        email
      )}`;
      await sendResetEmail(email, resetLink);

      res.status(200).json({ message: "Reset email sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async resetPassword(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a salt and hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update the user's password with the new hashed password
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

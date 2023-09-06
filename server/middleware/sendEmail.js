const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "qrsolution548",
        pass: "pupihdlbdzdbkotr",
      },
    });

    const verificationLink = `https://qr-solution-beta.netlify.app/verify?token=${verificationToken}`;

    const htmlTemplate = fs.readFileSync(
      path.join(__dirname, "../public/accountConfirmation.html"),
      "utf-8"
    );

    const content = htmlTemplate.replace("{resetLink}", verificationLink);

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Email Verification",
      html: content,
    };

    await transporter.sendMail(mailOptions);

    console.log("message:", "verification email sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = sendVerificationEmail;

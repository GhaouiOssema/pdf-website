const UserAccount = require("../models/USER");

module.exports = {
  async verifyCode(req, res) {
    const { code } = req.params;

    try {
      // Find the user with the provided verification code
      const user = await UserAccount.findOne({ verification_code: code });

      if (user) {
        // Code matches the user's verification code
        return res.json({ verified: true });
      } else {
        // Code doesn't match any user's verification code
        return res.json({ verified: false });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred during verification" });
    }
  },
};

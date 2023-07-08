const jwt = require("jsonwebtoken");
const User = require("../models/USER");

module.exports = {
  uploadUserImage: async (req, res) => {
    try {
      const { userId } = req.params;

      // Verify the JWT token
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "your-secret-key"); // Replace with your actual secret key
      const authenticatedUserId = decoded.userId;

      // Check if the authenticated user is the same as the requested user
      if (authenticatedUserId !== userId) {
        return res.status(401).json({ error: "Unauthorized access" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.profileImage = req.file.id.toString();
      await user.save();

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error uploading user image" });
    }
  },
};

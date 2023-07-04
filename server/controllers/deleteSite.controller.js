require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserAccount = require("../models/USER");
const Folder = require("../models/Folder");
const PDFs = require("../models/PDF");

module.exports = {
  async delete(req, res) {
    try {
      const { folderId } = req.params;
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing" });
      }

      const tokenWithoutBearer = token.split(" ")[1]; // Remove the "Bearer " prefix from the token

      const decodedToken = jwt.verify(
        tokenWithoutBearer,
        process.env.SECRET_TOKEN
      );

      const { userId } = decodedToken;
      const user = await UserAccount.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User account not found" });
      }

      const folder = await Folder.findOneAndDelete({
        _id: folderId,
        user: user._id,
      });

      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }

      // Delete related PDFs
      await PDFs.deleteMany({ dossier: folderId });

      // Remove folder from user's folders
      user.folders.pull(folder._id);
      await user.save();

      return res.json({
        message: "Folder and related PDFs deleted successfully",
      });
    } catch (error) {
      console.error(error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

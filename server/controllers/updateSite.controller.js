const Folder = require("../models/Folder");
const jwt = require("jsonwebtoken");
const UserAccount = require("../models/USER");

module.exports = {
  async updateFolder(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing" });
      }

      const tokenWithoutBearer = token.split(" ")[1]; // Remove the "Bearer " prefix from the token

      const { userId } = jwt.verify(
        tokenWithoutBearer,
        process.env.SECRET_TOKEN
      );

      const user = await UserAccount.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User account not found" });
      }

      const { folderId } = req.params;
      const { adresse, code_postal, subfolders } = req.body; // Change "subFolders" to "subfolders"

      // Validate required fields
      if (!adresse || !code_postal) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const folder = await Folder.findById(folderId);

      if (!folder) {
        return res.status(404).json({ error: "Folder not found" });
      }

      // Update folder address and code postal
      folder.adresse = adresse;
      folder.code_postal = code_postal;

      if (subfolders && Array.isArray(subfolders)) {
        // Update subfolders if provided
        folder.content = [
          ...folder.content,
          ...subfolders.map((name) => ({
            subFolder: {
              name,
              type: "folder",
              ref: [],
              total: 0,
              pdfFiles: [],
            },
          })),
        ];
      }

      await folder.save();

      res.json({ message: "Folder updated successfully", folder });
    } catch (error) {
      console.error(error);

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      res
        .status(500)
        .json({ error: "An error occurred while updating the folder" });
    }
  },
};

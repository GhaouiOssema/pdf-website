const Folder = require("../models/FOLDER");

module.exports = {
  async delete(req, res) {
    try {
      const { address } = req.params;

      const folder = await Folder.findOne({ adresse: address }).populate(
        "user"
      );

      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }

      if (folder.user.id !== req.user.id) {
        return res.status(403).json({
          message: "You do not have permission to delete this folder",
        });
      }

      // Delete the folder
      await folder.remove();

      res.json({ message: "Folder deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

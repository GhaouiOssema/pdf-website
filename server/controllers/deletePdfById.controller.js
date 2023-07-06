const PDF = require("../models/PDF");
const Folder = require("../models/FOLDER");
const UserAccount = require("../models/USER");
const jwt = require("jsonwebtoken");

module.exports = {
  async delete(req, res) {
    try {
      // Extract parameters from the request URL
      const { site, folder, title } = req.params;

      // Check if the user is authorized to delete the PDF file
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const folderObj = await Folder.findOne({
        adresse: site,
        "content.subFolder.name": folder,
      }).populate({
        path: "content.subFolder.pdfFiles",
        model: "PDFs",
      });

      if (!folderObj) {
        return res.status(404).json({ message: "Folder not found" });
      }

      const subFolder = folderObj.content[0].subFolder;

      const pdfFileIndex = subFolder.pdfFiles.findIndex(
        (pdfFile) => pdfFile.title === title
      );

      if (pdfFileIndex === -1) {
        return res.status(404).json({ message: "PDF file not found" });
      }

      const deletedPdf = subFolder.pdfFiles.splice(pdfFileIndex, 1)[0];

      await folderObj.save();

      await PDF.deleteOne({ _id: deletedPdf._id });

      // Delete the PDF from the UserAccount schema
      const user = await UserAccount.findOne({ userId: decoded.userId });
      if (user) {
        const pdfIndex = user.allPdfs.findIndex(
          (pdfId) => pdfId.toString() === deletedPdf._id.toString()
        );
        if (pdfIndex !== -1) {
          user.allPdfs.splice(pdfIndex, 1);
          await user.save();
        }
      }

      res.json({ message: "PDF file deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  },
};

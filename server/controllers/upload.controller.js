require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/USER");
const PDF = require("../models/PDF");
const Folder = require("../models/FOLDER");
const FETCH = require("../middleware/fetchAllFiles");

module.exports = {
  async uploadPdf(req, res) {
    try {
      const { publicOrPrivate, input, input1, input2 } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const file = req.file;

      if (!file) {
        throw new Error("No file provided");
      }

      const originalFilename = file.originalname;

      const lastPdf = await PDF.findOne()
        .sort({ _id: -1 })
        .select("filename path")
        .exec();

      let counter = 1;
      let newTitle = `${originalFilename.substring(
        0,
        originalFilename.lastIndexOf(".")
      )}_${counter.toString().padStart(2, "0")}.pdf`;

      if (lastPdf) {
        const lastFilename = lastPdf.filename;
        const lastCounter = parseInt(
          lastFilename.substring(
            lastFilename.lastIndexOf("_") + 1,
            lastFilename.lastIndexOf(".pdf")
          ),
          10
        );

        if (
          originalFilename.substring(0, originalFilename.lastIndexOf(".")) ===
          lastFilename.substring(0, lastFilename.lastIndexOf("_"))
        ) {
          counter = lastCounter + 1;
        }

        newTitle = `${originalFilename.substring(
          0,
          originalFilename.lastIndexOf(".")
        )}_${counter.toString().padStart(2, "0")}.pdf`;
      }

      const pdf = new PDF({
        filename: newTitle,
        path: file.path,
        title: req.body.title,
        publicOrPrivate: req.body.publicOrPrivate,
        pdfDetails: {
          ...(input ? { pdfModel: input } : null),
          ...(input1 ? { PAT: input1 } : null),
          ...(input2 ? { installationDate: input2 } : null),
        },
      });

      const savedPdf = await pdf.save();

      // Find the user based on the decoded token
      const user = await User.findById(decodedToken.userId);

      // Save the PDF to the user's allPdfs array
      user.allPdfs.push(savedPdf._id);
      await user.save();

      // Save the user reference in the PDF schema
      savedPdf.user = user._id;
      await savedPdf.save();

      // Check if the folderName is provided in the request body
      if (req.body.folder) {
        // Find the appropriate folder based on the folderName
        const folder = await Folder.findOne({
          adresse: req.body.folder,
          user: decodedToken.userId,
          "content.subFolder.name": req.body.subFolder,
        });

        // Check if the folder exists
        if (folder) {
          // Find the appropriate subfolder in the folder content
          const subFolder = folder.content.find(
            (sub) => sub.subFolder.name === req.body.subFolder
          );

          // Add the PDF to the subfolder's pdfFiles array
          subFolder.subFolder.pdfFiles.push(savedPdf._id);

          // Save the updated folder
          await folder.save();
        }
      } else if (req.body.site) {
        // Find the appropriate folder based on the folderName
        const site = await Folder.findOne({
          adresse: req.body.site,
          user: decodedToken.userId,
          "content.subFolder.name": publicOrPrivate,
        });

        // Check if the folder exists
        if (site) {
          // Find the appropriate subfolder in the folder content
          const subFolder = site.content.find(
            (sub) => sub.subFolder.name === req.body.publicOrPrivate
          );

          // Add the PDF to the subfolder's pdfFiles array
          subFolder.subFolder.pdfFiles.push(savedPdf._id);

          // Save the updated folder
          await site.save();
        }
      }
      FETCH();
      res.json({ file: savedPdf });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

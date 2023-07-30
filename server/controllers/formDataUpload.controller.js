const PDF = require("../models/PDF"); // Import the PDF model
const path = require("path");
const fs = require("fs");
const Folder = require("../models/FOLDER");
const jwt = require("jsonwebtoken");
const User = require("../models/USER");

let counter = 1; // Start counter at 1

module.exports = {
  uploadData: async (req, res) => {
    console.log(req.body);
    const requiredFiles = [
      "selectedFile",
      "selectedImage",
      "selectedInfo",
      "selectedDOE",
    ];
    const missingFiles = requiredFiles.filter((field) => !req.files[field]);

    if (missingFiles.length > 0) {
      console.log({ error: `Missing file(s): ${missingFiles.join(", ")}` });
      return res.status(400).json({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
    }

    const selectedFile = req.files.selectedFile[0];
    const selectedImage = req.files.selectedImage[0];
    const selectedInfo = req.files.selectedInfo[0];
    const selectedDOEFiles = req.files.selectedDOE || [];
    console.log(selectedDOEFiles.length);
    const doeFiles = selectedDOEFiles.map((file) => ({
      filename: file.originalname,
      data: file.buffer.toString("base64"),
    }));

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      const pdf = new PDF({
        mainPdf: {
          filename: selectedFile.originalname,
          data: selectedFile.buffer.toString("base64"),
        },
        title: req.body.title[1],
        pdfDetails: {
          pdfModel: req.body.input[1],
          PAT: req.body.input1[1],
          installationDate: req.body.input2[1] || "",
        },
        pdfImage: {
          filename: selectedImage.originalname,
          data: selectedImage.buffer.toString("base64"),
        },
        fiche: {
          filename: selectedInfo.originalname,
          data: selectedInfo.buffer.toString("base64"),
        },
        doeFiles: doeFiles,
        user: userId,
      });

      await pdf.save();

      const user = await User.findById(decodedToken.userId);
      user.allPdfs.push(pdf._id);
      await user.save();

      if (req.body.site[1]) {
        const folder = await Folder.findOne({
          adresse: req.body.site[1],
          user: decodedToken.userId,
          "content.subFolder.name": req.body.publicOrPrivate[1],
        });

        if (folder) {
          const subFolder = folder.content.find(
            (sub) => sub.subFolder.name === req.body.publicOrPrivate[1]
          );

          if (subFolder) {
            subFolder.subFolder.pdfFiles.push(pdf._id);
          } else {
            const newSubFolder = {
              subFolder: {
                name: req.body.publicOrPrivate[1],
                pdfFiles: [pdf._id],
              },
            };

            folder.content.push(newSubFolder);
          }

          await folder.save();
          pdf.dossier = folder._id;
          await pdf.save();
        } else {
          const newFolder = new Folder({
            adresse: req.body.site[1],
            user: decodedToken.userId,
            content: [
              {
                subFolder: {
                  name: req.body.publicOrPrivate[1],
                  pdfFiles: [pdf._id],
                },
              },
            ],
          });

          await newFolder.save();
          pdf.dossier = newFolder._id;
          await pdf.save();
        }
      }

      res.status(200).json({ message: "Form uploaded successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while uploading the form.");
    }
  },
};

const PDF = require("../models/PDF"); // Import the PDF model
const path = require("path");
const fs = require("fs");
const Folder = require("../models/FOLDER");
const jwt = require("jsonwebtoken");
const User = require("../models/USER");

let counter = 1; // Start counter at 1

module.exports = {
  uploadData: async (req, res) => {
    // Check if all required files are present
    const requiredFiles = ["selectedFile", "selectedImage", "selectedInfo"];
    const missingFiles = requiredFiles.filter((field) => !req.files[field]);

    if (missingFiles.length > 0) {
      return res.status(400).json({
        error: `Missing file(s): ${missingFiles.join(", ")}`,
      });
    }

    console.log("Initial state : \n", req.body);

    const selectedFile = req.files.selectedFile[0];
    const selectedImage = req.files.selectedImage[0];
    const selectedInfo = req.files.selectedInfo[0];

    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      const encryptedDate = Buffer.from(currentDate).toString("base64");

      // Generate the filename based on the desired format
      const generateFilename = (filename) => {
        const extension = path.extname(filename);
        const firstPartOfFileName = path.basename(filename, extension);
        const paddedCounter = counter.toString().padStart(2, "0");
        const generatedFilename = `${firstPartOfFileName}-${paddedCounter}-${encryptedDate}${extension}`;
        counter++; // Increment counter for the next file
        return generatedFilename;
      };

      // Check if the filename already exists in the PDF schema
      const isFilenameExists = async (filename) => {
        const existingPDF = await PDF.findOne({ filename });
        return existingPDF ? true : false;
      };

      // Find a unique filename by incrementing the counter
      const findUniqueFilename = async (filename) => {
        let generatedFilename = generateFilename(filename);
        while (await isFilenameExists(generatedFilename)) {
          generatedFilename = generateFilename(filename);
        }
        return generatedFilename;
      };

      // Get the user information from the JWT token
      const token = req.headers.authorization.split(" ")[1]; // Assuming the token is passed in the "Authorization" header
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      // Create a new PDF document
      const pdf = new PDF({
        filename: await findUniqueFilename(selectedFile.originalname),
        path: selectedFile.path,
        title: req.body.title[1],
        owner: req.body.owner[1],
        pdfDetails: {
          pdfModel: req.body.input[1],
          PAT: req.body.input1[1],
          installationDate: req?.body?.input2[1] || "",
        },
        pdfImage: await findUniqueFilename(selectedImage.originalname),
        fiche: await findUniqueFilename(selectedInfo.originalname),
        user: userId,
      });

      // Save the PDF document to the database
      await pdf.save();

      const user = await User.findById(decodedToken.userId);

      // Save the PDF to the user's allPdfs array
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
            // Create a new subfolder if it doesn't exist
            const newSubFolder = {
              subFolder: {
                name: req.body.publicOrPrivate[1],
                pdfFiles: [pdf._id],
              },
            };

            folder.content.push(newSubFolder);
          }

          await folder.save();
          pdf.dossier = folder._id; // Assign the folder ID to the dossier field
          await pdf.save();
        } else {
          // Create a new folder if it doesn't exist
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
          pdf.dossier = newFolder._id; // Assign the folder ID to the dossier field
          await pdf.save();
        }
      }

      res.status(200).send("Form uploaded successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while uploading the form.");
    }
  },
};

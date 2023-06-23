const Folder = require("../models/FOLDER");

const addSite = async (req, res) => {
  const { adresse, code_postal, subFolders } = req.body;

  try {
    // Create the new folder
    const folder = new Folder({
      adresse,
      code_postal,
      content: subFolders.map((subFolder) => ({
        subFolder: {
          name: subFolder,
          type: "folder",
          ref: [],
          total: 0,
          pdfFiles: [],
        },
      })),
    });

    const savedFolder = await folder.save();

    res.status(201).json(savedFolder);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the folder" });
  }
};

module.exports = {
  addSite,
};

const Folder = require("../models/FOLDER");
const USER = require("../models/USER");

const addSite = async (req, res) => {
  const { adresse, code_postal, subFolders } = req.body;

  try {
    const userId = req.headers["x-user-id"]; // Retrieve the userId from the custom header
    const userName = req.headers["x-user-name"]; // Retrieve the userName from the custom header

    if (!userId || !userName) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
      user: userId, // Assign the userId to the folder's user field
      userName: userName, // Assign the userName to the folder's userName field
    });

    const savedFolder = await folder.save();

    await USER.updateOne(
      { _id: userId },
      { $push: { folders: savedFolder._id } }
    );

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

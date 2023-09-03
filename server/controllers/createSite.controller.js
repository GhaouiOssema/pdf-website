const Folder = require("../models/FOLDER");
const USER = require("../models/USER");

const addSite = async (req, res) => {
  const { adresse, code_postal, subFolders, name } = req.body;

  try {
    const userId = req.headers["x-user-id"];
    const userName = req.headers["x-user-name"];

    if (!userId || !userName) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create the new folder
    const folder = new Folder({
      name,
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
      user: userId,
      userName: userName,
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

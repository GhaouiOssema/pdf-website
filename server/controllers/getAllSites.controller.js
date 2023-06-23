const FOLDER = require("../models/FOLDER");

module.exports = {
  async sites(req, res) {
    try {
      const sites = await FOLDER.find();
      res.status(200).json(sites);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the sites" });
    }
  },
};
